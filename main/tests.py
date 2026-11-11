from django.contrib.auth.hashers import check_password
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Course, CourseCategory, Students, Teacher, hash_if_raw
from .recommendation_engine import recommend_similar_courses


def make_student(**overrides):
    data = {
        'student_fullname': 'Anna Kovacs',
        'email': 'anna@example.com',
        'password': 'Secret123!',
        'mobile_phone': '+36 1 234 5678',
        'address': 'Budapest',
    }
    data.update(overrides)
    return Students.objects.create(**data)


def make_teacher(**overrides):
    data = {
        'teacher_fullname': 'Peter Nagy',
        'email': 'peter@example.com',
        'password': 'Teach123!',
        'mobile_phone': '+36 1 765 4321',
        'address': 'Budapest',
    }
    data.update(overrides)
    return Teacher.objects.create(**data)


class HashIfRawTests(TestCase):
    def test_plain_password_is_hashed(self):
        hashed = hash_if_raw('Secret123!')

        self.assertNotEqual(hashed, 'Secret123!')
        self.assertTrue(check_password('Secret123!', hashed))

    def test_existing_hash_is_left_unchanged(self):
        hashed = hash_if_raw('Secret123!')

        self.assertEqual(hash_if_raw(hashed), hashed)

    def test_empty_password_stays_empty(self):
        self.assertIsNone(hash_if_raw(None))
        self.assertEqual(hash_if_raw(''), '')


class StudentAccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def login(self, email, password):
        return self.client.post('/student_login', {'email': email, 'password': password}).json()

    def test_registration_stores_a_hash_and_hides_it_in_the_response(self):
        response = self.client.post('/student/', {
            'student_fullname': 'Anna Kovacs',
            'email': 'anna@example.com',
            'password': 'Secret123!',
            'mobile_phone': '+36 1 234 5678',
            'address': 'Budapest',
        })

        self.assertEqual(response.status_code, 201)
        self.assertNotIn('password', response.json())
        stored = Students.objects.get(email='anna@example.com').password
        self.assertNotEqual(stored, 'Secret123!')
        self.assertTrue(check_password('Secret123!', stored))

    def test_login_succeeds_with_correct_password(self):
        student = make_student()

        result = self.login('anna@example.com', 'Secret123!')

        self.assertEqual(result, {'bool': True, 'student_id': student.student_id})

    def test_login_fails_with_wrong_password_or_unknown_email(self):
        make_student()

        self.assertEqual(self.login('anna@example.com', 'wrong'), {'bool': False})
        self.assertEqual(self.login('nobody@example.com', 'Secret123!'), {'bool': False})

    def test_profile_update_does_not_break_login(self):
        # Regression: save() used to hash the stored hash again on every update.
        student = make_student()

        response = self.client.patch(f'/student/{student.student_id}', {'address': 'Debrecen'})

        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.login('anna@example.com', 'Secret123!')['bool'])

    def test_profile_response_does_not_expose_the_password_hash(self):
        student = make_student()

        response = self.client.get(f'/student/{student.student_id}')

        self.assertNotIn('password', response.json())

    def test_change_password_hashes_the_new_password(self):
        # Regression: the new password used to be stored as plain text.
        student = make_student()

        response = self.client.post(f'/student/change_password/{student.student_id}/', {'password': 'NewPass456!'})

        self.assertEqual(response.json(), {'bool': True})
        stored = Students.objects.get(pk=student.pk).password
        self.assertNotEqual(stored, 'NewPass456!')
        self.assertTrue(self.login('anna@example.com', 'NewPass456!')['bool'])
        self.assertFalse(self.login('anna@example.com', 'Secret123!')['bool'])


class TeacherAccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def login(self, email, password):
        return self.client.post('/teacher_login', {'email': email, 'password': password}).json()

    def test_login_and_change_password(self):
        teacher = make_teacher()
        self.assertTrue(self.login('peter@example.com', 'Teach123!')['bool'])

        self.client.post(f'/teacher/change_password/{teacher.teacher_id}/', {'password': 'Changed789!'})

        self.assertTrue(self.login('peter@example.com', 'Changed789!')['bool'])
        self.assertNotEqual(Teacher.objects.get(pk=teacher.pk).password, 'Changed789!')

    def test_teacher_list_works_without_query_parameters(self):
        make_teacher()

        response = self.client.get('/teacher/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)


    def test_popular_teachers_lists_teachers_with_courses(self):
        teacher = make_teacher()
        make_teacher(email='nocourses@example.com')
        category = CourseCategory.objects.create(title='Programming', description='Code')
        Course.objects.create(category=category, teacher=teacher, course_title='Django', technologies='python')

        response = self.client.get('/teacher/?popular=1')

        self.assertEqual(response.status_code, 200)
        self.assertEqual([t['teacher_id'] for t in response.json()], [teacher.teacher_id])


class CourseApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher = make_teacher()
        self.category = CourseCategory.objects.create(title='Programming', description='Code')

    def make_course(self, title, technologies):
        return Course.objects.create(
            category=self.category, teacher=self.teacher, course_title=title, technologies=technologies)

    def test_course_list_returns_created_courses(self):
        self.make_course('Intro to Python', 'python')

        response = self.client.get('/course/')

        self.assertEqual(response.status_code, 200)
        titles = [c['course_title'] for c in response.json()['results']]
        self.assertEqual(titles, ['Intro to Python'])

    def test_search_matches_title_or_technology(self):
        self.make_course('Intro to Python', 'python')
        self.make_course('React Basics', 'javascript,react')

        response = self.client.get('/search_courses/react')

        titles = [c['course_title'] for c in response.json()['results']]
        self.assertEqual(titles, ['React Basics'])


class RecommendationEngineTests(TestCase):
    def setUp(self):
        teacher = make_teacher()
        category = CourseCategory.objects.create(title='Programming', description='Code')
        create = lambda title, tech: Course.objects.create(
            category=category, teacher=teacher, course_title=title, technologies=tech)
        self.django = create('Django REST APIs', 'python,django,rest')
        self.flask = create('Flask Web Apps', 'python,flask,rest')
        self.react = create('React Front End', 'javascript,react,css')

    def test_recommends_the_most_similar_course_first(self):
        recommended = list(recommend_similar_courses(self.django.course_id, top_n=1))

        self.assertEqual(recommended, [self.flask])

    def test_never_recommends_the_course_itself(self):
        recommended = recommend_similar_courses(self.django.course_id, top_n=2)

        self.assertNotIn(self.django, recommended)

    def test_unknown_course_returns_empty_list(self):
        self.assertEqual(list(recommend_similar_courses(99999)), [])

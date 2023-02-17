from django.db.models import Q
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse  ##without this you can not submit a form to django
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from .serializers import StudentSerialize, TeacherSerialize, CourseCategorySerialize, CourseSerialize, ChapterSerialize, \
    CourseRatingSerializer, EnrollmentSerialize, TeacherDashboardSerializer, StudentFavoriteCoursesSerializer, \
    StudentAssignmentSerializer, StudentDashBoardSerialize, NotificationSerializer, CourseQuizSerialize, \
    QuizQuestionSerializer, CourseQuizSerialize, QuizSerializer, AttemptQuestionSerialize, StudyMaterialsSerialize, \
    AttemptQuizSerialize, FAQSerializer
from . import models
from django.http import Http404


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 4


# post and fetch
class StudentList(generics.ListCreateAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize


# update date and delete data
class StudentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize
    # def get(self, request):
    #     students = models.Students.objects.all()
    #     serializer = StudentSerialize(students, many=True)
    #     return Response(serializer.data)


@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = models.Students.objects.get(password=password, email=email)
    except models.Students.DoesNotExist:
        studentData = None
    if studentData:
        return JsonResponse({'bool': True, 'student_id': studentData.student_id})
    else:
        return JsonResponse({'bool': False})


class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerialize

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql = "SELECT *,COUNT(c.course_id) as total_course FROM main_teacher as t INNER JOIN main_course as c ON c.teacher_id=t.teacher_id GROUP BY t.teacher_id,c.course_id ORDER BY total_course desc LIMIT 3"
            return models.Teacher.objects.raw(sql)
        if 'all' in self.request.GET:
            sql = "SELECT *,COUNT(c.course_id) as total_course FROM main_teacher as t INNER JOIN main_course as c ON c.teacher_id=t.teacher_id GROUP BY t.teacher_id,c.course_id ORDER BY total_course desc"
            return models.Teacher.objects.raw(sql)


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerialize


@csrf_exempt
def teachers_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(password=password, email=email)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id': teacherData.teacher_id})
    else:
        return JsonResponse({'bool': False})


class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer


class StudentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize


class CourseCategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CourseCategorySerialize
    # serializer = CourseCategorySerialize(courseCategory, many=True)
    # return Response(serializer.data)


# get all courses
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerialize
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-course_id')[:limit]
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(technologies__icontains=category)
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(teacher_id=teacher).first()
            qs = models.Course.objects.filter(technologies__icontains=skill_name, teacher=teacher)
        if 'searchstring' in self.kwargs:
            search = self.kwargs['searchstring']
            if search:
                qs = models.Course.objects.filter(Q(technologies__icontains=search) | Q(course_title__icontains=search))

        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Students.objects.get(pk=student_id)
            print(student.interested_categories)
            queries = [Q(technologies__iendswith=value) for value in student.interested_categories]
            query = queries.pop()
            for item in queries:
                query |= item
            qs = models.Course.objects.filter(query)
            return qs

        return qs


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerialize


# get specific teacher course
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerialize

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)


class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerialize


class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerialize


class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerialize

    def get_queryset(self):
        try:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.Chapter.objects.filter(course_id=course)
        except models.Course.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerialize


class StudentEnrollmentList(generics.ListCreateAPIView):
    queryset = models.Enrollments.objects.all()
    serializer_class = EnrollmentSerialize


def fetch_enroll_status(request, student_id, course_id):
    student = models.Students.objects.filter(student_id=student_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    enrollStatus = models.Enrollments.objects.filter(course=course,
                                                     student=student)  # //maybe i would need count() here
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class EnrolledStudentList(generics.ListAPIView):
    queryset = models.Enrollments.objects.all()
    serializer_class = EnrollmentSerialize

    def get_queryset(self):
        try:
            if 'course_id' in self.kwargs:
                course_id = self.kwargs['course_id']
                course = models.Course.objects.get(pk=course_id)
                return models.Enrollments.objects.filter(course_id=course)
            elif 'teacher_id' in self.kwargs:
                teacher_id = self.kwargs['teacher_id']
                teacher = models.Teacher.objects.get(pk=teacher_id)
                return models.Enrollments.objects.filter(course__teacher=teacher).distinct('student_id')
            elif 'student_id' in self.kwargs:
                student_id = self.kwargs['student_id']
                student = models.Students.objects.get(pk=student_id)
                return models.Enrollments.objects.filter(student=student).distinct('course_id')
        except models.Enrollments.DoesNotExist:
            raise Http404("no student enrolled in this course")
        except Exception as e:
            raise Http404("An error occurred")


class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        try:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.CourseRating.objects.filter(course_id=course)
        except models.Course.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class PopularCourseList(generics.ListCreateAPIView):
    queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql = "SELECT *,AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.course_id GROUP BY c.course_id,cr.id ORDER BY avg_rating DESC LIMIT 3"
            return models.CourseRating.objects.raw(sql)
        if 'all' in self.request.GET:
            sql = "SELECT *,AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.course_id GROUP BY c.course_id,cr.id ORDER BY avg_rating DESC"
            return models.CourseRating.objects.raw(sql)


def fetch_rating_status(request, student_id, course_id):
    student = models.Students.objects.filter(student_id=student_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


@csrf_exempt
def teacher_change_password(request, teacher_id):
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(teacher_id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        models.Teacher.objects.filter(teacher_id=teacher_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class StudentFavoriteCoursesList(generics.ListCreateAPIView):
    queryset = models.StudentFavoriteCourses.objects.all()
    serializer_class = StudentFavoriteCoursesSerializer

    def get_queryset(self):
        try:
            if 'student_id' in self.kwargs:
                student_id = self.kwargs['student_id']
                student = models.Students.objects.get(pk=student_id)
                return models.StudentFavoriteCourses.objects.filter(student=student).distinct('course_id')
        except models.Enrollments.DoesNotExist:
            raise Http404("no student enrolled in this course")
        except Exception as e:
            raise Http404("An error occurred")


def remove_favorite_course(request, course_id, student_id):
    student = models.Students.objects.filter(student_id=student_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    favoriteStatus = models.StudentFavoriteCourses.objects.filter(course=course, student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class StudentAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        try:
            student_id = self.kwargs['student_id']
            teacher_id = self.kwargs['teacher_id']
            student = models.Students.objects.get(pk=student_id)
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentAssignment.objects.filter(student=student, teacher=teacher)
        except models.StudentAssignment.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class MyAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        try:
            student_id = self.kwargs['student_id']
            student = models.Students.objects.get(pk=student_id)
            # Update Notification
            models.CourseQuize.objects.filter(student=student, notif_for='student', notif_subject='assignment').update(
                status=True)
            return models.StudentAssignment.objects.filter(student=student)
        except models.StudentAssignment.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class UpdateAssignmentStatusList(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer


class StudentDashBoard(generics.RetrieveAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentDashBoardSerialize


@csrf_exempt
def student_change_password(request, student_id):
    password = request.POST['password']
    try:
        studentData = models.Students.objects.get(student_id=student_id)
    except models.Students.DoesNotExist:
        studentData = None
    if studentData:
        models.Students.objects.filter(student_id=student_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class NotificationList(generics.ListCreateAPIView):
    queryset = models.Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        try:
            student_id = self.kwargs['student_id']
            student = models.Students.objects.get(pk=student_id)
            return models.Notification.objects.filter(student=student, notif_for='student', notif_subject='assignment',
                                                      status=False)
        except models.Notification.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class QuizList(generics.ListCreateAPIView):
    queryset = models.Quizzes.objects.all()
    serializer_class = QuizSerializer


class TeacherQuizList(generics.ListAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Quizzes.objects.filter(teacher=teacher)


class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quizzes.objects.all()
    serializer_class = QuizSerializer


class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quizzes.objects.all()
    serializer_class = CourseQuizSerialize


class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class = QuizQuestionSerializer

    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        quiz = models.Quizzes.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return models.QuizzesQuestions.objects.filter(quiz=quiz).order_by("quizQuestion_id")[:1]
        elif 'quizQuestion_id' in self.kwargs:
            current_question = self.kwargs['quizQuestion_id']
            return models.QuizzesQuestions.objects.filter(quiz=quiz, quizQuestion_id__gt=current_question).order_by(
                "quizQuestion_id")[:1]
        else:
            return models.QuizzesQuestions.objects.filter(quiz=quiz)


class CourseQuizList(generics.ListCreateAPIView):
    queryset = models.CourseQuiz.objects.all()
    serializer_class = CourseQuizSerialize

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)


def fetch_quiz_assign_status(request, quiz_id, course_id):
    quiz = models.Quizzes.objects.filter(quiz_id=quiz_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    assignStatus = models.CourseQuiz.objects.filter(course=course, quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


def fetch_quiz_attempt_status(request, quiz_id, student_id):
    quiz = models.Quizzes.objects.filter(quiz_id=quiz_id).first()
    student = models.Students.objects.filter(student_id=student_id).first()
    attemptStatus = models.AttemptQuestion.objects.filter(student=student, question__quiz=quiz).count()
    print(models.AttemptQuiz.objects.filter(student=student, question__quiz=quiz).query)
    if attemptStatus > 0:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class AttemptQuestionList(generics.ListCreateAPIView):
    queryset = models.AttemptQuestion.objects.all()
    serializer_class = AttemptQuestionSerialize


class AttemptQuizList(generics.ListCreateAPIView):
    queryset = models.AttemptQuiz.objects.all()
    serializer_class = AttemptQuizSerialize

    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id = self.kwargs['quiz_id']
            quiz = models.Quizzes.objects.get(pk=quiz_id)
            return models.AttemptQuiz.objects.filter(quiz=quiz).distinct('student_id')


def fetch_quiz_result(request, quiz_id, student_id):
    quiz = models.Quizzes.objects.filter(quiz_id=quiz_id).first()
    student = models.Students.objects.filter(student_id=student_id).first()
    total_questions = models.QuizzesQuestions.objects.filter(quiz=quiz).count()
    total_answered_question = models.AttemptQuiz.objects.filter(quiz=quiz, student=student).values('student').count()
    attempted_questions = models.AttemptQuiz.objects.filter(quiz=quiz, student=student)

    total_correct_answers = 0
    for attempt in attempted_questions:
        if attempt.correct_answer == attempt.question.correct_answer:
            total_correct_answers += 1

    return JsonResponse({'total_questions': total_questions, 'total_answered_question': total_answered_question,
                         'total_correct_answers': total_correct_answers})


class StudyMaterialsList(generics.ListCreateAPIView):
    serializer_class = StudyMaterialsSerialize

    def get_queryset(self):
        try:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudyMaterial.objects.filter(course_id=course)
        except models.Course.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class StudyMaterialsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudyMaterial.objects.all()
    serializer_class = StudyMaterialsSerialize


def update_view(request, course_id):
    queryset = models.Course.objects.filter(pk=course_id).first()
    queryset.course_views += 1
    queryset.save()
    return JsonResponse({'views': queryset.course_views})


class FAQList(generics.ListAPIView):
    queryset = models.FAQ.objects.all()
    serializer_class = FAQSerializer

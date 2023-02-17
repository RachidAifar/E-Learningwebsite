from django.db import models
from django.core import serializers


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    image = models.CharField(max_length=100)
    dateOfJoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Users"


class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    teacher_fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    mobile_phone = models.CharField(max_length=30)
    speciality = models.CharField(max_length=150, default='Teacher')
    bio = models.TextField(max_length=200, default='None')
    address = models.CharField(max_length=30)
    skills = models.TextField(max_length=200, default='None')
    teacher_profile = models.ImageField(upload_to='teacher_profile_images/', default='https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg', null=True)
    dateofjoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Teacher"

    # fetch all the skills
    def skills_list(self):
        skills_list = str(self.skills).split(',')
        return skills_list

    # total teacher courses
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses

    # total teacher Chapters
    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course_id__teacher=self).count()
        return total_chapters

    # total teacher student
    def total_teacher_student(self):
        total_student = Enrollments.objects.filter(course__teacher=self).count()
        return total_student


class CourseCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    objects = models.Manager()

    class Meta:
        verbose_name = "Course Category"

    def __str__(self):  ##we are returning title
        return self.title


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(CourseCategory, default=None, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE, related_name='teacher_courses')
    course_title = models.CharField(max_length=50, default=None)
    course_description = models.TextField(max_length=400, default='None')
    feature_img = models.ImageField(upload_to='course_images/', null=True)
    technologies = models.TextField(max_length=50, default='None')
    course_views = models.BigIntegerField(default=0)
    dateOfJoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Course"

    # in order to get related courses
    def related_videos(self):
        related_videos = Course.objects.filter(technologies__icontains=self.technologies)
        return serializers.serialize('json', related_videos)

    def technologies_list(self):
        technologies_list = str(self.technologies).split(',')
        return technologies_list

    def total_enrolled_students(self):
        total_enrolled_students = Enrollments.objects.filter(course=self).count()
        return total_enrolled_students

    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']


class Chapter(models.Model):
    chapter_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE, related_name='course_chapters')
    chapter_title = models.CharField(max_length=150, default=None)
    chapter_description = models.TextField(max_length=300, default='None')
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(max_length=150, default='None')
    dateOfJoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Chapter"


class Students(models.Model):
    student_id = models.AutoField(primary_key=True)
    student_fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    interested_categories = models.TextField(max_length=150, default='None')
    mobile_phone = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    dateOfJoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Students"

    def __str__(self):  ##we are returning title
        return self.student_fullname

    # total enrolled course
    def total_enrolled_courses(self):
        total_courses = Enrollments.objects.filter(student=self).count()
        return total_courses

        # total Favorite Chapters

    def total_favorite_courses(self):
        favorite_courses = StudentFavoriteCourses.objects.filter(student=self).count()
        return favorite_courses

        # completed assignment

    def total_completed_assignments(self):
        completed_assignments = StudentAssignment.objects.filter(student=self, student_status=True).count()
        return completed_assignments

    # pending assignment
    def total_pending_assignment(self):
        pending_assignment = StudentAssignment.objects.filter(student=self, student_status=False).count()
        return pending_assignment


class VideoInfo(models.Model):
    vinfo_id = models.AutoField(primary_key=True)
    v_titer = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    uploader_name = models.CharField(max_length=100)
    dateOfUploading = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Video Info"


class CourseVideo(models.Model):
    cvideo_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    vinfo_id = models.ForeignKey(VideoInfo, default=None, on_delete=models.CASCADE)
    video_link = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Course Video"


class Quizzes(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    teacher = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    detail = models.TextField(max_length=300, default='None')
    dateOfCreating = models.DateField(auto_now_add=True)
    objects = models.Manager()

    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()


class QuizzesQuestions(models.Model):
    quizQuestion_id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quizzes, default=None, on_delete=models.CASCADE)
    question = models.CharField(max_length=200)
    correct_answer = models.CharField(max_length=200)
    answer_1 = models.CharField(max_length=200)
    answer_2 = models.CharField(max_length=200)
    answer_3 = models.CharField(max_length=200)
    answer_4 = models.CharField(max_length=200)
    dateOfCreating = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Quizzes Question "


# add quiz to the course
class CourseQuiz(models.Model):
    teacher = models.ForeignKey(Teacher, null=True, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quizzes, null=True, on_delete=models.CASCADE)
    created_time = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Course Quiz"


class CoursePDF(models.Model):
    cpdf_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    pdf_file = models.CharField(max_length=100)
    uploader_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "CoursePDF"


class QuizScore(models.Model):
    quizScore_id = models.AutoField(primary_key=True)
    quiz_id = models.ForeignKey(Quizzes, default=None, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        verbose_name = "Quiz Score"


class Enrollments(models.Model):
    enrollment_id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, default=None, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Students, default=None, on_delete=models.CASCADE, related_name='enrolled_student')
    enrollment_date = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Enrollments"

    def __str__(self):  ##we are returning title
        return f"{self.course}-{self.student}"


# Course Rating and Reviews
class CourseRating(models.Model):
    course = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)
    reviews = models.TextField(max_length=200, default=None)
    review_time = models.DateField(auto_now_add=True)
    objects = models.Manager()

    def __str__(self):  ##we are returning title
        return f"{self.course}-{self.student}-{self.rating}"


class StudentFavoriteCourses(models.Model):
    course = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    objects = models.Manager()

    def __str__(self):  ##we are returning title
        return f"{self.course}-{self.student}"


class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    detail = models.TextField(max_length=200, default=None)
    created_time = models.DateField(auto_now_add=True)
    student_status = models.BooleanField(default=False, null=True)
    objects = models.Manager()

    def __str__(self):  ##we are returning title
        return f"{self.title}"


class Notification(models.Model):
    notif_id = models.AutoField(primary_key=True)
    teacher = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    notif_for = models.CharField(max_length=200, default=None)
    notif_subject = models.CharField(max_length=200, default=None)
    created_time = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=False, null=True)
    objects = models.Manager()


# attempt quiz question by student
class AttemptQuestion(models.Model):
    student = models.ForeignKey(Students, null=True, on_delete=models.CASCADE)
    question = models.ForeignKey(QuizzesQuestions, null=True, on_delete=models.CASCADE)
    correct_answer = models.CharField(max_length=200, default=None)
    created_time = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Attempt Question"


# study material model
class StudyMaterial(models.Model):
    course = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, default=None)
    description = models.TextField(max_length=300, default='None')
    files = models.FileField(upload_to='study_materials/', null=True)
    remarks = models.TextField(max_length=150, default='None')
    uploaded_date = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Course Study Materials"


class AttemptQuiz(models.Model):
    student = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quizzes, default=None, on_delete=models.CASCADE)
    question = models.ForeignKey(QuizzesQuestions, default=None, on_delete=models.CASCADE)
    correct_answer = models.CharField(max_length=200, default=None)
    uploaded_date = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Attempted  Quiz"


class FAQ(models.Model):
    faq_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=300, default='None')
    answer = models.TextField(max_length=300, default=None)
    uploaded_date = models.DateField(auto_now_add=True)
    objects = models.Manager()
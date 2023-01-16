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
    email = models.EmailField(max_length=100)
    mobile_phone = models.CharField(max_length=30)
    speciality = models.CharField(max_length=150, default='Teacher')
    bio = models.TextField(max_length=200, default='None')
    address = models.CharField(max_length=30)
    skills = models.TextField(max_length=200, default='None')
    teacher_profile = models.ImageField(upload_to='teacher_profile_images/', null=True)
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
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile_phone = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    dateOfJoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Students"

    def __str__(self):  ##we are returning title
        return self.student_fullname


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
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    teacher_id = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    correct_answer = models.CharField(max_length=100)
    answer_1 = models.CharField(max_length=100)
    answer_2 = models.CharField(max_length=100)
    answer_3 = models.CharField(max_length=100)
    answer_4 = models.CharField(max_length=100)
    dateOfCreating = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Quizzes"


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

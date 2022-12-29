from django.db import models


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
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile_phone = models.CharField(max_length=30)
    speciality = models.CharField(max_length=150, default='Teacher')
    address = models.CharField(max_length=30)
    dateofjoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Teacher"


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
    teacher = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    course_title = models.CharField(max_length=50, default=None)
    course_description = models.TextField(max_length=200, default='None')
    feature_img = models.ImageField(upload_to='course_images/', null=True)
    technologies = models.TextField(max_length=50, default='None')
    dateOfJoining = models.DateField(auto_now_add=True)
    objects = models.Manager()

    class Meta:
        verbose_name = "Course"


class Chapter(models.Model):
    chapter_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    chapter_title = models.CharField(max_length=50, default=None)
    chapter_description = models.TextField(max_length=50, default='None')
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(max_length=50, default='None')
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
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Enrollments"

from django.db import models


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    image = models.CharField(max_length=100)
    dateOfJoining = models.DateField(auto_now_add=True)


class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    teacher_fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile_phone = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    dateofjoining = models.DateField(auto_now_add=True)


class CourseCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    category_id = models.ForeignKey(CourseCategory, default=None, on_delete=models.CASCADE)
    teacher_id = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    course_title = models.CharField(max_length=50, default=None)
    dateOfJoining = models.DateField(auto_now_add=True)


class Students(models.Model):
    student_id = models.AutoField(primary_key=True)
    student_fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile_phone = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    dateOfJoining = models.DateField(auto_now_add=True)


class VideoInfo(models.Model):
    vinfo_id = models.AutoField(primary_key=True)
    v_titer = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    uploader_name = models.CharField(max_length=100)
    dateOfUploading = models.DateField(auto_now_add=True)


class CourseVideo(models.Model):
    cvideo_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    vinfo_id = models.ForeignKey(VideoInfo, default=None, on_delete=models.CASCADE)
    video_link = models.CharField(max_length=100)


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


class CoursePDF(models.Model):
    cpdf_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    pdf_file = models.CharField(max_length=100)
    uploader_name = models.CharField(max_length=100)


class QuizScore(models.Model):
    quizScore_id = models.AutoField(primary_key=True)
    quiz_id = models.ForeignKey(Quizzes, default=None, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)


class Enrollments(models.Model):
    enrollment_id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Students, default=None, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)

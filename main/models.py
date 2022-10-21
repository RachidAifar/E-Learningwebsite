from django.db import models


# ##table Teachear{
#   teacher_id number [pk,increment]
#   teacher_fullname varchar
#   email varchar
#   password varchar
#   course_id numbe
#   mobile_phone number
#   address varchar
#
# }
# table Student{
#   student_id number [pk,increment]
#   student_fullname varchar
#   email varchar
#   password varchar
#   course_id number [ref: > Course.course_id ]
#   mobile_phone number
#   address varchar
# }
# table CourseCategory{
#   category_id number [pk,increment]
#   title varchar
#   description varchar
# }
# table Course{
#   course_id number [pk,increment]
#   category_id number [ref: > CourseCategory.category_id ]
#   teacher_id number  [ref: > Teachear.teacher_id ]
#   course_name varchar
#   title varchar
#   description varchar
# }
# table VideoInfo{
#   vinfo_id number [pk,increment]
#   v_titer varchar
#   description varchar
#   upldoder_name varchr
#   dateofuploading varchr
# }
# table CourseVideo{
#   cvideo_id number [pk,increment]
#   course_id number [ref: > Course.course_id ]
#   vinfo_id number [ref: > VideoInfo.vinfo_id ]
#   video_link varchar
# }
# table Quizes{
#   quize_id number [pk,increment]
#   course_id number [ref: > Course.course_id ]
#   teacher_id number  [ref: > Teachear.teacher_id ]
#   question varchar
#   correct_answer varchr
#   answer_1 varchr
#   answer_2 varchr
#   answer_3 varchr
#   answer_4 varchr
# }
# table CoursePDF{
#   cpdf_id number [pk,increment]
#   course_id number [ref: > Course.course_id ]
#   pdf_file varchr
# }


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    image = models.CharField(max_length=100)
    dateOfJoining = models.DateField(auto_now_add=True)


class ContactInfo(models.Model):
    contact_id = models.AutoField(primary_key=True)
    phone_number = models.IntegerField()
    address = models.CharField(max_length=100)


class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    teacher_fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    dateOfJoining = models.DateField(auto_now_add=True)
    contact_id = models.ForeignKey(ContactInfo, default=None, on_delete=models.CASCADE)


class CourseCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    category_id = models.ForeignKey(CourseCategory, default=None, on_delete=models.CASCADE)
    teacher_id = models.ForeignKey(Teacher, default=None, on_delete=models.CASCADE)
    course_title = models.CharField(max_length=50)
    course_description = models.CharField(max_length=50)
    dateOfJoining = models.DateField(auto_now_add=True)


class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    student_fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    dateOfJoining = models.DateField(auto_now_add=True)
    course_id = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    contact_id = models.ForeignKey(ContactInfo, default=None, on_delete=models.CASCADE)


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
    student_id = models.ForeignKey(Student, default=None, on_delete=models.CASCADE)
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

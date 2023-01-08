from rest_framework import serializers
from . import models


class StudentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Students
        fields = ['student_id', 'student_fullname', 'password', 'email', 'mobile_phone', 'address', 'dateOfJoining']


class TeacherSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['teacher_id', 'teacher_fullname', 'password', 'email', 'mobile_phone', 'address', 'speciality',
                  'dateofjoining']


class CourseCategorySerialize(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['category_id', 'title', 'description']


class CourseSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['course_id', 'category', 'teacher', 'course_title', 'course_description', 'feature_img',
                  'technologies', 'dateOfJoining', 'course_chapters']
        depth = 1  # to fetch data related to this model one relation


class ChapterSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['chapter_id', 'course_id', 'chapter_title', 'chapter_description', 'video', 'remarks',
                  'dateOfJoining']

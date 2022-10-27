from rest_framework import serializers
from . import models


class StudentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Students
        fields = ['student_id', 'student_fullname', 'password', 'email', 'mobile_phone', 'address', 'dateOfJoining']


class TeacherSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['teacher_id', 'teacher_fullname', 'password', 'email', 'mobile_phone', 'address', 'dateofjoining']


class CourseCategorySerialize(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['category_id', 'title', 'description']


class CourseSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['course_id', 'category_id', 'teacher_id', 'course_title', 'dateOfJoining']


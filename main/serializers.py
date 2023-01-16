from rest_framework import serializers
from . import models


class StudentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Students
        fields = ['student_id', 'student_fullname', 'password', 'email', 'mobile_phone', 'address', 'dateOfJoining']


class TeacherSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['teacher_id', 'teacher_fullname', 'password', 'email', 'teacher_profile', 'mobile_phone', 'address', 'speciality', 'bio',
                  'skills', 'skills_list',
                  'dateofjoining', 'teacher_courses']

    def __init__(self, *args, **kwargs):
        super(TeacherSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['total_teacher_courses', 'total_teacher_chapters', 'total_teacher_student']


class CourseCategorySerialize(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['category_id', 'title', 'description']


class CourseSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['course_id', 'category', 'teacher', 'course_title', 'course_description', 'feature_img',
                  'technologies', 'dateOfJoining', 'course_chapters', 'related_videos', 'technologies_list',
                  'total_enrolled_students', 'course_rating']
        # to fetch data related to this model one relation

    def __init__(self, *args, **kwargs):
        super(CourseSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class ChapterSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['chapter_id', 'course_id', 'chapter_title', 'chapter_description', 'video', 'remarks',
                  'dateOfJoining']

    def __init__(self, *args, **kwargs):
        super(ChapterSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class EnrollmentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Enrollments
        fields = ['enrollment_id', 'course', 'student', 'enrollment_date']

    def __init__(self, *args, **kwargs):
        super(EnrollmentSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['course', 'student', 'rating', 'reviews', 'review_time']

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1

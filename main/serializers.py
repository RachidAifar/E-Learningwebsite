from rest_framework import serializers
from . import models


class StudentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Students
        fields = ['student_id', 'student_fullname', 'password', 'email', 'mobile_phone', 'interested_categories',
                  'address', 'dateOfJoining']


class TeacherSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['teacher_id', 'teacher_fullname', 'password', 'email', 'teacher_profile', 'mobile_phone', 'address',
                  'speciality', 'bio',
                  'skills', 'skills_list',
                  'dateofjoining', 'teacher_courses', 'total_teacher_courses']

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


class StudentDashBoardSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Students
        fields = ['total_enrolled_courses', 'total_favorite_courses', 'total_completed_assignments',
                  'total_pending_assignment']


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
            self.Meta.depth = 2


class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['course', 'student', 'rating', 'reviews', 'review_time']

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class StudentFavoriteCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourses
        fields = ['id', 'student', 'course', 'status']

    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCoursesSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = ['id', 'teacher', 'student', 'title', 'detail', 'student_status', 'created_time']

    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['student', 'teacher', 'notif_for', 'notif_subject', 'created_time', 'status']

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quizzes
        fields = ['quiz_id', 'teacher', 'title', 'detail', 'dateOfCreating', 'assign_status']

    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizzesQuestions
        fields = ['quizQuestion_id', 'quiz', 'question', 'correct_answer', 'answer_1', 'answer_2', 'answer_3',
                  'answer_4']

    def __init__(self, *args, **kwargs):
        super(QuizQuestionSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class CourseQuizSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields = ['teacher', 'course', 'quiz', 'created_time']

    def __init__(self, *args, **kwargs):
        super(CourseQuizSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class AttemptQuestionSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.AttemptQuestion
        fields = ['id', 'student', 'question', 'correct_answer', 'created_time']

    def __init__(self, *args, **kwargs):
        super(AttemptQuestionSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class StudyMaterialsSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterial
        fields = ['id', 'title', 'course', 'description', 'files', 'remarks', 'uploaded_date']

    def __init__(self, *args, **kwargs):
        super(StudyMaterialsSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class AttemptQuizSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.AttemptQuiz
        fields = ['id', 'student', 'quiz', 'question', 'correct_answer', 'uploaded_date']

    def __init__(self, *args, **kwargs):
        super(AttemptQuizSerialize, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2

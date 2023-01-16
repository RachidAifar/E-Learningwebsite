from django.urls import path

from . import views

urlpatterns = [
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetails.as_view()),
    path('student_login', views.student_login),
    path('student_enroll_course/', views.StudentEnrollmentList.as_view()),
    path('fetch_enroll_status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch_rating_status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('fetch_allenrolled_students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    # fetch enrolled  student in specific course :
    path('fetch_enrolled_students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('course_rating/<int:course_id>', views.CourseRatingList.as_view()),

    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>', views.TeacherDetail.as_view()),
    path('teacher_login', views.teachers_login),
    path('teacher/change_password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher/teacher_dashboard/<int:pk>', views.TeacherDashboard.as_view()),


    path('courseCategory/', views.CourseCategoryList.as_view()),
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>/', views.CourseDetailView.as_view()),

    path('teacher_courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    # course detail
    path('teacher_course_detail/<int:pk>', views.TeacherCourseDetail.as_view()),

    path('chapter/', views.ChapterList.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course_chapter/<int:course_id>', views.CourseChapterList.as_view()),  # specific course chapter

]

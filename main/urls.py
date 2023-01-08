from django.urls import path

from . import views

urlpatterns = [
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetails.as_view()),

    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher_login',views.teachers_login),

    path('courseCategory/', views.CourseCategoryList.as_view()),
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>/', views.CourseDetailView.as_view()),

    path('teacher_courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    # course detail
    path('teacher_course_detail/<int:pk>', views.TeacherCourseDetail.as_view()),



    path('chapter/', views.ChapterList.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course_chapter/<int:course_id>', views.CourseChapterList.as_view()),#specific course chapter


]

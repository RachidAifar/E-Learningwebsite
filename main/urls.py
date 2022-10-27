from django.urls import path

from . import views

urlpatterns = [
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetails.as_view()),

    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),

    path('courseCategory/', views.CourseCategoryList.as_view()),

    path('course/', views.CourseList.as_view()),
]

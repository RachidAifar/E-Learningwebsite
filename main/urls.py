from django.urls import path

from . import views

urlpatterns = [
    path('student/', views.StudentList.as_view()),
    #path('teacher/<int:pk>/', views.SnippetDetail.as_view()),
]
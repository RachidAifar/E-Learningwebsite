from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import StudentSerialize
from .serializers import TeacherSerialize
from .serializers import CourseCategorySerialize
from .serializers import CourseSerialize
from . import models


# post and fetch
class StudentList(generics.ListCreateAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize
    permission_classes = [permissions.IsAuthenticated]


# update date and delete data
class StudentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize
    permission_classes = [permissions.IsAuthenticated]
    # def get(self, request):
    #     students = models.Students.objects.all()
    #     serializer = StudentSerialize(students, many=True)
    #     return Response(serializer.data)


class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerialize


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerialize
class StudentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize

class CourseCategoryList(APIView):
    def get(self, request):
        courseCategory = models.CourseCategory.objects.all()
        serializer = CourseCategorySerialize(courseCategory, many=True)
        return Response(serializer.data)


class CourseList(APIView):
    def get(self, request):
        course = models.Course.objects.all()
        serializer = CourseSerialize(course, many=True)
        return Response(serializer.data)


def index(request):
    return HttpResponse("Hello, world. You're here finally")

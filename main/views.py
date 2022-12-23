from django.shortcuts import render
from django.http import JsonResponse, HttpResponse  ##without this you can not submit a form to django
from django.views.decorators.csrf import csrf_exempt
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


@csrf_exempt
def teachers_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(password=password, email=email)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


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

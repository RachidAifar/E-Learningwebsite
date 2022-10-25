from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .serializers import StudentSerialize
from . import models

class StudentList(APIView):
    def get(self, request):
        students = models.Students.objects.all()
        serializer = StudentSerialize(students, many=True)
        return Response(serializer.data)

def index(request):
    return HttpResponse("Hello, world. You're here finally")

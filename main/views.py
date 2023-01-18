from django.db.models import Q
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse  ##without this you can not submit a form to django
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import StudentSerialize, TeacherSerialize, CourseCategorySerialize, CourseSerialize, ChapterSerialize, \
    CourseRatingSerializer, EnrollmentSerialize, TeacherDashboardSerializer, StudentFavoriteCoursesSerializer
from . import models
from django.http import Http404


# post and fetch
class StudentList(generics.ListCreateAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize


# update date and delete data
class StudentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize
    # def get(self, request):
    #     students = models.Students.objects.all()
    #     serializer = StudentSerialize(students, many=True)
    #     return Response(serializer.data)


@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = models.Students.objects.get(password=password, email=email)
    except models.Students.DoesNotExist:
        studentData = None
    if studentData:
        return JsonResponse({'bool': True, 'student_id': studentData.student_id})
    else:
        return JsonResponse({'bool': False})


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
        return JsonResponse({'bool': True, 'teacher_id': teacherData.teacher_id})
    else:
        return JsonResponse({'bool': False})


class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer


class StudentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Students.objects.all()
    serializer_class = StudentSerialize


class CourseCategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CourseCategorySerialize
    # serializer = CourseCategorySerialize(courseCategory, many=True)
    # return Response(serializer.data)


# get all courses
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerialize

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-course_id')[:limit]
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(technologies__icontains=category)
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(teacher_id=teacher).first()
            qs = models.Course.objects.filter(technologies__icontains=skill_name, teacher=teacher)
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Students.objects.get(pk=student_id)
            print(student.interested_categories)
            queries = [Q(technologies__iendswith=value) for value in student.interested_categories]
            query = queries.pop()
            for item in queries:
                query |= item
            qs = models.Course.objects.filter(query)
            return qs

        return qs


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerialize


# get specific teacher course
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerialize

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)


class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerialize


class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerialize


class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerialize

    def get_queryset(self):
        try:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.Chapter.objects.filter(course_id=course)
        except models.Course.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerialize


class StudentEnrollmentList(generics.ListCreateAPIView):
    queryset = models.Enrollments.objects.all()
    serializer_class = EnrollmentSerialize


def fetch_enroll_status(request, student_id, course_id):
    student = models.Students.objects.filter(student_id=student_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    enrollStatus = models.Enrollments.objects.filter(course=course, student=student) #//maybe i would need count() here
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class EnrolledStudentList(generics.ListAPIView):
    queryset = models.Enrollments.objects.all()
    serializer_class = EnrollmentSerialize

    def get_queryset(self):
        try:
            if 'course_id' in self.kwargs:
                course_id = self.kwargs['course_id']
                course = models.Course.objects.get(pk=course_id)
                return models.Enrollments.objects.filter(course_id=course)
            elif 'teacher_id' in self.kwargs:
                teacher_id = self.kwargs['teacher_id']
                teacher = models.Teacher.objects.get(pk=teacher_id)
                return models.Enrollments.objects.filter(course__teacher=teacher).distinct('student_id')
            elif 'student_id' in self.kwargs:
                student_id = self.kwargs['student_id']
                student = models.Students.objects.get(pk=student_id)
                return models.Enrollments.objects.filter(student=student).distinct('course_id')
        except models.Enrollments.DoesNotExist:
            raise Http404("no student enrolled in this course")
        except Exception as e:
            raise Http404("An error occurred")


class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        try:
            course_id = self.kwargs['course_id']
            # student_id = self.kwargs['student_id']
            course = models.Course.objects.get(pk=course_id)
            return models.CourseRating.objects.filter(course_id=course)
        except models.Course.DoesNotExist:
            raise Http404("Course does not exist")
        except Exception as e:
            raise Http404("An error occurred")


def fetch_rating_status(request, student_id, course_id):
    student = models.Students.objects.filter(student_id=student_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


@csrf_exempt
def teacher_change_password(request, teacher_id):
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(teacher_id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        models.Teacher.objects.filter(teacher_id=teacher_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class StudentFavoriteCoursesList(generics.ListCreateAPIView):
    queryset = models.StudentFavoriteCourses.objects.all()
    serializer_class = StudentFavoriteCoursesSerializer

    def get_queryset(self):
        try:
            if 'student_id' in self.kwargs:
                student_id = self.kwargs['student_id']
                student = models.Students.objects.get(pk=student_id)
                return models.StudentFavoriteCourses.objects.filter(student=student).distinct('course_id')
        except models.Enrollments.DoesNotExist:
            raise Http404("no student enrolled in this course")
        except Exception as e:
            raise Http404("An error occurred")


def remove_favorite_course(request, course_id, student_id):
    student = models.Students.objects.filter(student_id=student_id).first()
    course = models.Course.objects.filter(course_id=course_id).first()
    favoriteStatus = models.StudentFavoriteCourses.objects.filter(course=course, student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

from django.contrib import admin
from . import models

admin.site.register(models.Teacher)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.Students)
admin.site.register(models.CourseCategory)
admin.site.register(models.CourseVideo)
admin.site.register(models.VideoInfo)
admin.site.register(models.Quizzes)
admin.site.register(models.CoursePDF)
admin.site.register(models.Enrollments)
admin.site.register(models.QuizScore)
admin.site.register(models.CourseRating)
admin.site.register(models.StudentFavoriteCourses)
from django.contrib import admin
from . import models

admin.site.register(models.Users)
admin.site.register(models.Teacher)
admin.site.register(models.Course)
admin.site.register(models.Student)
admin.site.register(models.ContactInfo)
admin.site.register(models.CourseCategory)
admin.site.register(models.CourseVideo)
admin.site.register(models.VideoInfo)
admin.site.register(models.Quizzes)
admin.site.register(models.CoursePDF)

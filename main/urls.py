from django.urls import path
from . import views
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('E-Learningwebsite', include('main.urls')),
    path('admin/', admin.site.urls),
]
urlpatterns = [
    path('', views.index, name='index'),
]
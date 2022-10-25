from rest_framework import serializers
from . import models


class StudentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Students
        fields = ['student_fullname', 'password', 'email', 'mobile_phone', 'address','dateOfJoining']

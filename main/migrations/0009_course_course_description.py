# Generated by Django 4.1.1 on 2022-12-24 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_rename_teacher_id_course_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_description',
            field=models.TextField(default='python', max_length=50),
        ),
    ]
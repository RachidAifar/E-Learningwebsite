# Generated by Django 4.1.1 on 2022-12-24 22:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_rename_category_id_course_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='teacher_id',
            new_name='teacher',
        ),
    ]

# Generated by Django 4.1.1 on 2022-12-24 22:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_rename_speciality_teacher_speciality'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='category_id',
            new_name='category',
        ),
    ]
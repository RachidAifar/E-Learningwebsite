# Generated by Django 4.1.1 on 2022-12-26 14:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_alter_course_course_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chapter',
            old_name='course',
            new_name='course_id',
        ),
    ]

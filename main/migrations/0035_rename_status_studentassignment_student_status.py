# Generated by Django 4.1.1 on 2023-01-23 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0034_studentassignment_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentassignment',
            old_name='status',
            new_name='student_status',
        ),
    ]

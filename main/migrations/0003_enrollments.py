# Generated by Django 4.1.1 on 2022-10-23 09:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_quizscore'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enrollments',
            fields=[
                ('enrollment_id', models.AutoField(primary_key=True, serialize=False)),
                ('enrollment_date', models.DateField(auto_now_add=True)),
                ('course_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('student_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.students')),
            ],
        ),
    ]

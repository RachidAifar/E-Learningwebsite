# Generated by Django 4.1.1 on 2023-01-18 12:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0031_alter_students_email_alter_teacher_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentAssignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('detail', models.TextField(default=None, max_length=200)),
                ('created_time', models.DateField(auto_now_add=True)),
                ('student', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.students')),
            ],
        ),
    ]

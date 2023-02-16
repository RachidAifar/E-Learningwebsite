# Generated by Django 4.1.1 on 2023-02-06 22:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0049_rename_course_id_studymaterial_course'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttemptQuiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('correct_answer', models.CharField(default=None, max_length=200)),
                ('uploaded_date', models.DateField(auto_now_add=True)),
                ('question', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.quizzesquestions')),
                ('quiz', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.quizzes')),
                ('student', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.students')),
            ],
            options={
                'verbose_name': 'Attempted  Quiz',
            },
        ),
    ]
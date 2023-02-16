# Generated by Django 4.1.1 on 2023-01-25 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0040_notification_notif_subject'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quizzes',
            options={},
        ),
        migrations.RenameField(
            model_name='quizzes',
            old_name='answer_1',
            new_name='title',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='answer_2',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='answer_3',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='answer_4',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='correct_answer',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='course_id',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='question',
        ),
        migrations.RemoveField(
            model_name='quizzes',
            name='teacher_id',
        ),
        migrations.AddField(
            model_name='quizzes',
            name='detail',
            field=models.TextField(default='None', max_length=300),
        ),
    ]

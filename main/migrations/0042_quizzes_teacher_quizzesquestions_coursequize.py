# Generated by Django 4.1.1 on 2023-01-25 15:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0041_alter_quizzes_options_rename_answer_1_quizzes_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizzes',
            name='teacher',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
        migrations.CreateModel(
            name='QuizzesQuestions',
            fields=[
                ('quizQuestion_id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=200)),
                ('correct_answer', models.CharField(max_length=200)),
                ('answer_1', models.CharField(max_length=200)),
                ('answer_2', models.CharField(max_length=200)),
                ('answer_3', models.CharField(max_length=200)),
                ('answer_4', models.CharField(max_length=200)),
                ('dateOfCreating', models.DateField(auto_now_add=True)),
                ('quiz', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.quizzes')),
            ],
            options={
                'verbose_name': 'Quizzes Question ',
            },
        ),
        migrations.CreateModel(
            name='CourseQuize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateField(auto_now_add=True)),
                ('course', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('quiz', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.quizzes')),
            ],
        ),
    ]

# Generated by Django 4.1.1 on 2022-10-23 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('course_title', models.CharField(default=None, max_length=50)),
                ('dateOfJoining', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CourseCategory',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Students',
            fields=[
                ('student_id', models.AutoField(primary_key=True, serialize=False)),
                ('student_fullname', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('mobile_phone', models.CharField(max_length=30)),
                ('address', models.CharField(max_length=30)),
                ('dateOfJoining', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('teacher_id', models.AutoField(primary_key=True, serialize=False)),
                ('teacher_fullname', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('mobile_phone', models.CharField(max_length=30)),
                ('address', models.CharField(max_length=30)),
                ('dateofjoining', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('image', models.CharField(max_length=100)),
                ('dateOfJoining', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='VideoInfo',
            fields=[
                ('vinfo_id', models.AutoField(primary_key=True, serialize=False)),
                ('v_titer', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('uploader_name', models.CharField(max_length=100)),
                ('dateOfUploading', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Quizzes',
            fields=[
                ('quiz_id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=100)),
                ('correct_answer', models.CharField(max_length=100)),
                ('answer_1', models.CharField(max_length=100)),
                ('answer_2', models.CharField(max_length=100)),
                ('answer_3', models.CharField(max_length=100)),
                ('answer_4', models.CharField(max_length=100)),
                ('dateOfCreating', models.DateField(auto_now_add=True)),
                ('course_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('teacher_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.teacher')),
            ],
        ),
        migrations.CreateModel(
            name='CourseVideo',
            fields=[
                ('cvideo_id', models.AutoField(primary_key=True, serialize=False)),
                ('video_link', models.CharField(max_length=100)),
                ('course_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('vinfo_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.videoinfo')),
            ],
        ),
        migrations.CreateModel(
            name='CoursePDF',
            fields=[
                ('cpdf_id', models.AutoField(primary_key=True, serialize=False)),
                ('pdf_file', models.CharField(max_length=100)),
                ('uploader_name', models.CharField(max_length=100)),
                ('course_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='category_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.coursecategory'),
        ),
        migrations.AddField(
            model_name='course',
            name='teacher_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
    ]

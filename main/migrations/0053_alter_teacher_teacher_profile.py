# Generated by Django 4.1.1 on 2023-02-13 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0052_alter_course_course_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='teacher_profile',
            field=models.ImageField(default='https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg', null=True, upload_to='teacher_profile_images/'),
        ),
    ]

# Generated by Django 4.1.1 on 2023-01-02 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_rename_course_chapter_course_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='chapter_description',
            field=models.TextField(default='None', max_length=150),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='chapter_title',
            field=models.CharField(default=None, max_length=150),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='remarks',
            field=models.TextField(default='None', max_length=150),
        ),
    ]
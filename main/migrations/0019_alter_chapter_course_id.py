# Generated by Django 4.1.1 on 2023-01-07 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_alter_chapter_chapter_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='course_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='course_chapters', to='main.course'),
        ),
    ]

# Generated by Django 4.1.1 on 2023-02-05 18:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0048_studymaterial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studymaterial',
            old_name='course_id',
            new_name='course',
        ),
    ]
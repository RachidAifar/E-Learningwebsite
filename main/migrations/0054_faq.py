# Generated by Django 4.1.1 on 2023-02-16 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0053_alter_teacher_teacher_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('faq_id', models.AutoField(primary_key=True, serialize=False)),
                ('answer', models.CharField(default=None, max_length=300)),
                ('uploaded_date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
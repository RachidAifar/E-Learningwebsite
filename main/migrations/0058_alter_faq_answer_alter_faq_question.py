# Generated by Django 4.1.1 on 2023-02-16 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0057_faq_answer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='faq',
            name='answer',
            field=models.TextField(default=None, max_length=300),
        ),
        migrations.AlterField(
            model_name='faq',
            name='question',
            field=models.CharField(default='None', max_length=300),
        ),
    ]

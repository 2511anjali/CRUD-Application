from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class Book(models.Model):
    title = models.CharField(max_length=120)
    about = models.TextField()
    price = models.IntegerField()
    customer = models.ForeignKey(User,on_delete=models.CASCADE,related_name="books")

    def __str__(self):
        return self.title
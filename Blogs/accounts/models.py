from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from .managers import *
from PIL import Image


# Create your models here.


class User(AbstractUser):
    username = None
    profile_picture = models.ImageField(upload_to='images', null=True)
    email = models.EmailField(unique = True, max_length=254)
    is_varified = models.BooleanField(default = False)
    otp = models.CharField(max_length=4, null = True, blank = True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def name(self):
        return self.first_name + '' + self.last_name
            
    
    def __str__(self):
        return self.email
    

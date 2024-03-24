from django.db import models
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class BaseModel(models.Model):
    uuid = models.UUIDField(primary_key = True, editable = False, default = uuid.uuid4)
    created_at = models.DateField(auto_now_add = True)
    updated_at = models.DateField(auto_now_add = True)
    
    class Meta:
        abstract = True
    
class Blogs(BaseModel):
    username = models.ForeignKey(User, on_delete=models.CASCADE, null = True, blank = True, related_name = 'blogs')
    title = models.CharField(max_length = 50)
    descriptions = models.TextField()
    image = models.FileField(upload_to='blog')
    created_at = models.DateField(auto_now_add=True) 
    
    def __str__(self) -> str:
        return self.title
        
    
class Contact(models.Model):
    subject = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    email = models.CharField(max_length = 50)
    message = models.TextField()         

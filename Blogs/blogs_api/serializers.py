from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class CreatedBlogs(serializers.ModelSerializer):
    class Meta:
        model = BaseModel
        fields= ['created_on']
 

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['uuid', 'title', 'descriptions', 'image', 'created_at']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'subject', 'email', 'message']
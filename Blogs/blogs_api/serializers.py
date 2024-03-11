from rest_framework import serializers
from .models import *

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['uuid', 'title', 'descriptions', 'image', 'username']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'subject', 'email', 'message']
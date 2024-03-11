from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *

class UserRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'profile_picture']
    

    
class Login(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
        
    class Meta:
        model = User
        fields = '__all__'
        
    
    def validate(self, data):
        if not User.objects.filter(email = data['email']).exists():
            raise serializers.ValidationError("account not found")
        
        if not User.objects.filter(password = data['password']).exists():
            raise serializers.ValidationError("Invalid password")
        
        return data
    
    
  
        
        
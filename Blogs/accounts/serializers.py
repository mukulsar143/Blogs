from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *

class UserRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'profile_picture']
        extra_kwargs = {
            'password': {'write_only': True}  # Hide password field in output
        }
    
    def create(self, validated_data):
        try:
            # Create the user object
            user = User.objects.create(
                email=validated_data['email'],
                profile_picture=validated_data.get('profile_picture', None)  # Handle case when profile_picture is not provided
            )
            user.set_password(validated_data['password'])
            user.save()
            return user  # Return the created user object
        except Exception as e:
            # Handle exceptions when creating user
            raise serializers.ValidationError({'error': str(e)})

    
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
    
    
  
        
        
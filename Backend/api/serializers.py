from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id","title","about","price","customer"]
        extra_kwargs = {"customer":{"read_only" : True}}
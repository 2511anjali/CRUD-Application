from django.shortcuts import (render,get_object_or_404,HttpResponseRedirect)
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,BookSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Book



# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class BookListCreate(generics.ListCreateAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Book.objects.filter(customer = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(customer =self.request.user)
        else:
            print(serializer.error)
    
   

class BookDelete(generics.DestroyAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Book.objects.filter(customer = user)
    


       
    
   
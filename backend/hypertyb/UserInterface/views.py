from django.shortcuts import render,redirect
from .models import User
from .serializers import userRegistration
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
class RegisterView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        data = request.data
        serializer = userRegistration(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)   

from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import userLogin

from rest_framework_simplejwt.tokens import RefreshToken
class loginView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        serializer =userLogin(data=request.data)
        print("username=\n"),
        if not serializer.is_valid():
            return Response(serializer.errors,status=400)
        user=serializer.validated_data["user"]

        #now i should generated the jwt code
        refresh=RefreshToken.for_user(user)
        acces_token=str(refresh.acces_token)
        refresh_token = str(refresh)
        response=JsonResponse({
            'acces_token':acces_token,
            'refresh_token':refresh_token,
            'message':'login succeful',
        },status=status.HTTP_200_OK)
        set_secure_cookie(response,{'access': str(refresh.access_token), 'refresh': refresh})
        return response
        
      












#setting the token at cokies      
def set_secure_cookie(response, param):
    response.set_cookie(
        'access_token',
        str(param['access']),
        secure=True,
        samesite='None'
    )
    response.set_cookie(
        'refresh_token',
        str(param['refresh']),
        httponly=True,
        secure=True,
        samesite='None'
    )
    return response

# Create your views here.
#first we have a get api from the front that send data ofthe user he has 
#string:username
#string:lastname
#string:firstname
#string:password


from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
import jwt

class LoginView(APIView):
    # Handle user login and return JWT tokens
    def post(self, request):
        username = request.data.get('user')
        password = request.data.get('pass')
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        access = jwt.encode({'id': user.id}, 'secret', algorithm='HS256')
        refresh = jwt.encode({'id': user.id, 'refresh': True}, 'secret', algorithm='HS256')
        resp = Response({'token': access})
        resp.set_cookie('refresh', refresh, httponly=False)
        return resp






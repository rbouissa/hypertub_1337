# from django.shortcuts import render,redirect
# from .models import User
# from .serializers import userRegistration
# from rest_framework.views import APIView
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny

# class RegisterView(APIView):
#     permission_classes=[AllowAny]
#     def post(self, request):
#         data = request.data
#         serializer = userRegistration(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
#         return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)   

# from rest_framework.response import Response
# from django.http import JsonResponse
# from .serializers import userLogin

# from rest_framework_simplejwt.tokens import RefreshToken
# class loginView(APIView):
#     permission_classes=[AllowAny]
#     def post(self, request):
#         serializer =userLogin(data=request.data)
#         print("username=\n"),
#         if not serializer.is_valid():
#             return Response(serializer.errors,status=400)
#         user=serializer.validated_data["user"]

#         #now i should generated the jwt code
#         refresh=RefreshToken.for_user(user)
#         acces_token=str(refresh.acces_token)
#         refresh_token = str(refresh)
#         response=JsonResponse({
#             'acces_token':acces_token,
#             'refresh_token':refresh_token,
#             'message':'login succeful',
#         },status=status.HTTP_200_OK)
#         set_secure_cookie(response,{'access': str(refresh.access_token), 'refresh': refresh})
#         return response
        
      












# #setting the token at cokies      
# def set_secure_cookie(response, param):
#     response.set_cookie(
#         'access_token',
#         str(param['access']),
#         secure=True,
#         samesite='None'
#     )
#     response.set_cookie(
#         'refresh_token',
#         str(param['refresh']),
#         httponly=True,
#         secure=True,
#         samesite='None'
#     )
#     return response

# # Create your views here.
# #first we have a get api from the front that send data ofthe user he has 
# #string:username
# #string:lastname
# #string:firstname
# #string:password


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.contrib.auth import authenticate
# from rest_framework import status
# import jwt

# class LoginView(APIView):
#     # Handle user login and return JWT tokens
#     def post(self, request):
#         username = request.data.get('user')
#         password = request.data.get('pass')
#         user = authenticate(username=username, password=password)
#         if not user:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
#         access = jwt.encode({'id': user.id}, 'secret', algorithm='HS256')
#         refresh = jwt.encode({'id': user.id, 'refresh': True}, 'secret', algorithm='HS256')
#         resp = Response({'token': access})
#         resp.set_cookie('refresh', refresh, httponly=False)
#         return resp





from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import jwt
import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import time
from django.http import JsonResponse
from rest_framework.views import APIView
import uuid
from django.http import HttpResponseRedirect
import requests
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework.views import APIView
import requests
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Intra42User
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Intra42User  # Import your custom user model
from .serializers import LoginSerializer
from django.contrib.auth.hashers import make_password  # For password hashing\
from .models import Intra42User  # Import your custom user model
from rest_framework.permissions import AllowAny
from .serializers import *  # Import the serializer
from rest_framework import status



class SampleAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = {'message': 'Hello from Django backend'}
        return Response(data, status=status.HTTP_200_OK)
    def post(self,request):
        data = {'message': 'Hello from Django backend'}
        return Response(data, status=status.HTTP_200_OK)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import Intra42UserSerializer

class Signup(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this endpoint

    def post(self, request):
        # Get the data from the frontend request
        data = request.data

        # Initialize the serializer with the incoming data
        serializer = Intra42UserSerializer(data=data)

        # Check if the data is valid
        if serializer.is_valid():
            # Save the new user and return success message
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

        # If data is invalid, return the error details
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




class Login(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this endpoint

    print ("Login APIView reached")  # Debug

    def post(self, request):
        # Deserialize the incoming data using the LoginSerializer
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():  # Check if data is valid
            login = serializer.validated_data['login']
            password = serializer.validated_data['password']

            print ("1-login: ", login, "password:", password)  # Debug

            # Authenticate the user
            user = authenticate(request, login=login, password=password)

            print ("user: ", user) # Debug
            if user is not None:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                response = JsonResponse({
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'message': 'Login successful',
                }, status=status.HTTP_200_OK)
                set_secure_cookie(response, {'access': str(refresh.access_token), 'refresh': refresh})
                print ("logging in: ",response)  # Debug
                return response
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      

class loginwith42(APIView):
    permission_classes = [AllowAny]
    """
    Generates the Intra42 OAuth URL and sends it to the frontend.
    """
    def get(self, request):
        # Step 1: Retrieve Client ID from settings
        client_id = settings.OAUTH_42_CLIENT_ID

        # Step 2: Define the Redirect URI
        redirect_uri = "http://localhost:8080/dashboard"

        # Step 3: Generate a random state string
        state = str(uuid.uuid4())  # Unique identifier for CSRF protection
        request.session['oauth_state'] = state  # Save state in the session for later validation

        # Step 4: Construct the Intra42 Authorization URL
        auth_url = (
            f"https://api.intra.42.fr/oauth/authorize?"
            f"client_id={client_id}"
            f"&redirect_uri={redirect_uri}"
            f"&response_type=code"
            f"&scope=public"
            f"&state={state}"
        )
        print("\n\n\n", auth_url, '\n\n\n')
        # Step 5: Return the URL as a JSON response
        return JsonResponse({"url": auth_url})
    



def fetch_intra42_user_info(access_token):
    url = "https://api.intra.42.fr/v2/me"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()  # User profile data
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None




class Intra42Callback(APIView):
    permission_classes = [AllowAny] 
    print('vvvvvvvvvvvvvvvvvvvvvv\n\n\n\n\n')
    def get(self, request):
        print("Debug: Callback handler reached.")
        code = request.GET.get('code')
        try:
            # Exchange the code for tokens
            token_url = "https://api.intra.42.fr/oauth/token"
            token_data = {
                "grant_type": "authorization_code",
                "client_id": settings.OAUTH_42_CLIENT_ID,
                "client_secret": settings.OAUTH_42_CLIENT_SECRET,
                "code": code,
                "redirect_uri": settings.OAUTH_42_REDIRECT_URI,
            }
            token_response = requests.post(token_url, data=token_data)
            token_response.raise_for_status()
            tokens = token_response.json()

            # Fetch user info using access token
            access_token = tokens['access_token']
            user_info_url = "https://api.intra.42.fr/v2/me"
            user_info_headers = {
                "Authorization": f"Bearer {access_token}",
            } 
            user_info_response = requests.get(user_info_url, headers=user_info_headers)
            user_info_response.raise_for_status()
            user_data = user_info_response.json()


            user = Intra42User.objects.filter(intra_id=user_data['id']).first()
            if user:
                refresh = RefreshToken.for_user(user)
            else:
                user = Intra42User(intra_id=user_data['id'], login=user_data['login'],first_name=user_data['first_name'],last_name=user_data['last_name'],email=user_data['email'],image=user_data['image'])#picture=picture
                user.save()
                refresh = RefreshToken.for_user(user)
            print("User saved:", refresh.access_token)
            print("User saved:", str(refresh))
            responsee = JsonResponse({
            'message': 'Data received successfully',
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'url' : "http://localhost:8080/dashboard"
            })

            set_secure_cookie(responsee, {'access': str(refresh.access_token), 'refresh': refresh})
            print('\n\n\n', responsee, '\n\n\n')
            return responsee
        except requests.RequestException as err:
            return JsonResponse({"error": str(err)}, status=500)

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

def print_access_token_lifetime():
    access_token_lifetime = settings.SIMPLE_JWT.get("ACCESS_TOKEN_LIFETIME")
    if access_token_lifetime:
        print(f"Access Token Lifetime: {access_token_lifetime.total_seconds()} seconds")
    else:
        print("Access Token Lifetime is not set.")


class data_user(APIView):
    print ("data_user APIView reached")  # Debug
    permission_classes = [IsAuthenticated]
    print("i'm here\n\n\n\m")
    def get(self, request):
        user = request.user  # This will be the authenticated Intra42User
        print("2-user: ", user)
        user_data = {
            "login": user.login,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "image": user.image,
        }
        return Response(user_data)
    
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from .serializers import LogoutSerializer

class LogoutView(generics.GenericAPIView):
    """
    A view to handle user logout with JWT.
    """
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests to log out a user by blacklisting the refresh token.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate the incoming data
        serializer.save()  # Blacklist the refresh token
        return Response({"message": "Successfully logged out"}, status=status.HTTP_204_NO_CONTENT)
    




#email authentication 
class LoginWithGoogle(APIView):
    def get(self, request):
        google_auth_url = (
            "https://accounts.google.com/o/oauth2/v2/auth"
            f"?client_id={settings.OAUTH_email_CLIENT_ID}"
            f"&redirect_uri={settings.OAUTH_email_REDIRECT_URI}"
            "&response_type=code"
            "&scope=openid email profile"
        )
        # return redirect(google_auth_url)
        return JsonResponse({"url": google_auth_url})


# views.py
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Intra42User


class GoogleCallback(APIView):
    """
    Handle Google OAuth callback
    """
    def get(self, request):
        code = request.GET.get("code")

        if not code:
            return Response(
                {"error": "Authorization code not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 1️⃣ Exchange authorization code for access token
        token_response = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": settings.OAUTH_email_CLIENT_ID,
                "client_secret": settings.OAUTH_email_CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": settings.OAUTH_email_REDIRECT_URI,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        token_data = token_response.json()
        access_token = token_data.get("access_token")

        if not access_token:
            return Response(
                {"error": "Failed to obtain access token"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2️⃣ Fetch user info from Google
        user_info_response = requests.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={
                "Authorization": f"Bearer {access_token}"
            },
        )

        user_info = user_info_response.json()

        email = user_info.get("email")
        google_id = user_info.get("id")

        if not email:
            return Response(
                {"error": "Email not provided by Google"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3️⃣ Create or get user (email-based)
        user, created = Intra42User.objects.get_or_create(
            email=email,
            defaults={
                "login": email.split("@")[0],
                "first_name": user_info.get("given_name", ""),
                "last_name": user_info.get("family_name", ""),
                "image": user_info.get("picture", ""),
                "intra_id": f"google_{google_id}",
            }
        )

        # 4️⃣ Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # 5️⃣ Return tokens + user info
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "email": user.email,
                    "login": user.login,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "image": user.image,
                }
            },
            status=status.HTTP_200_OK
        )













# from django.contrib.auth import get_user_model

class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer

    def put(self, request, id):
        password = request.data['password']
        new_password = request.data['new_password']

        obj = Intra42User.objects.get(pk=id)
        if not obj.check_password(raw_password=password):
            return Response({'error': 'password not match'}, status=400)
        else:
            obj.set_password(new_password)
            obj.save()
            return Response({'success': 'password changed successfully'}, status=200)
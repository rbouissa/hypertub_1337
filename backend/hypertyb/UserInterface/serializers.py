# from rest_framework import serializers
# from .models import User



# class userRegistration(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     class Meta:
#         model = User
#         fields=['username','first_name','last_name','email','password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
#     def create(self, validated_data):
#         user=User(
#             username=validated_data['username'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#             email=validated_data['email'],
            
#         )
#         user.set_password(validated_data["password"])
#         user.save()
#         return user
    

# class userLogin(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField(write_only=True)
#     def validate(self,data):
#         username=data.get("username")
#         password=data.get("password")
#         try:
#             # print("username=\n",username),
#             # print("password=",password),
            
#             user = User.objects.get(username=username)
#         except User.DoesNotExist:
#             # print("username=\n",username),
#             # print("password=",password),
#             raise serializers.ValidationError("Invalid credential")
#         if not user.check_password(password):
#             raise serializers.ValidationError("invalid credential")
#         data["user"] = user
#         return data





from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Intra42User

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Intra42User

class Intra42UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is write-only
    username = serializers.CharField(source='login')

    class Meta:
        model = Intra42User
        fields = ['username', 'email', 'password']  # You can add more fields like image if needed

    def validate_email(self, value):
        """
        Ensure the email is unique.
        """
        if Intra42User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value

    def validate_login(self, value):
        """
        Ensure the login is unique.
        """
        if Intra42User.objects.filter(login=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value

    def create(self, validated_data):
        """
        Create a new user with the validated data.
        """
        password = validated_data.pop('password')  # Remove password from validated data
        user = Intra42User(**validated_data)  # Create the user instance
        user.password = make_password(password)  # Hash the password before saving
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(source='login')  # Username field
    password = serializers.CharField(write_only=True)  # Password field, write-only

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()  # Field to receive the refresh token

    def validate(self, attrs):
        """
        Validate the received refresh token and store it for later use.
        """
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        """
        Blacklist the refresh token to invalidate it.
        """
        try:
            # Blacklist the provided refresh token
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            # Handle the case of an invalid token
            self.fail('bad_token')
















from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
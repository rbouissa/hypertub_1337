# from django.db import models
# import hashlib

# class User(models.Model):
#     username = models.CharField(max_length=50, unique=True)
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)  # SHA-256 = 64 chars, use 128 for future-proof

#     def set_password(self, raw_password):
#         hashed = hashlib.sha256(raw_password.encode()).hexdigest()
#         self.password = hashed

#     def check_password(self, raw_password):
#         hashed = hashlib.sha256(raw_password.encode()).hexdigest()
#         return self.password == hashed

#     def __str__(self):
#         return self.username


from django.contrib.auth.models import AbstractUser
from django.db import models

class Intra42User(AbstractUser):
    intra_id = models.CharField(null=True ,max_length=101)
    login = models.CharField(max_length=100, unique=True)  # User's login name
    email = models.EmailField(unique=True)  # User's email
    image = models.URLField(max_length=10000, blank=True, null=True)  # Profile picture URL
    username = None
    password = models.CharField(max_length=128, blank=True, null=True)  # Optional password field
    first_name = models.CharField(max_length=100, blank=True, null=True, default='')  # Set a default value
    last_name = models.CharField(max_length=100, blank=True, null=True, default='')  # Set a default value
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['email']
    # def __str__(self):
    #     return self.login





# models.py
from django.db import models
from django.utils import timezone
import datetime

class PasswordResetCode(models.Model):
    user = models.ForeignKey(Intra42User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        # Code expires after 10 minutes
        return self.created_at >= timezone.now() - datetime.timedelta(minutes=10)
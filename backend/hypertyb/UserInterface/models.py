from django.db import models
import hashlib

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # SHA-256 = 64 chars, use 128 for future-proof

    def set_password(self, raw_password):
        hashed = hashlib.sha256(raw_password.encode()).hexdigest()
        self.password = hashed

    def check_password(self, raw_password):
        hashed = hashlib.sha256(raw_password.encode()).hexdigest()
        return self.password == hashed

    def __str__(self):
        return self.username

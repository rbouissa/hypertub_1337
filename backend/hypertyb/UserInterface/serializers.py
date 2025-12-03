from rest_framework import serializers
from .models import User



class userRegistration(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields=['username','first_name','last_name','email','password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        user=User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
    

class userLogin(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    def validate(self,data):
        username=data.get("username")
        password=data.get("password")
        try:
            # print("username=\n",username),
            # print("password=",password),
            
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            # print("username=\n",username),
            # print("password=",password),
            raise serializers.ValidationError("Invalid credential")
        if not user.check_password(password):
            raise serializers.ValidationError("invalid credential")
        data["user"] = user
        return data



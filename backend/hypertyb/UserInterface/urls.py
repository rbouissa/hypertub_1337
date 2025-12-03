from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns = [
    path('register/', RegisterView.as_view()),          # POST
    path('login/', LoginView.as_view()),      # POST username + password -> JWT
    # path('token/',TokenObtainPairView.as_view(),name='TokenObtainPairView'),
    # path('/token/refresh',TokenRefreshView.as_view(),name='TokenRefreshView'),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]

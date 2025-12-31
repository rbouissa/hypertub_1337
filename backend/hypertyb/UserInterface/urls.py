# from django.urls import path
# from .views import *
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
# urlpatterns = [
#     path('register/', RegisterView.as_view()),          # POST
#     path('login/', LoginView.as_view()),      # POST username + password -> JWT
#     # path('token/',TokenObtainPairView.as_view(),name='TokenObtainPairView'),
#     # path('/token/refresh',TokenRefreshView.as_view(),name='TokenRefreshView'),
#     path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
#     path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
# ]


from django.urls import path
from .views import SampleAPI
from .views import Signup
from .views import Login
from .views import loginwith42
from .views import Intra42Callback
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('sample/', SampleAPI.as_view(), name='sample_api'),
    path('signup/', Signup.as_view(), name='signup'),
    path('login/',Login.as_view(),name='login'),
    path('login_with_42/',loginwith42.as_view(),name='login_with_42'),
    path('intra42callback/',Intra42Callback.as_view(),name='Intra42Callback'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token_refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('login_with_google/', LoginWithGoogle.as_view(), name='login_with_google'),
    path('google_callback/', GoogleCallback.as_view(), name='google_callback'),

    # path('delete-cookies/', DeleteCookiesView.as_view(), name='delete_cookies'),
    #this is for user crud 
    path('user_data/', data_user.as_view(),name='data_user'),
    # path('user/profile/', UserProfileView.as_view()),
    # path('user/language/', UpdateLanguageView.as_view()),
    path('user/change_password/<int:id>/', ChangePasswordView.as_view()),

    #reset password by email code 
    path('password-reset/request/', RequestPasswordResetView.as_view(), name='password_reset_request'),
    # path('password-reset/confirm/', ConfirmPasswordResetView.as_view(), name='password_reset_confirm'),

]

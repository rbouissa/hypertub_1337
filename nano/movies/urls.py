from django.urls import path
from .views import (
    MovieListView, 
    MovieDetailView,
    CommentListView,
    CommentDetailView,
    CommentCreateView
)

urlpatterns = [
    # Movie endpoints
    path('movies/', MovieListView.as_view(), name='movie-list'),
    path('movies/<int:id>/', MovieDetailView.as_view(), name='movie-detail'),
    
    # Comment endpoints
    path('comments/', CommentListView.as_view(), name='comment-list'),
    path('comments/<int:id>/', CommentDetailView.as_view(), name='comment-detail'),
    path('movies/<int:movie_id>/comments/', CommentCreateView.as_view(), name='comment-create'),
]

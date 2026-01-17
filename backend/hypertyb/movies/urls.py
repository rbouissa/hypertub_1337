from django.urls import path
from .views import (
    MovieListView, 
    MovieDetailView,
    CommentListView,
    CommentDetailView,
    CommentCreateView,
    VideoStreamView,
    SubtitleAutoFetchView,
    SubtitleCreateView
)

urlpatterns = [
    # Movie endpoints
    path('movies/', MovieListView.as_view(), name='movie-list'),
    path('movies/<int:id>/', MovieDetailView.as_view(), name='movie-detail'),
    path('movies/<int:id>/stream/', VideoStreamView.as_view(), name='video-stream'),
    
    # Comment endpoints
    path('comments/', CommentListView.as_view(), name='comment-list'),
    path('comments/<int:id>/', CommentDetailView.as_view(), name='comment-detail'),
    path('movies/<int:movie_id>/comments/', CommentCreateView.as_view(), name='comment-create'),


    #subtitle endpoint 
    path('movies/<int:movie_id>/subtitles/', SubtitleCreateView.as_view(), name='subtitle-create'),
    path('movies/<int:movie_id>/subtitles/auto-fetch/', SubtitleAutoFetchView.as_view(), name='subtitle-auto-fetch'),
]


#docker-compose exec backend python manage.py populate_movies --limit 10 to ru  the command that fetch the data 
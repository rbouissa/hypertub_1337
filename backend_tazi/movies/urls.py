from django.urls import path
from .views import (
    MovieListView, 
    MovieDetailView,
    MovieSearchView,
    MovieCreateView,
    MovieUpdateView,
    MovieDeleteView,
    CommentListView,
    CommentDetailView,
    CommentCreateView,
    VideoStreamView,
    SubtitleCreateView,
    SubtitleAutoFetchView
)

urlpatterns = [
    # Movie endpoints
    path('movies/', MovieListView.as_view(), name='movie-list'),
    path('movies/search/', MovieSearchView.as_view(), name='movie-search'),
    path('movies/create/', MovieCreateView.as_view(), name='movie-create'),
    path('movies/<int:id>/', MovieDetailView.as_view(), name='movie-detail'),
    path('movies/<int:id>/update/', MovieUpdateView.as_view(), name='movie-update'),
    path('movies/<int:id>/delete/', MovieDeleteView.as_view(), name='movie-delete'),
    path('movies/<int:id>/stream/', VideoStreamView.as_view(), name='video-stream'),
    
    # Comment endpoints
    path('comments/', CommentListView.as_view(), name='comment-list'),
    path('comments/<int:id>/', CommentDetailView.as_view(), name='comment-detail'),
    path('movies/<int:movie_id>/comments/', CommentCreateView.as_view(), name='comment-create'),
    
    # Subtitle endpoints
    path('movies/<int:movie_id>/subtitles/', SubtitleCreateView.as_view(), name='subtitle-create'),
    path('movies/<int:movie_id>/subtitles/auto-fetch/', SubtitleAutoFetchView.as_view(), name='subtitle-auto-fetch'),
]

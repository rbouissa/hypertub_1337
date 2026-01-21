from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .models import Movie, Subtitle, Comment
from .video_service import VideoStreamingService
from .services import ArchiveOrgService
import json


class MovieListView(View):
    """
    API endpoint to list all movies.
    
    GET /movies/
    Returns: [{"id": 1, "name": "Movie Title"}, ...]
    """
    
    def get(self, request):
        """
        Get list of all movies with id and name only.
        """
        movies = Movie.objects.all().values('id', 'name')
        return JsonResponse(list(movies), safe=False)


class MovieSearchView(View):
    """
    API endpoint to search movies by name.
    
    GET /movies/search/?q=query
    Returns: [{"id": 1, "name": "Movie Title", "archive_identifier": "...", "imdb_rating": 8.0}, ...]
    """
    
    def get(self, request):
        """
        Search movies by name (case-insensitive).
        Query parameter: q (search query)
        """
        query = request.GET.get('q', '').strip()
        
        if not query:
            return JsonResponse({
                'error': 'Missing search query parameter "q"'
            }, status=400)
        
        # Search movies by name (case-insensitive)
        movies = Movie.objects.filter(
            name__icontains=query
        ).values(
            'id', 
            'name', 
            'archive_identifier',
            'imdb_id',
            'imdb_rating',
            'production_year',
            'length'
        )
        
        return JsonResponse({
            'query': query,
            'count': len(movies),
            'results': list(movies)
        }, safe=False)


class MovieDetailView(View):
    """
    API endpoint to get detailed information about a specific movie.
    
    GET /movies/<id>/
    Returns: {
        "id": 1,
        "name": "Movie Title",
        "imdb_rating": 7.5,
        "production_year": 2020,
        "length": 120,
        "available_subtitles": ["en", "fr", "es"],
        "number_of_comments": 5
    }
    """
    
    def get(self, request, id):
        """
        Get detailed information about a specific movie.
        
        Args:
            id: Movie ID
        """
        # Get movie or return 404
        movie = get_object_or_404(Movie, id=id)
        
        # Get available subtitle languages
        available_subtitles = list(
            movie.subtitles.values_list('language', flat=True)
        )
        
        # Get number of comments
        number_of_comments = movie.comments.count()
        
        # Build response
        response_data = {
            'id': movie.id,
            'name': movie.name,
            'archive_identifier': movie.archive_identifier,
            'imdb_id': movie.imdb_id,
            'imdb_rating': float(movie.imdb_rating) if movie.imdb_rating else None,
            'img_url': movie.imdb_poster_url,
            'genre': movie.genre,
            'production_year': movie.production_year,
            'length': movie.length,
            'video_url': movie.video_url,
            'available_subtitles': available_subtitles if available_subtitles else None,
            'number_of_comments': number_of_comments
        }
        
        return JsonResponse(response_data)


@method_decorator(csrf_exempt, name='dispatch')
class MovieCreateView(View):
    """
    API endpoint to create a new movie.
    
    POST /movies/create/
    Body: {
        "name": "Movie Title",
        "archive_identifier": "unique_id",
        "imdb_id": "tt1234567",
        "imdb_rating": 7.5,
        "img_url": "https://...",
        "genre": "Action, Drama",
        "production_year": 2020,
        "length": 120,
        "video_url": "https://..."
    }
    """
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            
            # Validate required fields
            if not data.get('name'):
                return JsonResponse({'error': 'Movie name is required'}, status=400)
            
            if not data.get('archive_identifier'):
                return JsonResponse({'error': 'Archive identifier is required'}, status=400)
            
            # Check if movie with same archive_identifier already exists
            if Movie.objects.filter(archive_identifier=data['archive_identifier']).exists():
                return JsonResponse({'error': 'Movie with this archive identifier already exists'}, status=400)
            
            # Create movie
            movie = Movie.objects.create(
                name=data['name'],
                archive_identifier=data['archive_identifier'],
                imdb_id=data.get('imdb_id'),
                imdb_rating=data.get('imdb_rating'),
                imdb_poster_url=data.get('img_url'),
                genre=data.get('genre'),
                production_year=data.get('production_year'),
                length=data.get('length'),
                video_url=data.get('video_url')
            )
            
            return JsonResponse({
                'id': movie.id,
                'name': movie.name,
                'archive_identifier': movie.archive_identifier,
                'message': 'Movie created successfully'
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class MovieUpdateView(View):
    """
    API endpoint to update an existing movie.
    
    PUT/PATCH /movies/<id>/update/
    Body: {
        "name": "Updated Title",
        "imdb_rating": 8.0,
        ...
    }
    """
    
    def put(self, request, id):
        return self._update(request, id)
    
    def patch(self, request, id):
        return self._update(request, id)
    
    def _update(self, request, id):
        try:
            movie = get_object_or_404(Movie, id=id)
            data = json.loads(request.body)
            
            # Update fields if provided
            if 'name' in data:
                movie.name = data['name']
            if 'archive_identifier' in data:
                # Check if new identifier already exists for another movie
                if Movie.objects.filter(archive_identifier=data['archive_identifier']).exclude(id=id).exists():
                    return JsonResponse({'error': 'Archive identifier already exists'}, status=400)
                movie.archive_identifier = data['archive_identifier']
            if 'imdb_id' in data:
                movie.imdb_id = data['imdb_id']
            if 'imdb_rating' in data:
                movie.imdb_rating = data['imdb_rating']
            if 'img_url' in data:
                movie.imdb_poster_url = data['img_url']
            if 'genre' in data:
                movie.genre = data['genre']
            if 'production_year' in data:
                movie.production_year = data['production_year']
            if 'length' in data:
                movie.length = data['length']
            if 'video_url' in data:
                movie.video_url = data['video_url']
            
            movie.save()
            
            return JsonResponse({
                'id': movie.id,
                'name': movie.name,
                'message': 'Movie updated successfully'
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class MovieDeleteView(View):
    """
    API endpoint to delete a movie.
    
    DELETE /movies/<id>/delete/
    """
    
    def delete(self, request, id):
        try:
            movie = get_object_or_404(Movie, id=id)
            movie_name = movie.name
            movie.delete()
            
            return JsonResponse({
                'message': f'Movie "{movie_name}" deleted successfully'
            })
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class CommentListView(View):
    """
    API endpoint to list all comments.
    
    GET /comments/
    Returns: [
        {
            "id": 1,
            "author_username": "user1",
            "date": "2026-01-14T12:00:00Z",
            "content": "Great movie!",
            "movie_id": 5
        }, ...
    ]
    """
    
    def get(self, request):
        """Get list of latest comments"""
        comments = Comment.objects.select_related('user', 'movie').all()[:50]
        
        comments_data = [
            {
                'id': comment.id,
                'author_username': comment.user.username,
                'date': comment.created_at.isoformat(),
                'content': comment.content,
                'movie_id': comment.movie.id,
                'movie_name': comment.movie.name
            }
            for comment in comments
        ]
        
        return JsonResponse(comments_data, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class CommentDetailView(View):
    """
    API endpoint for comment details and modifications.
    
    GET /comments/<id>/
    Returns: {
        "id": 1,
        "author_username": "user1",
        "comment_id": 1,
        "date": "2026-01-14T12:00:00Z",
        "content": "Great movie!",
        "movie_id": 5
    }
    
    PATCH /comments/<id>/
    Expected: {"comment": "Updated text", "username": "user1"}
    
    DELETE /comments/<id>/
    """
    
    def get(self, request, id):
        """Get specific comment details"""
        comment = get_object_or_404(Comment.objects.select_related('user', 'movie'), id=id)
        
        response_data = {
            'id': comment.id,
            'comment_id': comment.id,
            'author_username': comment.user.username,
            'date': comment.created_at.isoformat(),
            'content': comment.content,
            'movie_id': comment.movie.id,
            'movie_name': comment.movie.name
        }
        
        return JsonResponse(response_data)
    
    def patch(self, request, id):
        """Update a comment"""
        try:
            data = json.loads(request.body)
            comment = get_object_or_404(Comment, id=id)
            
            # Verify username matches
            username = data.get('username')
            if username and comment.user.username != username:
                return JsonResponse(
                    {'error': 'Unauthorized to edit this comment'},
                    status=403
                )
            
            # Update content if provided
            if 'comment' in data:
                comment.content = data['comment']
                comment.save()
            
            return JsonResponse({
                'id': comment.id,
                'content': comment.content,
                'author_username': comment.user.username,
                'date': comment.created_at.isoformat(),
                'message': 'Comment updated successfully'
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    def delete(self, request, id):
        """Delete a comment"""
        comment = get_object_or_404(Comment, id=id)
        comment.delete()
        
        return JsonResponse({
            'message': 'Comment deleted successfully',
            'id': id
        })


@method_decorator(csrf_exempt, name='dispatch')
class CommentCreateView(View):
    """
    API endpoint to create comments.
    
    POST /movies/<movie_id>/comments/
    Expected: {"comment": "Great movie!", "username": "user1"}
    """
    
    def post(self, request, movie_id):
        """Create a new comment for a movie"""
        try:
            data = json.loads(request.body)
            
            # Get or create user (for demo purposes)
            username = data.get('username', 'anonymous')
            user, created = User.objects.get_or_create(username=username)
            
            # Get movie
            movie = get_object_or_404(Movie, id=movie_id)
            
            # Create comment
            comment = Comment.objects.create(
                movie=movie,
                user=user,
                content=data.get('comment', '')
            )
            
            return JsonResponse({
                'id': comment.id,
                'author_username': comment.user.username,
                'date': comment.created_at.isoformat(),
                'content': comment.content,
                'movie_id': comment.movie.id,
                'message': 'Comment created successfully'
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing required field: {str(e)}'}, status=400)


class VideoStreamView(View):
    def get(self, request, id):
        """Stream video with format conversion if needed"""
        video_path, movie = VideoStreamingService.get_video_path(id)
        
        if not video_path:
            if not movie.video_url:
                return JsonResponse({
                    'error': 'Video not available',
                    'message': f'No video URL for "{movie.name}"'
                }, status=404)
            
            return VideoStreamingService.stream_from_url(movie.video_url, request.META.get('HTTP_RANGE'))
        
        if VideoStreamingService.needs_conversion(video_path):
            converted_path = video_path.parent / 'video.mp4'
            
            if not converted_path.exists():
                success = VideoStreamingService.convert_video(video_path, converted_path)
                if not success:
                    return JsonResponse({'error': 'Video conversion failed'}, status=500)
            
            video_path = converted_path
        
        range_header = request.META.get('HTTP_RANGE')
        return VideoStreamingService.stream_video(video_path, range_header)


@method_decorator(csrf_exempt, name='dispatch')
class SubtitleCreateView(View):
    """
    API endpoint to add subtitle to a movie.
    
    POST /movies/<movie_id>/subtitles/
    Body: {"language": "English"}
    Returns: {
        "id": 1,
        "movie_id": 5,
        "movie_name": "His Girl Friday",
        "language": "English",
        "created_at": "2026-01-15T10:30:00Z"
    }
    """
    
    def post(self, request, movie_id):
        try:
            data = json.loads(request.body)
            language = data['language']
            
            movie = get_object_or_404(Movie, id=movie_id)
            
            subtitle = Subtitle.objects.create(
                movie=movie,
                language=language
            )
            
            return JsonResponse({
                'id': subtitle.id,
                'movie_id': movie.id,
                'movie_name': movie.name,
                'language': subtitle.language,
                'created_at': subtitle.created_at.isoformat()
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except KeyError:
            return JsonResponse({'error': 'Missing required field: language'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class SubtitleAutoFetchView(View):
    """
    API endpoint to automatically fetch subtitles from Archive.org.
    
    POST /movies/<movie_id>/subtitles/auto-fetch/
    Returns: {
        "movie_id": 7,
        "movie_name": "His Girl Friday",
        "subtitles_found": 2,
        "subtitles": [
            {"language": "English", "url": "...", "format": "srt"},
            {"language": "العربية", "url": "...", "format": "vtt"}
        ]
    }
    """
    
    def post(self, request, movie_id):
        try:
            movie = get_object_or_404(Movie, id=movie_id)
            
            if not movie.archive_identifier:
                return JsonResponse({
                    'error': 'No Archive.org identifier for this movie'
                }, status=400)
            
            subtitles_data = ArchiveOrgService.get_subtitles(movie.archive_identifier)
            
            if not subtitles_data:
                return JsonResponse({
                    'message': 'No subtitles found on Archive.org',
                    'movie_id': movie.id,
                    'movie_name': movie.name
                }, status=200)
            
            created_subtitles = []
            for sub_data in subtitles_data:
                subtitle, created = Subtitle.objects.get_or_create(
                    movie=movie,
                    language=sub_data['language']
                )
                created_subtitles.append({
                    'id': subtitle.id,
                    'language': subtitle.language,
                    'url': sub_data['url'],
                    'format': sub_data['format'],
                    'status': 'created' if created else 'already_exists'
                })
            
            return JsonResponse({
                'movie_id': movie.id,
                'movie_name': movie.name,
                'archive_identifier': movie.archive_identifier,
                'subtitles_found': len(subtitles_data),
                'subtitles': created_subtitles
            }, status=201)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

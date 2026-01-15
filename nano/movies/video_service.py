import os
import subprocess
import mimetypes
import requests
from django.http import StreamingHttpResponse, FileResponse, Http404
from django.shortcuts import get_object_or_404
from pathlib import Path
from .models import Movie


class VideoStreamingService:
    """Service for video streaming with format conversion"""
    
    MEDIA_ROOT = Path('media/videos')
    SUPPORTED_FORMATS = ['.mp4', '.webm', '.mkv', '.avi', '.mov']
    BROWSER_FORMATS = ['.mp4', '.webm']
    
    @staticmethod
    def get_video_path(movie_id):
        """Get local video file path for a movie"""
        movie = get_object_or_404(Movie, id=movie_id)
        video_dir = VideoStreamingService.MEDIA_ROOT / str(movie_id)
        
        if not video_dir.exists():
            return None, movie
        
        for ext in VideoStreamingService.SUPPORTED_FORMATS:
            video_file = video_dir / f"video{ext}"
            if video_file.exists():
                return video_file, movie
        
        return None, movie
    
    @staticmethod
    def stream_from_url(video_url, range_header=None):
        """Stream video directly from remote URL without downloading"""
        try:
            headers = {}
            if range_header:
                headers['Range'] = range_header
            
            response = requests.get(video_url, headers=headers, stream=True, timeout=10)
            
            def video_iterator():
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        yield chunk
            
            django_response = StreamingHttpResponse(
                video_iterator(),
                status=206 if range_header else 200,
                content_type=response.headers.get('Content-Type', 'video/mp4')
            )
            
            if 'Content-Length' in response.headers:
                django_response['Content-Length'] = response.headers['Content-Length']
            if 'Content-Range' in response.headers:
                django_response['Content-Range'] = response.headers['Content-Range']
            
            django_response['Accept-Ranges'] = 'bytes'
            
            return django_response
            
        except Exception as e:
            print(f"Streaming error: {e}")
            from django.http import JsonResponse
            return JsonResponse({'error': 'Video streaming failed'}, status=500)
    
    @staticmethod
    def needs_conversion(file_path):
        """Check if video needs conversion for browser"""
        if not file_path:
            return False
        suffix = file_path.suffix.lower()
        return suffix not in VideoStreamingService.BROWSER_FORMATS
    
    @staticmethod
    def convert_video(input_path, output_path):
        """Convert video to MP4 using ffmpeg"""
        try:
            cmd = [
                'ffmpeg',
                '-i', str(input_path),
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-movflags', '+faststart',
                '-y',
                str(output_path)
            ]
            subprocess.run(cmd, check=True, capture_output=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"Conversion error: {e}")
            return False
    
    @staticmethod
    def stream_video(video_path, range_header=None):
        """Stream video file with range support"""
        file_size = video_path.stat().st_size
        content_type = mimetypes.guess_type(str(video_path))[0] or 'video/mp4'
        
        if range_header:
            ranges = range_header.replace('bytes=', '').split('-')
            start = int(ranges[0]) if ranges[0] else 0
            end = int(ranges[1]) if len(ranges) > 1 and ranges[1] else file_size - 1
            
            length = end - start + 1
            
            def file_iterator():
                with open(video_path, 'rb') as f:
                    f.seek(start)
                    remaining = length
                    while remaining > 0:
                        chunk_size = min(8192, remaining)
                        data = f.read(chunk_size)
                        if not data:
                            break
                        remaining -= len(data)
                        yield data
            
            response = StreamingHttpResponse(file_iterator(), status=206, content_type=content_type)
            response['Content-Length'] = str(length)
            response['Content-Range'] = f'bytes {start}-{end}/{file_size}'
            response['Accept-Ranges'] = 'bytes'
        else:
            response = FileResponse(open(video_path, 'rb'), content_type=content_type)
            response['Content-Length'] = str(file_size)
            response['Accept-Ranges'] = 'bytes'
        
        return response

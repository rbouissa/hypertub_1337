import requests
from typing import List, Dict, Optional
from django.conf import settings


class ArchiveOrgService:
    BASE_URL = "https://archive.org"
    SEARCH_URL = f"{BASE_URL}/advancedsearch.php"
    DETAILS_URL = f"{BASE_URL}/metadata"

    @staticmethod
    def search(query: str, rows: int = 50) -> List[Dict]:
        params = {
            'q': query,
            'fl[]': ['identifier', 'title', 'year', 'runtime'],
            'rows': rows,
            'output': 'json',
            'mediatype': 'movies'
        }
        try:
            response = requests.get(ArchiveOrgService.SEARCH_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('response', {}).get('docs', [])
        except requests.RequestException as e:
            print(f"Error: {e}")
            return []

    @staticmethod
    def get_popular(limit: int = 50) -> List[Dict]:
        query = 'mediatype:movies AND collection:feature_films'
        params = {
            'q': query,
            'fl[]': ['identifier', 'title', 'year', 'runtime', 'downloads'],
            'rows': limit,
            'output': 'json',
            'sort[]': 'downloads desc'
        }
        
        try:
            response = requests.get(ArchiveOrgService.SEARCH_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('response', {}).get('docs', [])
        except requests.RequestException as e:
            print(f"Error fetching popular movies from Archive.org: {e}")
            return []

    @staticmethod
    def get_video_url(identifier: str) -> Optional[str]:
        """
        Get the video URL for a specific Archive.org item.
        
        Args:
            identifier: Archive.org identifier
            
        Returns:
            Video URL or None if not found
        """
        try:
            # Get metadata for the item
            metadata_url = f"{ArchiveOrgService.DETAILS_URL}/{identifier}"
            response = requests.get(metadata_url, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            # Look for video files
            files = data.get('files', [])
            for file in files:
                name = file.get('name', '')
                format_type = file.get('format', '')
                
                # Prefer MP4 or MPEG4 formats
                if format_type.lower() in ['mpeg4', 'h.264'] or name.endswith('.mp4'):
                    return f"{ArchiveOrgService.BASE_URL}/download/{identifier}/{name}"
            
            # Fallback: return generic details page
            return f"{ArchiveOrgService.BASE_URL}/details/{identifier}"
            
        except requests.RequestException as e:
            print(f"Error fetching video URL for {identifier}: {e}")
            return None

    @staticmethod
    def get_metadata(identifier: str) -> Optional[Dict]:
        """
        Get full metadata for an Archive.org item.
        
        Args:
            identifier: Archive.org identifier
            
        Returns:
            Metadata dictionary or None
        """
        try:
            metadata_url = f"{ArchiveOrgService.DETAILS_URL}/{identifier}"
            response = requests.get(metadata_url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching metadata for {identifier}: {e}")
            return None


class OMDbService:
    """
    Service for interacting with OMDb API to fetch IMDb movie data.
    """
    BASE_URL = "http://www.omdbapi.com/"

    @staticmethod
    def clean_title(title: str) -> str:
        """
        Clean movie title for better OMDb matching.
        Removes extra information like dates, parentheses, etc.
        """
        import re
        # Remove content in parentheses
        title = re.sub(r'\([^)]*\)', '', title)
        # Remove years in format YYYY or YYYY-YYYY
        title = re.sub(r'\b\d{4}(-\d{4})?\b', '', title)
        # Remove common separators and extra spaces
        title = re.sub(r'[_\-]+', ' ', title)
        # Clean up multiple spaces
        title = re.sub(r'\s+', ' ', title)
        return title.strip()

    @staticmethod
    def get_movie_by_title(title: str, year: Optional[int] = None) -> Optional[Dict]:
        """
        Get movie information from OMDb by title.
        
        Args:
            title: Movie title
            year: Optional production year for better matching
            
        Returns:
            Movie data dictionary or None if not found
        """
        api_key = settings.OMDB_API_KEY
        
        if not api_key:
            print("Warning: OMDB_API_KEY not set in settings")
            return None
        
        params = {
            'apikey': api_key,
            't': title,
            'type': 'movie'
        }
        
        if year:
            params['y'] = year
        
        try:
            response = requests.get(OMDbService.BASE_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if data.get('Response') == 'True':
                return data
            
            # Try again with cleaned title if first attempt failed
            cleaned_title = OMDbService.clean_title(title)
            if cleaned_title != title and cleaned_title:
                params['t'] = cleaned_title
                response = requests.get(OMDbService.BASE_URL, params=params, timeout=10)
                response.raise_for_status()
                data = response.json()
                
                if data.get('Response') == 'True':
                    print(f"  Found match with cleaned title: '{cleaned_title}'")
                    return data
            
            print(f"  Movie not found in OMDb: {title}")
            return None
                
        except requests.RequestException as e:
            print(f"Error fetching movie from OMDb: {e}")
            return None

    @staticmethod
    def get_movie_by_imdb_id(imdb_id: str) -> Optional[Dict]:
        """
        Get movie information from OMDb by IMDb ID.
        
        Args:
            imdb_id: IMDb ID (e.g., 'tt1234567')
            
        Returns:
            Movie data dictionary or None if not found
        """
        api_key = settings.OMDB_API_KEY
        
        if not api_key:
            print("Warning: OMDB_API_KEY not set in settings")
            return None
        
        params = {
            'apikey': api_key,
            'i': imdb_id
        }
        
        try:
            response = requests.get(OMDbService.BASE_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if data.get('Response') == 'True':
                return data
            else:
                return None
                
        except requests.RequestException as e:
            print(f"Error fetching movie from OMDb: {e}")
            return None

from django.core.management.base import BaseCommand
from movies.models import Movie
from movies.services import ArchiveOrgService, OMDbService
import time


class Command(BaseCommand):
    help = 'Populate database with movies from Archive.org and enrich with OMDb data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--limit',
            type=int,
            default=20,
            help='Number of movies to fetch (default: 20)'
        )
        parser.add_argument(
            '--skip-existing',
            action='store_true',
            help='Skip movies that already exist in database'
        )

    def handle(self, *args, **options):
        limit = options['limit']
        skip_existing = options['skip_existing']
        
        self.stdout.write(self.style.SUCCESS(f'Fetching {limit} popular movies from Archive.org...'))
        
        # Get popular movies from Archive.org
        archive_movies = ArchiveOrgService.get_popular(limit=limit)
        
        if not archive_movies:
            self.stdout.write(self.style.ERROR('No movies found from Archive.org'))
            return
        
        self.stdout.write(self.style.SUCCESS(f'Found {len(archive_movies)} movies'))
        
        created_count = 0
        skipped_count = 0
        error_count = 0
        
        for idx, archive_movie in enumerate(archive_movies, 1):
            identifier = archive_movie.get('identifier')
            title = archive_movie.get('title', 'Unknown')
            year = archive_movie.get('year')
            
            self.stdout.write(f'\n[{idx}/{len(archive_movies)}] Processing: {title}')
            
            # Check if movie already exists
            if skip_existing and Movie.objects.filter(archive_identifier=identifier).exists():
                self.stdout.write(self.style.WARNING(f'  Skipping (already exists)'))
                skipped_count += 1
                continue
            
            try:
                # Parse year if it's a string
                if year and isinstance(year, str):
                    try:
                        year = int(year.split('-')[0])  # Handle ranges like "2020-2021"
                    except (ValueError, IndexError):
                        year = None
                
                # Get video URL
                self.stdout.write('  Fetching video URL...')
                video_url = ArchiveOrgService.get_video_url(identifier)
                
                # Try to get OMDb data
                omdb_data = None
                if title and title != 'Unknown':
                    self.stdout.write('  Fetching OMDb data...')
                    omdb_data = OMDbService.get_movie_by_title(title, year)
                    # Small delay to respect API rate limits
                    time.sleep(0.5)
                
                # Extract OMDb fields
                imdb_id = None
                imdb_rating = None
                runtime_minutes = None
                
                if omdb_data:
                    imdb_id = omdb_data.get('imdbID')
                    
                    # Parse IMDb rating
                    rating_str = omdb_data.get('imdbRating', 'N/A')
                    if rating_str and rating_str != 'N/A':
                        try:
                            imdb_rating = float(rating_str)
                        except ValueError:
                            pass
                    
                    # Parse runtime (e.g., "120 min" -> 120)
                    runtime_str = omdb_data.get('Runtime', '')
                    if runtime_str and runtime_str != 'N/A':
                        try:
                            runtime_minutes = int(runtime_str.split()[0])
                        except (ValueError, IndexError):
                            pass
                    
                    # Use OMDb year if available
                    omdb_year = omdb_data.get('Year')
                    if omdb_year and omdb_year != 'N/A':
                        try:
                            year = int(omdb_year.split('-')[0])
                        except (ValueError, IndexError):
                            pass
                
                # Fallback: use Archive.org runtime if available
                if not runtime_minutes:
                    archive_runtime = archive_movie.get('runtime')
                    if archive_runtime:
                        try:
                            # Convert from seconds to minutes if necessary
                            runtime_val = float(archive_runtime)
                            if runtime_val > 500:  # Likely in seconds
                                runtime_minutes = int(runtime_val / 60)
                            else:
                                runtime_minutes = int(runtime_val)
                        except (ValueError, TypeError):
                            pass
                
                # Create or update movie
                movie, created = Movie.objects.update_or_create(
                    archive_identifier=identifier,
                    defaults={
                        'name': title,
                        'imdb_id': imdb_id,
                        'imdb_rating': imdb_rating,
                        'production_year': year,
                        'length': runtime_minutes,
                        'video_url': video_url,
                    }
                )
                
                if created:
                    self.stdout.write(self.style.SUCCESS(f'  ✓ Created: {movie.name}'))
                    created_count += 1
                else:
                    self.stdout.write(self.style.SUCCESS(f'  ✓ Updated: {movie.name}'))
                
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'  ✗ Error: {str(e)}'))
                error_count += 1
                continue
        
        # Summary
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS(f'Database population complete!'))
        self.stdout.write(f'  Created: {created_count}')
        self.stdout.write(f'  Skipped: {skipped_count}')
        self.stdout.write(f'  Errors: {error_count}')
        self.stdout.write('='*60)

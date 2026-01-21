# Django Movie Backend

Backend Django application that integrates with Archive.org and OMDb APIs to provide a movie database with metadata.

## Features

- Fetch movies from Archive.org
- Enrich movie data with IMDb ratings from OMDb
- RESTful API endpoints for movie listings and details
- Subtitle and comment support
- Admin interface for data management

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Variables

Set your OMDb API key (get one free at http://www.omdbapi.com/):

```bash
export OMDB_API_KEY='your_api_key_here'
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Admin User (Optional)

```bash
python manage.py createsuperuser
```

### 5. Populate Database

Fetch and populate movies from Archive.org:

```bash
python manage.py populate_movies --limit 20
```

Options:
- `--limit N`: Number of movies to fetch (default: 20)
- `--skip-existing`: Skip movies already in database

### 6. Run Development Server

```bash
python manage.py runserver
```

## API Endpoints

### List All Movies

```
GET /movies/
```

Response:
```json
[
  {
    "id": 1,
    "name": "Movie Title"
  },
  ...
]
```

### Movie Details

```
GET /movies/<id>/
```

Response:
```json
{
  "id": 1,
  "name": "Movie Title",
  "imdb_rating": 7.5,
  "production_year": 2020,
  "length": 120,
  "available_subtitles": ["en", "fr"],
  "number_of_comments": 5
}
```

## Admin Interface

Access at: http://localhost:8000/admin

Manage movies, subtitles, and comments through the Django admin panel.

## Project Structure

```
├── config/              # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── movies/              # Main app
│   ├── models.py        # Movie, Subtitle, Comment models
│   ├── services.py      # Archive.org & OMDb API services
│   ├── views.py         # API views
│   ├── urls.py          # URL routing
│   ├── admin.py         # Admin configuration
│   └── management/
│       └── commands/
│           └── populate_movies.py  # Database population script
├── manage.py
└── requirements.txt
```

## Models

### Movie
- name, archive_identifier, imdb_id
- imdb_rating, production_year, length
- video_url

### Subtitle
- movie (FK), language

### Comment
- movie (FK), user (FK)
- content, created_at

## Services

### ArchiveOrgService
- `search(query)` - Search for movies
- `get_popular()` - Get popular movies
- `get_video_url(identifier)` - Get video URL

### OMDbService
- `get_movie_by_title(title)` - Get IMDb data by title
- `get_movie_by_imdb_id(imdb_id)` - Get IMDb data by ID

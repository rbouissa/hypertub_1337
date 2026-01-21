from django.db import models
from django.contrib.auth.models import User


class Movie(models.Model):
    """
    Movie model representing a film from Archive.org with OMDb metadata.
    """
    name = models.CharField(max_length=255)
    archive_identifier = models.CharField(max_length=255, unique=True)
    imdb_id = models.CharField(max_length=50, blank=True, null=True)
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    imdb_poster_url = models.URLField(max_length=500, blank=True, null=True)
    genre = models.CharField(max_length=255, blank=True, null=True)
    production_year = models.IntegerField(blank=True, null=True)
    length = models.IntegerField(help_text="Length in minutes", blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['archive_identifier']),
            models.Index(fields=['imdb_id']),
        ]

    def __str__(self):
        return self.name


class Subtitle(models.Model):
    """
    Subtitle model representing available subtitle languages for a movie.
    """
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name='subtitles'
    )
    language = models.CharField(max_length=50)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['movie', 'language']
        ordering = ['language']

    def __str__(self):
        return f"{self.movie.name} - {self.language}"


class Comment(models.Model):
    """
    Comment model representing user comments on movies.
    """
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='movie_comments'
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['movie', '-created_at']),
        ]

    def __str__(self):
        return f"{self.user.username} on {self.movie.name}"

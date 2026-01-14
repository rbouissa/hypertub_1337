from django.contrib import admin
from .models import Movie, Subtitle, Comment


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['name', 'production_year', 'imdb_rating', 'length', 'archive_identifier']
    list_filter = ['production_year']
    search_fields = ['name', 'archive_identifier', 'imdb_id']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Subtitle)
class SubtitleAdmin(admin.ModelAdmin):
    list_display = ['movie', 'language', 'created_at']
    list_filter = ['language']
    search_fields = ['movie__name']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['movie', 'user', 'content_preview', 'created_at']
    list_filter = ['created_at']
    search_fields = ['movie__name', 'user__username', 'content']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'

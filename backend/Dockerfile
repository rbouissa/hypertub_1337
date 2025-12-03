# Backend Dockerfile in ./backend
# FROM python:3.10

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # Set working directory inside the container
# WORKDIR /app

# # Copy requirements first (for better caching)
# COPY requirements.txt /app/

# # Install Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy project files
# COPY . /app/

# # Make sure manage.py is executable
# RUN chmod +x departement_project/manage.py

# # Expose the port the app runs on
# EXPOSE 8000

# # Default command
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]



# FROM python:3.10

# WORKDIR /app

# # Copy everything including the renamed entrypoint
# COPY . /app

# # Make sure the entrypoint script is executable
# RUN chmod +x /app/entrypoint.sh

# ENTRYPOINT ["/app/entrypoint.sh"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]









FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

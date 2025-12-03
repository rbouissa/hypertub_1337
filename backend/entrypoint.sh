# #!/bin/bash

# # sleep 5

# # cd backend
# # echo "herrrrrrrrrrrrrrr\n"

# python3.10 manage.py createsuperuser --username=reda --password=123

# python3.10 manage.py makemigrations
# python3.10 manage.py migrate
# python3.10 manage.py collectstatic --noinput

# # Trap SIGTERM and SIGINT and call the on_exit function

# # python3.11 manage.py collectstatic
# # python3.10 manage.py runserver 0.0.0.0:8000
# daphne -b 0.0.0.0 -p 8000 backend.asgi:application
# # exec python manage.py runserver 0.0.0.0:800


#!/bin/bash

# Run migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Create superuser only if it doesn’t exist
echo "from django.contrib.auth import get_user_model; \
      User = get_user_model(); \
      User.objects.filter(username='admin').exists() or \
      User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')" \
| python manage.py shell

# Run server
exec "$@"

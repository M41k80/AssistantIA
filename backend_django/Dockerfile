FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY django_server/ ./django_server/

WORKDIR /app/django_server

# Puerto y comando de arranque
# RUN python manage.py makemigrations
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["sh", "-c", "gunicorn django_server.wsgi:application --bind 0.0.0.0:8000"]
    # "python manage.py makemigrations && \
    # python manage.py collectstatic --noinput && \
    # python manage.py migrate && \
    # gunicorn fitflow.wsgi:application --bind 0.0.0.0:8000"]
    # python manage.py runserver 0.0.0.0:8000"]

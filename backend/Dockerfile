FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip curl git libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY backend/ .

RUN composer install --no-dev --optimize-autoloader
RUN touch database/database.sqlite
RUN DB_CONNECTION=sqlite DB_DATABASE=/app/database/database.sqlite php artisan migrate --force

EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]

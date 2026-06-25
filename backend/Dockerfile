FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip curl git libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY backend/ .
RUN chmod +x render-start.sh

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

EXPOSE 10000
CMD ["./render-start.sh"]

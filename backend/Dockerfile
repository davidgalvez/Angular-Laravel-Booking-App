FROM php:8.1-fpm
WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    zip unzip git curl \
    libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd \
    && docker-php-ext-install gd pdo_mysql

COPY . .

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


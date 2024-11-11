# Utiliser une image PHP avec Apache
FROM php:8.1-apache

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libzip-dev \
    default-mysql-client && \
    docker-php-ext-install zip mysqli

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copier les fichiers de l'application dans le conteneur
COPY . /var/www/html

# Donner les permissions appropriées pour Apache et le dossier image_app
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html && \
    mkdir -p /var/www/html/image_app && \
    chown -R www-data:www-data /var/www/html/image_app && \
    chmod -R 775 /var/www/html/image_app

# Exposer le port 80 pour Apache
EXPOSE 80

# Commande de démarrage
CMD ["apache2-foreground"]

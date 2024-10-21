# Use uma imagem base oficial do PHP com Apache
FROM php:8.2-apache

# Instale extensões PHP necessárias
RUN docker-php-ext-install pdo pdo_mysql

# Instale Node.js e npm (versão 16.x)
RUN apt-get update && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Copiar o composer.lock e composer.json
COPY composer.json composer.lock /var/www/html/

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Instalar as dependências do Composer
RUN apt-get update && \
    apt-get install -y libzip-dev && \
    docker-php-ext-install zip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-autoloader --no-scripts

# Copie os arquivos da aplicação para o diretório padrão do Apache
COPY . /var/www/html

# Instale as dependências do Composer
RUN composer install

# Instalar as dependências do npm
RUN npm install

# Dê permissão ao diretório de armazenamento e cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponha a porta 80
EXPOSE 80

# Comando para rodar o npm run dev
CMD ["npm", "run", "dev"]
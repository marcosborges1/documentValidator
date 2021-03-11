FROM node:14-alpine
MAINTAINER ITALO BARBOZA E MARCOS BORGES
COPY . /var/www
WORKDIR /var/www
ENTRYPOINT npm start
EXPOSE 3000

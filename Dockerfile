FROM node:14

RUN apt-get update && mkdir /app
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

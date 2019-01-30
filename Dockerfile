FROM node:8.15.0-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 80

ENTRYPOINT ["node", "express.js"]

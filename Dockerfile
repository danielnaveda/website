FROM node:8.15.0-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 80

ENTRYPOINT ["node", "server/index.js"]

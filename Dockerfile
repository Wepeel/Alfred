FROM node:14-alpine3.13

EXPOSE 3000

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm i
RUN npm i -g gulp-cli
RUN npm i -g gulp
RUN npm i gulp
RUN gulp build

CMD [ "npm", "start" ]
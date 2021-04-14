FROM node:14-alpine3.13

EXPOSE 3000

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

CMD [ "npm", "start" ]
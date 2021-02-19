FROM node:14.15.4
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

ADD . /src

RUN npm run build

CMD npm start
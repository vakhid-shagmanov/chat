FROM node:12


WORKDIR /opt/chat-client

COPY ./package*.json ./

RUN npm i @vue/cli
RUN npm i

COPY . .

EXPOSE 8000
CMD [ "npm", "run", "serve" ]

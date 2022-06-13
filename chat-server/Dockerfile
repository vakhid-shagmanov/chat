FROM node:12


WORKDIR /opt/server

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 6000
CMD [ "npm", "run", "start" ]

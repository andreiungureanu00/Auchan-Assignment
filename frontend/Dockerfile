FROM node:19-bullseye

WORKDIR /frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6000

CMD ["npm", "start"]


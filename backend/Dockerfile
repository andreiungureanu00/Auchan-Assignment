FROM node:alpine

# Set the working directory in the container
WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["./wait-for-it.sh", "db", "5432", "npm", "start"]
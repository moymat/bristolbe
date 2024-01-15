FROM node:16-alpine

RUN npm install -g pnpm && mkdir /app

WORKDIR /app

COPY package*.json .

RUN pnpm install -P

COPY . .

EXPOSE 4000

CMD [ "node", "app.js" ]

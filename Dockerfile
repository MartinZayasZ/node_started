FROM node:16.18.1-alpine3.15

WORKDIR /app
COPY . .
RUN yarn install --production

CMD ["node", "server.js"]
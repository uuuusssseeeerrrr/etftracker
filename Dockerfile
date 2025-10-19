FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]

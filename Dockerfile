FROM node:24-alpine

WORKDIR /app

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]

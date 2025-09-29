FROM node:22-alpine
LABEL version="1.0.0"

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="3000"
ENV TZ="Asia/Seoul"

RUN apk update && apk upgrade
RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]

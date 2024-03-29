FROM node:20-alpine
LABEL version='1.0.0'

ENV NODE_VERSION=20.11.1
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN apk update && apk upgrade
RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 30000

ENTRYPOINT ["npm", "start"]

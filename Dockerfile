FROM node:20-alpine
LABEL version='1.0.0'

ENV NODE_VERSION=20.11.1
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN apk update && apk upgrade
RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]

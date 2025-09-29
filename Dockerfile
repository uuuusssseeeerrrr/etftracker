FROM node:22-alpine
LABEL version="1.0.0"

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="3000"
ENV TZ="Asia/Seoul"

RUN apk update && apk upgrade
RUN mkdir -p /app

WORKDIR /app

COPY ./ ./

RUN npm install -g pnpm
RUN pnpm install
RUN npx prisma generate
RUN pnpm run build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]

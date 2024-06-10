FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci
COPY ./src ./src
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY ./cfg ./cfg

RUN npm ci --only=production

ENV DATA_SOURCE="tcp-client"
ENV TCP_SERVER_PORT="3000"
ENV TCP_SERVER_HOST="localhost"

EXPOSE ${TCP_SERVER_PORT}

CMD ["sh", "-c", "while true; do node ./dist/cmd/entrypoint.js; echo 'Application crashed! Restarting in 1 seconds...'; sleep 1; done"]

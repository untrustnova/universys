# Tahap build
FROM node:24-alpine AS builder

WORKDIR /app
ARG APP_VERSION="0.2.0"

COPY package.json yarn.lock ./

RUN npm install --force
COPY . .
RUN npm run build

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4173
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "4173"]
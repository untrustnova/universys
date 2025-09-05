# Building Vite Dist
FROM node:24-alpine AS builder

WORKDIR /app
ARG APP_VERSION="0.2.1"

COPY package.json yarn.lock ./
RUN npm install --force
COPY . .
RUN npm run build --buildfordocker

# Final Stage
FROM nginx:stable-alpine AS production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
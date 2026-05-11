# 1. Aşama: Build
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV CI=false
RUN npm run build

# 2. Aşama: Nginx ile Sunma
FROM nginx:alpine
# SİHİRLİ SATIR: Az önce yazdığımız trafik polisi ayarını Docker'ın içine atıyoruz
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
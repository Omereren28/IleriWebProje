# 1. Aşama: Node ortamını hazırla
FROM node:18-alpine
WORKDIR /app

# 2. Aşama: Önce paket dosyalarını kopyala ve kur (Docker önbelleği için önemlidir)
COPY package*.json ./
RUN npm install

# 3. Aşama: Geri kalan tüm dosyalarını (.env dahil) kopyala
COPY . .

# 4. Aşama: server.js hangi portta çalışıyorsa onu yaz (Örn: 5000)
EXPOSE 5000

# 5. Aşama: Uygulamayı başlat
CMD ["node", "server.js"]
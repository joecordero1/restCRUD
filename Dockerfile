# Dockerfile básico para app Node.js
FROM node:18

WORKDIR /app
COPY . .
RUN npm install

CMD ["node", "index.js"]

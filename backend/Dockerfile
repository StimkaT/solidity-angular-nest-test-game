FROM node:20

WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install --production

# Копируем весь код
COPY . .

# Сборка NestJS в dist
RUN npm install @nestjs/cli
RUN npx nest build

# Запуск backend из dist
CMD ["node", "dist/main.js"]

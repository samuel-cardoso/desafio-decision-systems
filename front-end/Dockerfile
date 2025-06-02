# Etapa de build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm install

RUN npx prisma generate  # <-- Gera o client

COPY . .
RUN npm run build

# Etapa final
FROM node:18

WORKDIR /app

COPY --from=builder /app /app

RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "dist/index.js"]

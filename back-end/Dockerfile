# Etapa de build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./
RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

# Etapa final
FROM node:18

WORKDIR /app

COPY --from=builder /app /app
RUN npm install --omit=dev

# ⚠️ Garanta que o client seja regenerado na imagem final
RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/index.js"]

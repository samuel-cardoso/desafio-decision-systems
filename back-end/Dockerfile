FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./
RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=builder /app /app
RUN npm install --omit=dev

# ⚠️ Regenerar client é bom pra segurança
RUN npx prisma generate

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]


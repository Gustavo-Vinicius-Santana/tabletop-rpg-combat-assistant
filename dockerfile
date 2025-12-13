# =====================================
# Stage 1 — Dependencies (com dev)
# =====================================
FROM node:18-bullseye-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./

# Instala TODAS as dependências (inclui dev)
RUN npm ci


# =====================================
# Stage 2 — Build
# =====================================
FROM node:18-bullseye-slim AS builder

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build do Next.js
RUN npm run build


# =====================================
# Stage 3 — Runtime (produção)
# =====================================
FROM node:18-bullseye-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Usuário não-root
RUN useradd --uid 1001 --create-home nextjs

# Copia somente o necessário para rodar
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

RUN chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]

# Tabletop RPG Combat Assistant

Aplicação web para auxiliar no gerenciamento de combates em **Tabletop RPGs**, desenvolvida com **Next.js**.

Este projeto foi criado utilizando [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) e segue boas práticas de build, containerização e deploy com Docker.

---

## 🚀 Tecnologias

- [Next.js](https://nextjs.org)
- React
- TypeScript
- Docker
- Docker Compose

---

## 📦 Pré-requisitos

Para rodar o projeto, você precisa ter instalado:

### Para rodar localmente
- Node.js **18+**
- npm / yarn / pnpm / bun

### Para rodar com Docker
- Docker
- Docker Compose

---

## ▶️ Rodando a aplicação localmente (sem Docker)

1. Clone o repositório:
```bash
git clone https://github.com/Gustavo-Vinicius-Santana/tabletop-rpg-combat-assistant.git
cd tabletop-rpg-combat-assistant
```

2. Instale as dependencias:
```
npm install
```

3. Inicie o servidor de desenvolvimento:
```
npm run dev
```

4. Acesse no navegador:
```
http://localcost:300
```
A aplicação será recarregada automaticamente conforme você edita os arquivos.

---


## 🐳 Rodando a aplicação com Docker (Docker Hub)

A aplicação já está publicada no Docker Hub:
```
gustecdev/tabletop-rpg-combat-assistant
```

▶️ Rodar diretamente com `docker run`
```
docker run -p 3000:3000 gustecdev/tabletop-rpg-combat-assistant:1.0.0
```

depois, acesse:
```
http://localhost:3000
```

---

## 🧩 Rodando com Docker Compose (recomendado)

1. Suba a aplicação usando o compose:
```
docker compose up
```

2. Acesse no navegador:
```
http://localhost:3000
```
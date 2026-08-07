# SimpleFullSystem

Repositorio del sistema completo, compuesto por un **backend** de API REST y un **frontend** web de gestión de productos.

## Estructura

| Carpeta | Descripción |
|---|---|
| [`Backend/`](./Backend/README.md) | API REST en **Express 5 + TypeScript + MongoDB** (arquitectura limpia). CRUD de usuarios con validación Zod, paginación y búsqueda. |
| [`Frontend/`](./Frontend/app/README.md) | Aplicación web en **Next.js 16 + TypeScript** (App Router). CRUD de productos con modales de confirmación, validación Zod + React Hook Form, estado global con Zustand (persistencia en `localStorage`) y tests unitarios con Jest. |

## Requisitos

- Node.js >= 20
- pnpm >= 9
- Docker (opcional, para MongoDB)

## Puesta en marcha

```bash
# Backend (API en http://localhost:3000)
cd Backend
pnpm install
docker compose up -d        # MongoDB
pnpm dev

# Frontend (web en http://localhost:3001)
cd ../Frontend/app
pnpm install
pnpm dev
```

Consulta la documentación específica en cada subcarpeta para más detalles de instalación, endpoints y scripts.

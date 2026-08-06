# Backend — Prueba Desarrollador Junior (Node.js + MongoDB)

API REST construida con **Express 5**, **MongoDB/Mongoose** y **TypeScript**, siguiendo una
arquitectura limpia (domain / application / infrastructure).

## Requisitos

- Node.js >= 20
- pnpm >= 9 (o npm/yarn)
- Docker (para levantar MongoDB) o una instancia de MongoDB local

## Instalación

```bash
pnpm install
```

## Variables de entorno

Copia el archivo `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URL` | Cadena de conexión a MongoDB | `mongodb://admin:pass@127.0.0.1:27017/prueba_backend?authSource=admin` |

## Base de datos (MongoDB)

Levanta MongoDB con Docker Compose (base de datos `prueba_backend`):

```bash
docker compose up -d
```

## Ejecutar

```bash
pnpm dev          # desarrollo (tsx watch)
pnpm build        # compilar a dist/
pnpm start        # producción
```

El servidor escucha en `http://localhost:3000` (verificar: `GET /health`).


## Collecion para probar enpoints

Carpeta de Usuario contiene los enpoints, exporte la collecion a postman

`/pruebaBackend.json`

## Endpoints

Todas las rutas usan el prefijo `/usuarios`. La API acepta y responde en español.

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/usuarios` | Crea un usuario |
| `GET` | `/usuarios` | Lista usuarios (paginado) |
| `GET` | `/usuarios/:id` | Obtiene un usuario por ID |
| `PUT` | `/usuarios/:id` | Actualiza un usuario por ID |
| `DELETE` | `/usuarios/:id` | Elimina un usuario por ID |
| `GET` | `/usuarios/buscar` | Busca usuarios por dirección (ej. `?ciudad=Lima`) (paginado) |

### Crear usuario

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Perez",
    "email": "juan.perez@example.com",
    "edad": 30,
    "direcciones": [
      {
        "calle": "Av. Principal",
        "ciudad": "Lima",
        "pais": "Perú",
        "codigo_postal": "15001"
      }
    ]
  }'
```

### Listar usuarios (paginado)

```bash
curl "http://localhost:3000/usuarios?page=1&limit=10"
```

### Buscar por ciudad

```bash
curl "http://localhost:3000/usuarios/buscar?ciudad=Lima"
```

También acepta `calle`, `pais` y `codigo_postal`. Se requiere al menos un parámetro.

### Actualizar usuario

```bash
curl -X PUT http://localhost:3000/usuarios/<ID> \
  -H "Content-Type: application/json" \
  -d '{"edad": 31}'
```

### Respuesta de ejemplo

```json
{
  "success": true,
  "data": {
    "id": "66...",
    "nombre": "Juan Perez",
    "email": "juan.perez@example.com",
    "edad": 30,
    "fecha_creacion": "2026-08-06 14:30:00",
    "direcciones": [
      {
        "calle": "Av. Principal",
        "ciudad": "Lima",
        "pais": "Perú",
        "codigo_postal": "15001"
      }
    ]
  }
}
```

## Validaciones y errores

- `email` único (409 si ya existe, con índice único en MongoDB).
- Campos requeridos: `nombre`, `email` y `direcciones` (400 si faltan).
- `direcciones` debe ser un array de objetos válidos (`calle`, `ciudad`, `pais`, `codigo_postal`).
- `edad` opcional, número entero no negativo.
- `:id` debe ser un `ObjectId` válido (400 si no lo es).
- Usuario inexistente devuelve `404 USER_NOT_FOUND`.

Formato de error:

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "errors": [{ "field": "nombre", "message": "El campo nombre es requerido" }]
}
```

## Estructura del proyecto

```
src/
├── domain/            # Entidades, interfaces de repositorio y errores de dominio
│   ├── entities/
│   ├── errors/
│   └── repositories/
├── application/       # Casos de uso, servicios, DTOs y mapeadores
│   ├── dtos/
│   ├── mappers/
│   ├── routes/
│   ├── services/
│   ├── shared/
│   └── useCases/
└── infrastructure/    # Adaptadores: HTTP (controllers/middleware/schemas), MongoDB, repositorios
    ├── http/
    ├── persistence/
    └── repositories/
```

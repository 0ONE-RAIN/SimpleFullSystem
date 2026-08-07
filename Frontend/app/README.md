# Frontend — SimpleFullSystem

Aplicación de gestión de productos construida con **Next.js** (App Router). Permite listar, buscar, ordenar, crear y eliminar productos, con validación reactiva, confirmación por modales y persistencia automática en `localStorage`.

## Stack tecnológico y justificación

Para la implementación de este proyecto se utilizó **Zod** como herramienta de validación, definiendo los esquemas del formulario de creación de productos (`nombre`, `descripcion` y `cantidad`) y garantizando que los datos cumplan las reglas de negocio antes de enviarse. De la mano, se utilizaron los hooks de **React Hook Form** para validar los formularios en tiempo real, integrándolos con Zod mediante `zodResolver`, de modo que la interfaz reacciona de inmediato al estado de validación (por ejemplo, habilitando o deshabilitando el botón de continuar).

También se utilizó **Zustand** como herramienta para el store. Zustand nos permite escribir menos boilerplate e implementar funcionalidades como stores o estados globales, que a su vez generan un estado reactivo en nuestras UIs y en las distintas vistas. Además, permite mutar y actualizar los datos mediante funciones puras y almacenarlos automáticamente en `localStorage` gracias a su `createJSONStorage`.

También utilizamos la librería de iconos **lucide-react**, que provee los iconos necesarios para los modales y formularios (Plus, Trash2, AlertTriangle, Search, etc.). Para la interfaz usamos **Tailwind CSS** y **TypeScript** en sus últimas versiones, lo que nos aporta un sistema de diseño utilitario y un tipado estático robusto en todo el proyecto.

Creamos este proyecto en **Next.js** por nuestra mayor familiaridad con lenguajes tipados como Angular, en los que contamos con reacciones reactivas, un buen manejo de rutas y un control mucho más completo de la aplicación.

## Características principales

- **Lista de productos** con `divide-y` en tonos `stone` y estado vacío.
- **Filtros** en la parte superior (búsqueda por nombre/descripción y ordenamiento por fecha, cantidad, nombre o código) que actualizan la vista reactivamente mediante el store.
- **Creación** con modal que se expande desde el botón "Agregar Producto": formulario validado con Zod + React Hook Form y un paso previo tipo *card* de confirmación con el `codigo` auto-generado.
- **Eliminación** con modal de confirmación de severidad `danger` (rojo) y, en creación, severidad `info` (azul).
- **Modales reutilizables** con estilo glassmorphism (gradiente blanco suave + borde), blur y oscurecimiento del fondo a nivel global mediante `createPortal` (evita que el `fixed` quede atrapado en el contenedor padre).
- **`codigo` auto-generado**: numérico incremental (máximo existente + 1), sin entrada manual.

## Estructura del proyecto

```
app/
├── app/                         # App Router de Next.js
│   ├── page.tsx                 # Página principal
│   ├── layout.tsx
│   └── globals.css              # Estilos globales y animaciones de los modales
├── components/
│   ├── ui/
│   │   └── modal.tsx            # Modal reutilizable (severidad, glassmorphism, portal)
│   ├── product-list.tsx         # Lista con divide-y y botón eliminar
│   ├── product-filter.tsx       # Búsqueda y ordenamiento
│   ├── product-form-modal.tsx   # Creación: formulario + preview de confirmación
│   └── confirm-delete-modal.tsx # Confirmación de eliminación
├── lib/
│   ├── products.ts              # Lógica pura: filtrado, ordenamiento y codigo
│   └── button-styles.ts         # Estilos compartidos de botones
├── stores/
│   └── use-product.store.ts     # Estado global (Zustand + persist en localStorage)
├── types/
│   └── product.ts               # Tipos y esquema Zod del producto
├── jest.config.ts
└── package.json
```

## Scripts

```bash
pnpm dev      # Inicia el servidor de desarrollo
pnpm build    # Genera la build de producción
pnpm start    # Inicia la build de producción
pnpm lint     # Ejecuta ESLint
pnpm test     # Ejecuta los tests unitarios con Jest
```

## Testing

Los tests unitarios (Jest + ts-jest) cubren la lógica pura y el estado global, sin necesidad de levantar el navegador:

- **`lib/products.test.ts`** — filtrado (por nombre y descripción, case-insensitive, trim) y los 4 ordenamientos (`creacion`, `cantidad`, `nombre`, `codigo`) + `getNextCodigo`.
- **`types/product.test.ts`** — casos válidos e inválidos del esquema Zod.
- **`stores/use-product.store.test.ts`** — auto-generación secuencial de `codigo`, asignación de `creacion`, eliminación y actualización de búsqueda/ordenamiento.

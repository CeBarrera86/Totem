# Totem Corpico (React + TypeScript)

Totem para generación de tickets de turnos. Proyecto interno de la cooperativa Corpico, construido con React + TypeScript, Vite y arquitectura por capas (MVC simplificado).

## Requisitos

- Node.js 18+ (recomendado)
- npm 9+

## Instalación rápida

1) Clonar el repositorio
2) Instalar dependencias: `npm install`
3) Variables de entorno
	- Copiar .env-ejemplo a .env
	- Configurar `VITE_DIR`, `VITE_PORT` y `VITE_API_KEY`
	- Opcional: `VITE_API_URL` (URL completa) y `VITE_API_TIMEOUT` (ms)
4) Ejecutar: `npm run dev`

## Scripts

- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npm run preview` — previsualización
- `npm run lint` — validación de reglas

## Arquitectura (resumen)

- **Views**: pantallas (UI) sin lógica de negocio.
- **Controllers**: orquestan casos de uso y navegación.
- **Components**: UI reutilizable.
- **Hooks**: lógica compartida sin side-effects de negocio.
- **Services**: acceso a APIs.
- **Models/Types**: contratos de datos.
- **Validations**: esquemas de validación.

Las reglas de ESLint restringen imports entre capas para mantener responsabilidades claras.

### Flujo MVC (simplificado)

Views → Controllers → Services → API
Views → Components → Hooks (UI)

## Estructura base

- src/views
- src/controllers
- src/components
- src/hooks
- src/services
- src/models
- src/validations
- src/config
- src/types

## Notas

- Alias de imports: `@/` apunta a `src`.
- El proyecto es TypeScript puro (sin .js/.jsx en `src`).
- Se incluye un aviso visual si no hay conexión a la red interna.
- Se incluye un banner global de error con reintento ante fallas de API.
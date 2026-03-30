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
	- Si el backend exige autorización Totem: `VITE_TOTEM_TOKEN`
	- Opcional: `VITE_API_URL` (URL completa) y `VITE_API_TIMEOUT` (ms)
	- Impresion: `VITE_PRINT_MODE` (`auto`, `agent` o `browser`)
	- Impresion: `VITE_PRINT_PRINTER_NAME` (por defecto `EPSON TM-T20III`)
4) Ejecutar: `npm run dev`

## Scripts

- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npm run preview` — previsualización
- `npm run lint` — validación de reglas

## Linting (actualizado)

- Configuración migrada a ESLint Flat Config con `defineConfig`.
- Integración de `typescript-eslint`, `eslint-config-prettier` y `eslint-plugin-simple-import-sort`.
- Se mantiene `eslint-plugin-boundaries` con reglas por capas del proyecto.
- `npm run lint` actualmente finaliza sin errores ni warnings.
- Para aplicar formato/lint automático cuando haga falta: `npm run lint -- --fix`.

## Diagnóstico React

- `npx react-doctor --verbose` actualmente finaliza sin issues.
- Score actual del proyecto: `100/100`.

## Arquitectura (resumen)

- **Views**: pantallas (UI) sin lógica de negocio.
- **Controllers**: orquestan casos de uso y navegación, reutilizando hooks de flujo.
- **Components**: UI reutilizable.
- **Hooks**: lógica compartida sin side-effects de negocio.
- **Services**: acceso a APIs, normalización de respuestas y utilidades de persistencia.
- **Models/Types**: contratos de datos.
- **Validations**: esquemas de validación.

### Mejoras recientes

- Se unificó la generación de tickets en `useTicketFlow` para evitar duplicación entre controladores.
- Se centralizó el manejo de `sessionStorage` del cliente en `sessionClienteStorage`.
- Se eliminó la capa de `handlers` que había quedado redundante frente a controllers y hooks.
- Se movió la normalización de datos de sectores y trámites a mapeadores reutilizables en services.
- Los mapeadores toleran respuestas de backend en array plano o envueltas en `data`.
- La generación de ticket soporta respuestas de backend con formato `{ message, data }`.
- Se agregaron rutas con lazy loading para reducir el peso del chunk inicial.
- Se reemplazaron alertas bloqueantes por errores visibles en pantalla para una UX mas fluida.
- Se optimizó el teclado numérico con memoización y callbacks estables para reducir renders.
- Se restauraron las rutas de flujo completo (`/`, `/index`, `/secciones`, `/tramites`).

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

## Impresion de tickets

- El proyecto soporta dos caminos: impresion directa por agente local (QZ Tray) y fallback por navegador.
- Modo recomendado: `VITE_PRINT_MODE=auto`.
- En `auto`, primero intenta imprimir directo en la impresora configurada y, si falla, cae a `window.print`.
- En `agent`, solo usa impresion directa (si no hay agente local o impresora, falla).
- En `browser`, usa solo dialogo de navegador.

### Impresion sin interaccion (kiosco)

- Instalar QZ Tray en la PC Windows que tiene conectada la EPSON.
- Definir `VITE_PRINT_MODE=agent` o `auto`.
- Definir `VITE_PRINT_PRINTER_NAME=EPSON TM-T20III`.
- Si se usa solo navegador, para evitar dialogo se requiere Chrome en modo kiosk-printing y la impresora predeterminada correcta.
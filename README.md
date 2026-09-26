# Benny's Motors — Calculadora RYM

Calculadora web para el equipo de mecánicos de **Benny's Motors** del servidor **RYM** (FiveM GTA V
Roleplay). Permite calcular rápidamente el precio de piezas de rendimiento, cosméticas, de mantención,
promociones y reparaciones, según el tipo de vehículo, respetando el tope de precio definido por el owner.

## Reglas de precio

- Los valores base están definidos según la economía actual del servidor.
- El precio final a cobrar **no puede superar el x3.0** del precio base (control incluido en la calculadora
  mediante el slider "Multiplicador de precio").
- Se pueden abaratar costos libremente (por convenio o precio mecánico), sin mínimo obligatorio.
- Reparación en Taller y fuera de Taller: Efectivo/Transferencia. Kit de Reparación: Tablet Factura.

## Tecnologías

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler/dev server

Es una aplicación 100% frontend (no requiere backend/Node en producción); Node.js solo se usa como
herramienta de desarrollo (`npm run dev` / `npm run build`).

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

### Vercel (recomendado)

1. Importar el repositorio [rym-calculadora-benny](https://github.com/Kenunezm/rym-calculadora-benny) en [vercel.com](https://vercel.com/new).
2. Vercel detecta automáticamente el framework Vite (build command `npm run build`, output `dist`).
3. Cada push a `main` genera un nuevo despliegue automáticamente.

### GitHub Pages (alternativa)

1. En el repositorio, ir a **Settings → Pages → Source** y seleccionar **GitHub Actions**.
2. El workflow [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) construye y publica el sitio
   automáticamente en cada push a `main`.
3. El sitio quedará disponible en `https://kenunezm.github.io/rym-calculadora-benny/`.

## Actualizar precios

Todos los valores base viven en un solo archivo: [`src/data/prices.ts`](src/data/prices.ts). Modificar
ahí las categorías de vehículo, precios por pieza y precios de promociones/reparaciones.

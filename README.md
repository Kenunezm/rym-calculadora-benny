# Benny's Motors — Calculadora Yakuza

Calculadora web para el equipo de mecánicos de **Benny's Motors** del servidor **Yakuza** (FiveM GTA V Roleplay). Permite agregar artículos por cantidad y calcular el precio de venta según el catálogo actual, sin elegir una categoría de vehículo.

## Reglas de precio

- Cada artículo tiene su propio precio de compra y, cuando está definido, su precio máximo de venta (por multiplicador o precio fijo).
- Los artículos marcados como **No venta** o **Venta pendiente de definir** se muestran en el catálogo, pero no se agregan al total.
- Los topes de los grupos de mantención se aplican a su subtotal de venta.
- Se puede aplicar un descuento al total calculado, copiar el monto y reiniciar la calculadora.
- La pestaña Diner se mantiene separada y sin cambios.

## Tecnologías

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler/dev server

Es una aplicación 100% frontend (no requiere backend/Node en producción); Node.js solo se usa como herramienta de desarrollo.

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

## Actualizar precios

Todos los artículos y sus reglas de precio viven en [`src/data/prices.ts`](src/data/prices.ts).

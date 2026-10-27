/** Catálogo de precios de Benny's Motors según la tabla entregada. */
export interface PriceItem {
  key: string;
  label: string;
  /** Precio de compra / valor base. null cuando la tabla no lo indica. */
  purchasePrice: number | null;
  /** Multiplicador máximo de venta (por ejemplo, 3 equivale a x3). */
  maxMultiplier?: number;
  /** Precio de venta fijo cuando la tabla indica un valor directo. */
  fixedSalePrice?: number;
  /** Texto informativo para valores pendientes o condiciones especiales. */
  note?: string;
  /** Los elementos sin un precio de venta definido se muestran pero no se pueden agregar. */
  sellable: boolean;
}

export interface PriceGroup {
  key: string;
  label: string;
  items: PriceItem[];
  /** Tope de venta total del grupo, cuando se indica en la tabla. */
  maxTotal?: number;
}

export const PRICE_GROUPS: PriceGroup[] = [
  {
    key: "estetico",
    label: "Estético",
    items: [
      { key: "cosmeticos", label: "Cosméticos", purchasePrice: 1000, maxMultiplier: 3, sellable: true },
      { key: "pintura", label: "Pintura", purchasePrice: 1500, maxMultiplier: 3, sellable: true },
      { key: "led", label: "LED", purchasePrice: 500, maxMultiplier: 3, sellable: true },
      { key: "ruedas", label: "Ruedas", purchasePrice: 2000, maxMultiplier: 3, sellable: true },
      { key: "extra-kit", label: "Extra kit", purchasePrice: 1500, maxMultiplier: 3, sellable: true },
      { key: "stancer", label: "Stancer", purchasePrice: 3000, note: "No venta", sellable: false },
      { key: "smoke", label: "Smoke", purchasePrice: 1000, maxMultiplier: 3, sellable: true },
    ],
  },
  {
    key: "rendimiento",
    label: "Rendimiento",
    items: [
      { key: "performance", label: "Performance", purchasePrice: 2000, maxMultiplier: 3, sellable: true },
      { key: "turbo", label: "Turbo", purchasePrice: 4000, maxMultiplier: 3, sellable: true },
      { key: "frenos-ceramicos", label: "Frenos cerámicos", purchasePrice: 20000, maxMultiplier: 3, sellable: true },
      { key: "awd", label: "AWD", purchasePrice: 20000, maxMultiplier: 3, sellable: true },
      { key: "rdw", label: "RDW", purchasePrice: 15000, maxMultiplier: 3, sellable: true },
      { key: "fwd", label: "FWD", purchasePrice: 10000, maxMultiplier: 3, sellable: true },
      { key: "i4", label: "i4", purchasePrice: 30000, maxMultiplier: 2, sellable: true },
      { key: "v6", label: "V6", purchasePrice: 40000, maxMultiplier: 2, sellable: true },
      { key: "v8", label: "V8", purchasePrice: 50000, maxMultiplier: 2, sellable: true },
      { key: "v12", label: "V12", purchasePrice: 250000, maxMultiplier: 2, sellable: true },
      { key: "kit-drift", label: "Kit Drift", purchasePrice: 50000, maxMultiplier: 2, sellable: true },
      { key: "nitro-instalacion", label: "Instalación de nitro", purchasePrice: null, fixedSalePrice: 2500, sellable: true },
      { key: "nitro-vacio", label: "Nitro vacío", purchasePrice: 2000, note: "Venta pendiente de definir", sellable: false },
      { key: "nitro-no2", label: "Nitro NO2", purchasePrice: 4000, maxMultiplier: 3, sellable: true },
    ],
  },
  {
    key: "mantencion",
    label: "Mantención",
    maxTotal: 30000,
    items: [
      { key: "aceite", label: "Aceite", purchasePrice: 250, maxMultiplier: 3, sellable: true },
      { key: "filtro", label: "Filtro", purchasePrice: 100, maxMultiplier: 3, sellable: true },
      { key: "bujias", label: "Bujías", purchasePrice: 50, maxMultiplier: 3, sellable: true },
      { key: "pastillas", label: "Pastillas", purchasePrice: 50, maxMultiplier: 3, sellable: true },
      { key: "suspension", label: "Suspensión", purchasePrice: 150, maxMultiplier: 3, sellable: true },
      { key: "neumaticos", label: "Neumáticos", purchasePrice: 250, maxMultiplier: 3, sellable: true },
      { key: "embrague", label: "Embrague", purchasePrice: 1000, maxMultiplier: 3, sellable: true },
    ],
  },
  {
    key: "mantencion-especial",
    label: "Mantención especial",
    maxTotal: 100000,
    items: [
      { key: "ev-motor", label: "EV motor", purchasePrice: 15000, note: "Venta pendiente de definir", sellable: false },
      { key: "coolant", label: "Coolant", purchasePrice: 5000, note: "Venta pendiente de definir", sellable: false },
      { key: "bateria", label: "Batería", purchasePrice: 20000, note: "Venta pendiente de definir", sellable: false },
    ],
  },
  {
    key: "kits-consumibles",
    label: "Kits y consumibles",
    items: [
      { key: "kit-reparacion", label: "Kit de reparación", purchasePrice: null, fixedSalePrice: 10000, sellable: true },
      { key: "kit-limpieza", label: "Kit de limpieza", purchasePrice: 150, fixedSalePrice: 500, sellable: true },
      { key: "cinta", label: "Cinta", purchasePrice: 50, fixedSalePrice: 100, sellable: true },
    ],
  },
];

export function getSalePrice(item: PriceItem): number {
  if (item.fixedSalePrice !== undefined) return item.fixedSalePrice;
  if (item.purchasePrice !== null && item.maxMultiplier !== undefined) {
    return item.purchasePrice * item.maxMultiplier;
  }
  return 0;
}

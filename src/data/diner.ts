export interface DinerItem {
  key: string;
  label: string;
  price: number;
}

export const DINER_PRODUCTS: DinerItem[] = [
  { key: "unidad", label: "Producto (Unidad)", price: 300 },
  { key: "pack5", label: "Pack x5", price: 2500 },
  { key: "pack10", label: "Pack x10", price: 5000 },
];

export const DINER_PROMOS: DinerItem[] = [
  { key: "promoUnidad", label: "Producto (Unidad)", price: 250 },
  { key: "pack25", label: "Pack x25", price: 12500 },
  { key: "pack50", label: "Pack x50", price: 25000 },
];

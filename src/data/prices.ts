// Precios base según la economía del servidor (definidos por el owner).
// Regla: el precio final a cobrar NO puede superar el x3.0 de estos valores.
export const MAX_MULTIPLIER = 3.0;

export type CategoryKey =
  | "compacto"
  | "moto"
  | "suv"
  | "coupeSedan"
  | "deportivo"
  | "muscle"
  | "super"
  | "vip";

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { key: "compacto", label: "Compacto" },
  { key: "moto", label: "Moto" },
  { key: "suv", label: "SUV y Offroad" },
  { key: "coupeSedan", label: "Coupe y Sedán" },
  { key: "deportivo", label: "Deportivo" },
  { key: "muscle", label: "Muscle" },
  { key: "super", label: "Super" },
  { key: "vip", label: "VIP" },
];

type PriceMap = Record<CategoryKey, number>;

// Piezas de Rendimiento (unidad)
export const RENDIMIENTO: PriceMap = {
  compacto: 550,
  moto: 675,
  suv: 800,
  coupeSedan: 1200,
  deportivo: 2000,
  muscle: 2000,
  super: 5000,
  vip: 10000,
};

// Piezas Cosméticas (unidad)
export const COSMETICO: PriceMap = {
  compacto: 550,
  moto: 675,
  suv: 800,
  coupeSedan: 800,
  deportivo: 1000,
  muscle: 1000,
  super: 3000,
  vip: 5000,
};

// Piezas de Mantención (unidad)
export const MANTENCION: PriceMap = {
  compacto: 250,
  moto: 400,
  suv: 650,
  coupeSedan: 700,
  deportivo: 1000,
  muscle: 1000,
  super: 2500,
  vip: 1000,
};

// Promociones
export const PROMO_FULL_RENDIMIENTO: PriceMap = {
  compacto: 5000,
  moto: 7500,
  suv: 7500,
  coupeSedan: 12500,
  deportivo: 15000,
  muscle: 12000,
  super: 22500,
  vip: 50000,
};

export const PROMO_FULL_TODO: PriceMap = {
  compacto: 12000,
  moto: 16500,
  suv: 17500,
  coupeSedan: 32500,
  deportivo: 45000,
  muscle: 35000,
  super: 92500,
  vip: 95000,
};

export const PROMO_FULL_MANTENCION: PriceMap = {
  compacto: 15000,
  moto: 17500,
  suv: 17500,
  coupeSedan: 32500,
  deportivo: 45000,
  muscle: 25000,
  super: 50000,
  vip: 65000,
};

export interface PromoInfo {
  key: "rendimiento" | "todo" | "mantencion";
  label: string;
  description: string;
  prices: PriceMap;
}

export const PROMOTIONS: PromoInfo[] = [
  {
    key: "rendimiento",
    label: "Full Rendimiento",
    description: "Unidad x 5 piezas de rendimiento",
    prices: PROMO_FULL_RENDIMIENTO,
  },
  {
    key: "todo",
    label: "Full Todo",
    description: "Cosmético + Rendimiento completo",
    prices: PROMO_FULL_TODO,
  },
  {
    key: "mantencion",
    label: "Full Mantención",
    description: "Total de piezas de mantención",
    prices: PROMO_FULL_MANTENCION,
  },
];

export interface RepairInfo {
  key: "tallerInterno" | "tallerExterno" | "kit";
  label: string;
  price: number;
  paymentMethod: string;
}

export const REPAIRS: RepairInfo[] = [
  {
    key: "tallerInterno",
    label: "Reparación en Taller",
    price: 1000,
    paymentMethod: "Efectivo/Transferencia",
  },
  {
    key: "tallerExterno",
    label: "Reparación fuera del Taller",
    price: 2500,
    paymentMethod: "Efectivo/Transferencia",
  },
  {
    key: "kit",
    label: "Kit de Reparación",
    price: 1500,
    paymentMethod: "Tablet Factura",
  },
];

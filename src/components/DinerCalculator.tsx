import { useState } from "react";
import { DINER_PRODUCTS, DINER_PROMOS, type DinerItem } from "../data/diner";
import { formatCLP } from "../utils/format";
import Stepper from "./Stepper";

const DISCOUNT_PRESETS = [5, 10, 15];
const ALL_ITEMS = [...DINER_PRODUCTS, ...DINER_PROMOS];

function initialQty(): Record<string, number> {
  return Object.fromEntries(ALL_ITEMS.map((i) => [i.key, 0]));
}

function ItemCard({
  item,
  qty,
  onChange,
}: {
  item: DinerItem;
  qty: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="part-card">
      <div className="part-info">
        <span className="part-name">{item.label}</span>
        <span className="part-unit-price">{formatCLP(item.price)}</span>
      </div>
      <Stepper value={qty} onChange={onChange} />
      <span className="part-subtotal">{formatCLP(item.price * qty)}</span>
    </div>
  );
}

export default function DinerCalculator() {
  const [qty, setQty] = useState<Record<string, number>>(initialQty);
  const [discountPct, setDiscountPct] = useState(0);
  const [copied, setCopied] = useState(false);

  const total = ALL_ITEMS.reduce((sum, item) => sum + item.price * (qty[item.key] ?? 0), 0);
  const payTotal = total * (1 - discountPct / 100);

  function reset() {
    setQty(initialQty());
    setDiscountPct(0);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(Math.round(payTotal)));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="app-body">
      <div className="app-main">
        <div className="parts-grid">
          <section className="parts-section">
            <h3 className="parts-section-title">Productos</h3>
            {DINER_PRODUCTS.map((item) => (
              <ItemCard
                key={item.key}
                item={item}
                qty={qty[item.key] ?? 0}
                onChange={(n) => setQty((q) => ({ ...q, [item.key]: n }))}
              />
            ))}
          </section>

          <section className="parts-section">
            <h3 className="parts-section-title">Promociones</h3>
            {DINER_PROMOS.map((item) => (
              <ItemCard
                key={item.key}
                item={item}
                qty={qty[item.key] ?? 0}
                onChange={(n) => setQty((q) => ({ ...q, [item.key]: n }))}
              />
            ))}
          </section>
        </div>
      </div>

      <div className="app-side">
        <div className="summary-panel">
          <div className="total-card">
            <span className="total-label">Total a Pagar</span>
            <span className="total-value">{formatCLP(payTotal)}</span>
          </div>

          <div className="quick-block">
            <span className="quick-label">Descuento</span>
            <div className="chip-row">
              {DISCOUNT_PRESETS.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  className={"chip" + (discountPct === pct ? " chip-active" : "")}
                  onClick={() => setDiscountPct(discountPct === pct ? 0 : pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button type="button" className="btn-copy" onClick={handleCopy}>
              {copied ? "¡Copiado!" : "Copiar Monto"}
            </button>
            <button type="button" className="btn-reset" onClick={reset}>
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

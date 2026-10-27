import { useState } from "react";
import { formatCLP } from "../utils/format";

interface Props {
  baseTotal: number;
  finalTotal: number;
  maxTotal: number;
  discountPct: number;
  onDiscountChange: (n: number) => void;
  onReset: () => void;
}

const DISCOUNT_PRESETS = [5, 10, 15];

export default function SummaryPanel({ baseTotal, finalTotal, maxTotal, discountPct, onDiscountChange, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const payTotal = Math.round(finalTotal * (1 - discountPct / 100));

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(payTotal));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="summary-panel">
      <div className="total-card">
        <span className="total-label">Total a cobrar</span>
        <span className="total-value">{formatCLP(payTotal)}</span>
        <div className="total-breakdown">
          <span>Compra base: {formatCLP(baseTotal)}</span>
          <span>Venta máxima calculada: {formatCLP(maxTotal)}</span>
          {discountPct > 0 && <span>Descuento aplicado: {discountPct}%</span>}
        </div>
      </div>

      <div className="quick-block">
        <span className="quick-label">Descuento sobre la venta máxima</span>
        <div className="chip-row">
          {DISCOUNT_PRESETS.map((pct) => (
            <button
              key={pct}
              type="button"
              className={"chip" + (discountPct === pct ? " chip-active" : "")}
              onClick={() => onDiscountChange(discountPct === pct ? 0 : pct)}
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
        <button type="button" className="btn-reset" onClick={onReset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

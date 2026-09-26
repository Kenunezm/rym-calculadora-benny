import { useState } from "react";
import { MAX_MULTIPLIER } from "../data/prices";
import { formatCLP } from "../utils/format";

interface Props {
  baseTotal: number;
  finalTotal: number;
  maxTotal: number;
  multiplier: number;
  discountPct: number;
  onMultiplierChange: (n: number) => void;
  onDiscountChange: (n: number) => void;
  onReset: () => void;
}

const MULTIPLIER_PRESETS = [1, 1.5, 2, 2.5, 3];
const DISCOUNT_PRESETS = [5, 10, 15];

export default function SummaryPanel({
  baseTotal,
  finalTotal,
  maxTotal,
  multiplier,
  discountPct,
  onMultiplierChange,
  onDiscountChange,
  onReset,
}: Props) {
  const [copied, setCopied] = useState(false);
  const payTotal = finalTotal * (1 - discountPct / 100);

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
    <div className="summary-panel">
      <div className="total-card">
        <span className="total-label">Total a Pagar</span>
        <span className="total-value">{formatCLP(payTotal)}</span>
        <div className="total-breakdown">
          <span>Base: {formatCLP(baseTotal)}</span>
          <span>Máximo permitido (x{MAX_MULTIPLIER.toFixed(1)}): {formatCLP(maxTotal)}</span>
        </div>
      </div>

      <div className="quick-block">
        <span className="quick-label">Multiplicador de precio</span>
        <div className="chip-row">
          {MULTIPLIER_PRESETS.map((m) => (
            <button
              key={m}
              type="button"
              className={"chip" + (multiplier === m ? " chip-active" : "")}
              onClick={() => onMultiplierChange(m)}
            >
              x{m.toFixed(1)}
            </button>
          ))}
        </div>
        <input
          className="range-fine"
          type="range"
          min={1}
          max={MAX_MULTIPLIER}
          step={0.1}
          value={multiplier}
          onChange={(e) => onMultiplierChange(parseFloat(e.target.value))}
          aria-label="Ajuste fino de multiplicador"
        />
      </div>

      <div className="quick-block">
        <span className="quick-label">Descuento</span>
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

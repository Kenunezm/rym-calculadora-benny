import { useState } from "react";
import { MAX_MULTIPLIER } from "../data/prices";
import { formatCLP } from "../utils/format";

interface Props {
  baseTotal: number;
  finalTotal: number;
  maxTotal: number;
  multiplier: number;
  onMultiplierChange: (n: number) => void;
  onReset: () => void;
}

const DISCOUNT_PRESETS = [5, 10, 15];

export default function SummaryPanel({
  baseTotal,
  finalTotal,
  maxTotal,
  multiplier,
  onMultiplierChange,
  onReset,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(Math.round(finalTotal)));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="summary-panel">
      <div className="total-card">
        <span className="total-label">Total Final</span>
        <span className="total-value">{formatCLP(finalTotal)}</span>
        <span className="total-sub">Base: {formatCLP(baseTotal)}</span>
        <span className="total-sub">Máximo permitido (x{MAX_MULTIPLIER.toFixed(1)}): {formatCLP(maxTotal)}</span>
      </div>

      <div className="multiplier-box">
        <label htmlFor="multiplier-slider">
          Multiplicador de precio: <strong>x{multiplier.toFixed(1)}</strong>
        </label>
        <input
          id="multiplier-slider"
          type="range"
          min={1}
          max={MAX_MULTIPLIER}
          step={0.1}
          value={multiplier}
          onChange={(e) => onMultiplierChange(parseFloat(e.target.value))}
        />
      </div>

      <div className="action-buttons">
        <button type="button" className="btn-copy" onClick={handleCopy}>
          {copied ? "¡Copiado!" : "Copiar Monto"}
        </button>
        <button type="button" className="btn-reset" onClick={onReset}>
          Reiniciar
        </button>
      </div>

      <div className="discounts-table">
        <h3 className="panel-title">Descuentos Rápidos</h3>
        <table>
          <thead>
            <tr>
              <th>%</th>
              <th>Total</th>
              <th>A Pagar</th>
            </tr>
          </thead>
          <tbody>
            {DISCOUNT_PRESETS.map((pct) => (
              <tr key={pct}>
                <td>{pct}%</td>
                <td>{formatCLP(finalTotal)}</td>
                <td>{formatCLP(finalTotal * (1 - pct / 100))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

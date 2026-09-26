import { REPAIRS, type CategoryKey, COSMETICO, MANTENCION, RENDIMIENTO } from "../data/prices";
import { formatCLP } from "../utils/format";
import Stepper from "./Stepper";

interface Props {
  category: CategoryKey;
  qtyRendimiento: number;
  qtyCosmetico: number;
  qtyMantencion: number;
  qtyRepairs: Record<string, number>;
  onChangeRendimiento: (n: number) => void;
  onChangeCosmetico: (n: number) => void;
  onChangeMantencion: (n: number) => void;
  onChangeRepair: (key: string, n: number) => void;
}

export default function MainTable({
  category,
  qtyRendimiento,
  qtyCosmetico,
  qtyMantencion,
  qtyRepairs,
  onChangeRendimiento,
  onChangeCosmetico,
  onChangeMantencion,
  onChangeRepair,
}: Props) {
  const rendimientoPrice = RENDIMIENTO[category];
  const cosmeticoPrice = COSMETICO[category];
  const mantencionPrice = MANTENCION[category];

  return (
    <div className="parts-grid">
      <section className="parts-section">
        <h3 className="parts-section-title">Rendimiento</h3>
        <div className="part-card">
          <div className="part-info">
            <span className="part-name">Pieza de Rendimiento</span>
            <span className="part-unit-price">{formatCLP(rendimientoPrice)} c/u</span>
          </div>
          <Stepper value={qtyRendimiento} onChange={onChangeRendimiento} />
          <span className="part-subtotal">{formatCLP(rendimientoPrice * qtyRendimiento)}</span>
        </div>
      </section>

      <section className="parts-section">
        <h3 className="parts-section-title">Cosmético</h3>
        <div className="part-card">
          <div className="part-info">
            <span className="part-name">Pieza Cosmética</span>
            <span className="part-unit-price">{formatCLP(cosmeticoPrice)} c/u</span>
          </div>
          <Stepper value={qtyCosmetico} onChange={onChangeCosmetico} />
          <span className="part-subtotal">{formatCLP(cosmeticoPrice * qtyCosmetico)}</span>
        </div>
      </section>

      <section className="parts-section">
        <h3 className="parts-section-title">Mantención</h3>
        <div className="part-card">
          <div className="part-info">
            <span className="part-name">Pieza de Mantención</span>
            <span className="part-unit-price">{formatCLP(mantencionPrice)} c/u</span>
          </div>
          <Stepper value={qtyMantencion} onChange={onChangeMantencion} />
          <span className="part-subtotal">{formatCLP(mantencionPrice * qtyMantencion)}</span>
        </div>
      </section>

      <section className="parts-section">
        <h3 className="parts-section-title">Reparaciones y Kits</h3>
        {REPAIRS.map((r) => (
          <div className="part-card" key={r.key}>
            <div className="part-info">
              <span className="part-name">
                {r.label} <span className="payment-badge">{r.paymentMethod}</span>
              </span>
              <span className="part-unit-price">{formatCLP(r.price)} c/u</span>
            </div>
            <Stepper value={qtyRepairs[r.key] ?? 0} onChange={(n) => onChangeRepair(r.key, n)} />
            <span className="part-subtotal">{formatCLP(r.price * (qtyRepairs[r.key] ?? 0))}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

import { REPAIRS, type CategoryKey, COSMETICO, MANTENCION, RENDIMIENTO } from "../data/prices";
import { formatCLP } from "../utils/format";

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

function parseQty(raw: string): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 0) return 0;
  return n;
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
    <table className="main-table">
      <thead>
        <tr>
          <th>PIEZAS</th>
          <th>UNIDADES</th>
          <th>PRECIO</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr className="section-row">
          <td colSpan={4}>Rendimiento</td>
        </tr>
        <tr>
          <td>Pieza de Rendimiento</td>
          <td>
            <input
              type="number"
              min={0}
              value={qtyRendimiento}
              onChange={(e) => onChangeRendimiento(parseQty(e.target.value))}
            />
          </td>
          <td>{formatCLP(rendimientoPrice)}</td>
          <td>{formatCLP(rendimientoPrice * qtyRendimiento)}</td>
        </tr>

        <tr className="section-row">
          <td colSpan={4}>Cosmético</td>
        </tr>
        <tr>
          <td>Pieza Cosmética</td>
          <td>
            <input
              type="number"
              min={0}
              value={qtyCosmetico}
              onChange={(e) => onChangeCosmetico(parseQty(e.target.value))}
            />
          </td>
          <td>{formatCLP(cosmeticoPrice)}</td>
          <td>{formatCLP(cosmeticoPrice * qtyCosmetico)}</td>
        </tr>

        <tr className="section-row">
          <td colSpan={4}>Mantención</td>
        </tr>
        <tr>
          <td>Pieza de Mantención</td>
          <td>
            <input
              type="number"
              min={0}
              value={qtyMantencion}
              onChange={(e) => onChangeMantencion(parseQty(e.target.value))}
            />
          </td>
          <td>{formatCLP(mantencionPrice)}</td>
          <td>{formatCLP(mantencionPrice * qtyMantencion)}</td>
        </tr>

        <tr className="section-row">
          <td colSpan={4}>Reparaciones y Kits</td>
        </tr>
        {REPAIRS.map((r) => (
          <tr key={r.key}>
            <td>
              {r.label} <span className="payment-badge">{r.paymentMethod}</span>
            </td>
            <td>
              <input
                type="number"
                min={0}
                value={qtyRepairs[r.key] ?? 0}
                onChange={(e) => onChangeRepair(r.key, parseQty(e.target.value))}
              />
            </td>
            <td>{formatCLP(r.price)}</td>
            <td>{formatCLP(r.price * (qtyRepairs[r.key] ?? 0))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

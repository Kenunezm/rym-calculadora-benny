import { PRICE_GROUPS, getSalePrice } from "../data/prices";
import { formatCLP } from "../utils/format";
import Stepper from "./Stepper";

interface Props {
  quantities: Record<string, number>;
  onQuantityChange: (key: string, quantity: number) => void;
}

export default function MainTable({ quantities, onQuantityChange }: Props) {
  return (
    <div className="parts-grid">
      {PRICE_GROUPS.map((group) => (
        <section className="parts-section" key={group.key}>
          <h3 className="parts-section-title">
            {group.label}
            {group.maxTotal !== undefined && (
              <span className="group-limit"> Tope del grupo: {formatCLP(group.maxTotal)}</span>
            )}
          </h3>
          {group.items.map((item) => {
            const quantity = quantities[item.key] ?? 0;
            const salePrice = getSalePrice(item);
            const canSell = item.sellable;
            const purchaseLabel = item.purchasePrice === null ? "Compra no indicada" : `Compra ${formatCLP(item.purchasePrice)}`;
            const saleLabel = item.fixedSalePrice !== undefined
              ? `Venta fija ${formatCLP(item.fixedSalePrice)}`
              : item.maxMultiplier !== undefined
                ? `Venta máx. ${formatCLP(salePrice)} (x${item.maxMultiplier})`
                : item.note ?? "Venta sin definir";

            return (
              <div className="part-card" key={item.key}>
                <div className="part-info">
                  <span className="part-name">{item.label}</span>
                  <span className="part-unit-price">{purchaseLabel} · {saleLabel}</span>
                </div>
                {canSell ? (
                  <Stepper value={quantity} onChange={(n) => onQuantityChange(item.key, n)} />
                ) : (
                  <span className="payment-badge">{item.note ?? "Venta pendiente"}</span>
                )}
                <span className="part-subtotal">
                  {canSell ? formatCLP(salePrice * quantity) : "—"}
                </span>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}

import { PROMOTIONS, type CategoryKey } from "../data/prices";
import { formatCLP } from "../utils/format";

interface Props {
  category: CategoryKey;
  selected: Record<string, boolean>;
  onToggle: (key: string) => void;
}

export default function PromotionsPanel({ category, selected, onToggle }: Props) {
  return (
    <div className="promotions-panel">
      <h3 className="panel-title">Promociones</h3>
      {PROMOTIONS.map((promo) => {
        const isActive = !!selected[promo.key];
        const price = promo.prices[category];
        return (
          <div key={promo.key} className={"promo-card" + (isActive ? " active" : "")}>
            <div className="promo-header">
              <span className="promo-label">{promo.label}</span>
              <span className="promo-price">{formatCLP(price)}</span>
            </div>
            <p className="promo-description">{promo.description}</p>
            <button type="button" onClick={() => onToggle(promo.key)}>
              {isActive ? "✓ Agregado" : "Agregar"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

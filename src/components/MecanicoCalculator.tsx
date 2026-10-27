import { useState } from "react";
import { PRICE_GROUPS, getSalePrice } from "../data/prices";
import MainTable from "./MainTable";
import SummaryPanel from "./SummaryPanel";
import RulesPanel from "./RulesPanel";

function initialQuantities(): Record<string, number> {
  return Object.fromEntries(PRICE_GROUPS.flatMap((group) => group.items.map((item) => [item.key, 0])));
}

export default function MecanicoCalculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities);
  const [discountPct, setDiscountPct] = useState(0);

  const baseTotal = PRICE_GROUPS.reduce((total, group) =>
    total + group.items.reduce((groupTotal, item) =>
      groupTotal + (item.purchasePrice ?? 0) * (quantities[item.key] ?? 0), 0), 0);

  const finalTotal = PRICE_GROUPS.reduce((total, group) => {
    const groupSaleTotal = group.items.reduce((groupTotal, item) =>
      groupTotal + getSalePrice(item) * (quantities[item.key] ?? 0), 0);
    return total + (group.maxTotal === undefined ? groupSaleTotal : Math.min(groupSaleTotal, group.maxTotal));
  }, 0);

  const onReset = () => {
    setQuantities(initialQuantities());
    setDiscountPct(0);
  };

  return (
    <div className="app-body">
      <div className="app-main">
        <MainTable
          quantities={quantities}
          onQuantityChange={(key, quantity) => setQuantities((current) => ({ ...current, [key]: quantity }))}
        />
      </div>
      <div className="app-side">
        <SummaryPanel
          baseTotal={baseTotal}
          finalTotal={finalTotal}
          maxTotal={finalTotal}
          discountPct={discountPct}
          onDiscountChange={setDiscountPct}
          onReset={onReset}
        />
        <RulesPanel />
      </div>
    </div>
  );
}

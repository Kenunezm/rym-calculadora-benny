import { useState } from "react";
import "./App.css";
import {
  CATEGORIES,
  COSMETICO,
  MANTENCION,
  PROMOTIONS,
  RENDIMIENTO,
  REPAIRS,
  type CategoryKey,
} from "./data/prices";
import CategoryTabs from "./components/CategoryTabs";
import MainTable from "./components/MainTable";
import PromotionsPanel from "./components/PromotionsPanel";
import SummaryPanel from "./components/SummaryPanel";
import RulesPanel from "./components/RulesPanel";

const INITIAL_REPAIR_QTY = Object.fromEntries(REPAIRS.map((r) => [r.key, 0]));

function initialState() {
  return {
    category: "compacto" as CategoryKey,
    qtyRendimiento: 0,
    qtyCosmetico: 0,
    qtyMantencion: 0,
    qtyRepairs: { ...INITIAL_REPAIR_QTY },
    selectedPromos: {} as Record<string, boolean>,
    multiplier: 1,
  };
}

function App() {
  const [state, setState] = useState(initialState);

  const rendimientoTotal = RENDIMIENTO[state.category] * state.qtyRendimiento;
  const cosmeticoTotal = COSMETICO[state.category] * state.qtyCosmetico;
  const mantencionTotal = MANTENCION[state.category] * state.qtyMantencion;
  const repairsTotal = REPAIRS.reduce(
    (sum, r) => sum + r.price * (state.qtyRepairs[r.key] ?? 0),
    0
  );
  const promosTotal = PROMOTIONS.reduce(
    (sum, p) => sum + (state.selectedPromos[p.key] ? p.prices[state.category] : 0),
    0
  );

  const baseTotal = rendimientoTotal + cosmeticoTotal + mantencionTotal + repairsTotal + promosTotal;
  const finalTotal = baseTotal * state.multiplier;
  const maxTotal = baseTotal * 3;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calculadora Benny's — RYM</h1>
        <p className="subtitle">Herramienta de cálculo para mecánicos</p>
      </header>

      <CategoryTabs
        categories={CATEGORIES}
        selected={state.category}
        onSelect={(category) => setState((s) => ({ ...s, category }))}
      />

      <div className="app-body">
        <div className="app-main">
          <MainTable
            category={state.category}
            qtyRendimiento={state.qtyRendimiento}
            qtyCosmetico={state.qtyCosmetico}
            qtyMantencion={state.qtyMantencion}
            qtyRepairs={state.qtyRepairs}
            onChangeRendimiento={(n) => setState((s) => ({ ...s, qtyRendimiento: n }))}
            onChangeCosmetico={(n) => setState((s) => ({ ...s, qtyCosmetico: n }))}
            onChangeMantencion={(n) => setState((s) => ({ ...s, qtyMantencion: n }))}
            onChangeRepair={(key, n) =>
              setState((s) => ({ ...s, qtyRepairs: { ...s.qtyRepairs, [key]: n } }))
            }
          />
        </div>

        <div className="app-side">
          <SummaryPanel
            baseTotal={baseTotal}
            finalTotal={finalTotal}
            maxTotal={maxTotal}
            multiplier={state.multiplier}
            onMultiplierChange={(multiplier) => setState((s) => ({ ...s, multiplier }))}
            onReset={() => setState(initialState())}
          />
          <PromotionsPanel
            category={state.category}
            selected={state.selectedPromos}
            onToggle={(key) =>
              setState((s) => ({
                ...s,
                selectedPromos: { ...s.selectedPromos, [key]: !s.selectedPromos[key] },
              }))
            }
          />
          <RulesPanel />
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import MecanicoCalculator from "./components/MecanicoCalculator";
import DinerCalculator from "./components/DinerCalculator";

type Tab = "mecanico" | "diner";

const TABS: { key: Tab; label: string; title: string; subtitle: string }[] = [
  {
    key: "mecanico",
    label: "🔧 Benny's Motors",
    title: "Benny's Motors",
    subtitle: "Calculadora de mecánico — un par de clicks y listo",
  },
  {
    key: "diner",
    label: "🍔 Diner",
    title: "Diner",
    subtitle: "Calculadora de fuente de soda — un par de clicks y listo",
  },
];

function App() {
  const [tab, setTab] = useState<Tab>("mecanico");
  const current = TABS.find((t) => t.key === tab)!;

  return (
    <div className="app">
      <header className="app-header">
        <span className="brand-badge">Yakuza</span>
        <h1>{current.title}</h1>
        <p className="subtitle">{current.subtitle}</p>
      </header>

      <div className="top-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={"top-tab" + (t.key === tab ? " active" : "")}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "mecanico" ? <MecanicoCalculator /> : <DinerCalculator />}
    </div>
  );
}

export default App;

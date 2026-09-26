export default function RulesPanel() {
  return (
    <div className="rules-panel">
      <h3 className="panel-title">Reglamento de Precios</h3>
      <ol>
        <li>El monto "TOTAL FINAL" es el valor que debe cobrarse al cliente.</li>
        <li>
          No se puede cobrar más del <strong>x3.0</strong> del precio base estimado por el owner
          (ver "Máximo permitido").
        </li>
        <li>Se pueden abaratar costos libremente, siempre por convenio o precio mecánico.</li>
        <li>
          Las reparaciones dentro/fuera de taller se cobran en Efectivo/Transferencia; el Kit de
          Reparación se cobra vía Tablet Factura.
        </li>
      </ol>
    </div>
  );
}

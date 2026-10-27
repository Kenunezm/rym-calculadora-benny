export default function RulesPanel() {
  return (
    <div className="rules-panel">
      <h3 className="panel-title">Reglamento de Precios</h3>
      <ol>
        <li>El total se calcula usando el precio de venta indicado para cada artículo.</li>
        <li>Los artículos con tope x2 o x3 respetan ese multiplicador individual.</li>
        <li>Los descuentos se aplican al total de venta calculado.</li>
        <li>Los artículos marcados como «No venta» o «Venta pendiente de definir» no se suman al total.</li>
        <li>Los topes de mantención se aplican al total de venta del grupo correspondiente.</li>
      </ol>
    </div>
  );
}

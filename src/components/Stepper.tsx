interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  step?: number;
}

export default function Stepper({ value, onChange, min = 0, step = 1 }: Props) {
  return (
    <div className="stepper">
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        aria-label="Restar"
      >
        –
      </button>
      <span className="stepper-value">{value}</span>
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(value + step)}
        aria-label="Sumar"
      >
        +
      </button>
    </div>
  );
}

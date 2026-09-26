import type { CategoryInfo, CategoryKey } from "../data/prices";

interface Props {
  categories: CategoryInfo[];
  selected: CategoryKey;
  onSelect: (key: CategoryKey) => void;
}

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <div className="category-tabs">
      {categories.map((c) => (
        <button
          key={c.key}
          className={"category-tab" + (c.key === selected ? " active" : "")}
          onClick={() => onSelect(c.key)}
          type="button"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

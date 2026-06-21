export default function ChipList({ items = [], tone = "accent" }) {
  const toneClasses =
    tone === "accent"
      ? "bg-accent/10 text-accent border-accent/30"
      : "bg-accent2/10 text-accent2 border-accent2/30";
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`px-3 py-1.5 rounded-full border text-sm font-medium ${toneClasses}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

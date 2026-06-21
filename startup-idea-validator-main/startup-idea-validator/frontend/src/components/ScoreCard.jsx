const competitionColor = {
  Low: "text-accent2",
  Medium: "text-warn",
  High: "text-danger",
};

export default function ScoreCard({ score }) {
  const items = [
    { label: "Market", value: score.market, suffix: "/10" },
    { label: "Feasibility", value: score.feasibility, suffix: "/10" },
    { label: "Innovation", value: score.innovation, suffix: "/10" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.label} className="bg-surface border border-border rounded-xl px-4 py-4">
          <p className="text-xs text-muted mb-1">{it.label}</p>
          <p className="font-mono text-2xl font-bold">
            {it.value}
            <span className="text-sm text-muted">{it.suffix}</span>
          </p>
        </div>
      ))}
      <div className="bg-surface border border-border rounded-xl px-4 py-4">
        <p className="text-xs text-muted mb-1">Competition</p>
        <p className={`font-mono text-2xl font-bold ${competitionColor[score.competition] || "text-text"}`}>
          {score.competition}
        </p>
      </div>
    </div>
  );
}

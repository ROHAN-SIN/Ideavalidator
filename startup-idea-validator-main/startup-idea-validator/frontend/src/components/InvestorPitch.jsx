const FIELDS = [
  ["problem", "Problem"],
  ["solution", "Solution"],
  ["marketSize", "Market size"],
  ["revenueModel", "Revenue model"],
  ["whyNow", "Why now"],
];

export default function InvestorPitch({ pitch = {} }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      {FIELDS.map(([key, label]) => (
        <div key={key}>
          <p className="eyebrow text-accent mb-1">{label}</p>
          <p className="text-sm text-text/90 leading-relaxed">{pitch[key]}</p>
        </div>
      ))}
    </div>
  );
}

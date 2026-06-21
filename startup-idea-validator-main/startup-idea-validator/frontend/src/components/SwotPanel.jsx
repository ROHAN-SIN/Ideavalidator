const QUADS = [
  { key: "strengths", label: "Strengths", color: "border-accent2/40", dot: "bg-accent2" },
  { key: "weaknesses", label: "Weaknesses", color: "border-danger/40", dot: "bg-danger" },
  { key: "opportunities", label: "Opportunities", color: "border-accent/40", dot: "bg-accent" },
  { key: "threats", label: "Threats", color: "border-warn/40", dot: "bg-warn" },
];

export default function SwotPanel({ swot }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {QUADS.map((q) => (
        <div key={q.key} className={`bg-surface border ${q.color} rounded-xl p-5`}>
          <p className="font-display font-semibold mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${q.dot}`} />
            {q.label}
          </p>
          <ul className="space-y-2">
            {(swot[q.key] || []).map((item, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                <span className="text-text/30">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

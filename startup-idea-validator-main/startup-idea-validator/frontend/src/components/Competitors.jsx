export default function Competitors({ competitors = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface2 text-left text-muted">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Strength</th>
            <th className="px-4 py-3 font-medium">Weakness</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((c, i) => (
            <tr key={i} className="border-t border-border bg-surface">
              <td className="px-4 py-3 font-medium">{c.name}</td>
              <td className="px-4 py-3 text-accent2">{c.strength}</td>
              <td className="px-4 py-3 text-danger/90">{c.weakness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

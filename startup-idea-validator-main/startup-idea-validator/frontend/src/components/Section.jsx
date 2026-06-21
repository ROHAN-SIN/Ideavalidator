export default function Section({ number, title, children }) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        {number && <span className="font-mono text-xs text-muted">{number}</span>}
        <h2 className="font-display font-semibold text-xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

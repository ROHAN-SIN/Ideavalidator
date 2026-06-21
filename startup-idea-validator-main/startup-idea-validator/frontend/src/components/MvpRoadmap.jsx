export default function MvpRoadmap({ roadmap = [] }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
      <div className="space-y-6">
        {roadmap.map((step, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-surface border-2 border-accent flex items-center justify-center text-[10px] font-mono font-bold text-accent">
              {i + 1}
            </span>
            <p className="font-mono text-xs text-accent2 mb-1">{step.week}</p>
            <p className="text-sm text-text/90">{step.task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

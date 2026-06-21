/**
 * The "signature" visual: a judge's dial. Needle position = average of
 * market / feasibility / innovation scores (each out of 10).
 */
export default function VerdictGauge({ market = 0, feasibility = 0, innovation = 0 }) {
  const avg = (Number(market) + Number(feasibility) + Number(innovation)) / 3;
  const pct = Math.max(0, Math.min(10, avg)) / 10; // 0..1
  const angle = -90 + pct * 180; // -90deg (left) to +90deg (right)

  const verdict =
    avg >= 8 ? "Strong bet" : avg >= 6.5 ? "Worth pursuing" : avg >= 5 ? "Needs work" : "High risk";
  const color = avg >= 8 ? "#2DD4BF" : avg >= 6.5 ? "#7C5CFF" : avg >= 5 ? "#F59E0B" : "#FB7185";

  // Arc geometry
  const cx = 150;
  const cy = 150;
  const r = 110;
  const polarToCartesian = (deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const start = polarToCartesian(-90);
  const end = polarToCartesian(90);
  const needleEnd = polarToCartesian(angle);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 300 175" className="w-full max-w-[300px]">
        {/* track */}
        <path
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`}
          fill="none"
          stroke="#232B40"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* colored progress */}
        <path
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${needleEnd.x} ${needleEnd.y}`}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke="#E8EAF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="7" fill="#E8EAF0" />
        <text x={cx} y={cy - 28} textAnchor="middle" className="fill-text font-mono" fontSize="34" fontWeight="700">
          {avg.toFixed(1)}
        </text>
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-muted" fontSize="11">
          out of 10
        </text>
      </svg>
      <p className="font-display font-semibold text-lg" style={{ color }}>
        {verdict}
      </p>
    </div>
  );
}

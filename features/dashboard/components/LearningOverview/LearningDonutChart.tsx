const chartSegments = [
  { color: "#8b5cf6", value: 49 },
  { color: "#34d399", value: 23 },
  { color: "#f59e0b", value: 18 },
  { color: "#3b82f6", value: 10 },
];

const radius = 56;
const circumference = 2 * Math.PI * radius;

export default function LearningDonutChart() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative size-52">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
          />

          {chartSegments.map((segment, index) => {
            const previousValue = chartSegments
              .slice(0, index)
              .reduce((sum, item) => sum + item.value, 0);

            const segmentLength = (segment.value / 100) * circumference;
            const offset = -(previousValue / 100) * circumference;

            return (
              <circle
                key={segment.color}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="18"
                strokeDasharray={`${segmentLength} ${
                  circumference - segmentLength
                }`}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">18h 45m</span>
          <span className="text-xs text-slate-400">This week</span>
        </div>
      </div>
    </div>
  );
}

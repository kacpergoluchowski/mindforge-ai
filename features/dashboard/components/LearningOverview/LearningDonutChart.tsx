import TranslatedText from "@/components/shared/TranslatedText";
import type { LearningCategory } from "../../types/dashboard.types";

type LearningDonutChartProps = {
  categories: LearningCategory[];
  totalLabel: string;
};

const colorMap: Record<LearningCategory["color"], string> = {
  blue: "#3b82f6",
  emerald: "#34d399",
  orange: "#f59e0b",
  violet: "#8b5cf6",
};

const radius = 56;
const circumference = 2 * Math.PI * radius;

export default function LearningDonutChart({
  categories,
  totalLabel,
}: LearningDonutChartProps) {
  const chartSegments = categories.length
    ? categories.map((category) => ({
        color: colorMap[category.color],
        value: category.percentage,
      }))
    : [{ color: "#334155", value: 100 }];
  const positionedSegments = chartSegments.map((segment, index) => {
    const previousValue = chartSegments
      .slice(0, index)
      .reduce((sum, item) => sum + item.value, 0);

    return {
      ...segment,
      offset: -(previousValue / 100) * circumference,
      segmentLength: (segment.value / 100) * circumference,
    };
  });

  return (
    <div className="flex items-center justify-center">
      <div className="relative size-44 sm:size-48 2xl:size-52">
        <svg
          aria-hidden="true"
          viewBox="0 0 160 160"
          className="size-full -rotate-90"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
          />

          {positionedSegments.map((segment, index) => (
            <circle
              key={`${segment.color}-${index}`}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${segment.segmentLength} ${
                circumference - segment.segmentLength
              }`}
              strokeDashoffset={segment.offset}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">{totalLabel}</span>
          <span className="text-xs text-slate-400">
            <TranslatedText
              fallback="This week"
              translationKey="dashboard.thisWeek"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

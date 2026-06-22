import { BarChart3, Clock3 } from "lucide-react";
import type { ContinueLearningCardProps } from "../types/courses.types";

const colorStyles = {
  blue: {
    icon: "text-sky-400",
    glow: "bg-sky-500/10",
    progress: "bg-violet-500",
  },
  green: {
    icon: "text-emerald-400",
    glow: "bg-emerald-500/10",
    progress: "bg-violet-500",
  },
  violet: {
    icon: "text-violet-400",
    glow: "bg-violet-500/10",
    progress: "bg-violet-500",
  },
} as const;

export default function ContinueLearningCard({
  title,
  instructor,
  progress,
  duration,
  level,
  status,
  icon: Icon,
  color,
}: ContinueLearningCardProps) {
  const styles = colorStyles[color];

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 transition hover:border-white/20 hover:bg-[#131f35]">
      <div className={`relative flex h-36 items-center justify-center ${styles.glow}`}>
        <span className="absolute right-3 top-3 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          {status}
        </span>

        <Icon className={`size-20 ${styles.icon}`} />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 min-h-10 text-base font-semibold leading-5 text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-400">{instructor}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${styles.progress}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-sm text-slate-300">{progress}%</span>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock3 className="size-4" />
            {duration}
          </div>

          <div className="flex items-center gap-1.5">
            <BarChart3 className="size-4" />
            {level}
          </div>
        </div>
      </div>
    </article>
  );
}
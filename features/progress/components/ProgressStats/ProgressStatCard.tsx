import clsx from "clsx";

import type {
  ProgressStat,
  ProgressStatColor,
} from "../../types/progress.types";

type ProgressStatCardProps = Omit<ProgressStat, "id">;

type ProgressStatColorStyle = {
  icon: string;
  background: string;
  subtitle: string;
};

const colorStyles: Record<ProgressStatColor, ProgressStatColorStyle> = {
  violet: {
    icon: "text-violet-400",
    background: "bg-violet-500/10",
    subtitle: "text-emerald-400",
  },

  emerald: {
    icon: "text-emerald-400",
    background: "bg-emerald-500/10",
    subtitle: "text-slate-400",
  },

  orange: {
    icon: "text-orange-400",
    background: "bg-orange-500/10",
    subtitle: "text-orange-400",
  },

  blue: {
    icon: "text-sky-400",
    background: "bg-sky-500/10",
    subtitle: "text-sky-400",
  },
};

export default function ProgressStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  progress,
}: ProgressStatCardProps) {
  const styles = colorStyles[color];
  const normalizedProgress =
    progress === undefined ? undefined : Math.min(Math.max(progress, 0), 100);

  return (
    <article className="min-w-0 rounded-3xl border border-white/10 bg-[#111a2d]/80 p-4 transition-colors hover:border-violet-400/25 sm:p-5">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={clsx(
            "flex size-10 shrink-0 items-center justify-center rounded-2xl sm:size-11",
            styles.background
          )}
        >
          <Icon
            aria-hidden="true"
            className={clsx("size-5", styles.icon)}
          />
        </div>

        <p className="min-w-0 truncate text-sm text-slate-400">
          {title}
        </p>
      </div>

      <p className="mt-5 truncate text-3xl font-bold leading-tight text-white">
        {value}
      </p>

      <p
        className={clsx(
          "mt-2 line-clamp-2 text-sm leading-snug",
          styles.subtitle
        )}
      >
        {subtitle}
      </p>

      {normalizedProgress !== undefined && (
        <div className="mt-5">
          <div
            aria-label={`${Math.round(normalizedProgress)}%`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={Math.round(normalizedProgress)}
            className="h-2 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
          >
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${normalizedProgress}%` }}
            />
          </div>
        </div>
      )}
    </article>
  );
}

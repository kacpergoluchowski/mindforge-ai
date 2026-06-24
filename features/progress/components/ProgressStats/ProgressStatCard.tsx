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
    <article className="rounded-3xl border border-white/10 bg-[#111a2d]/80 px-6 py-4">
      <div
        className={clsx(
          "mb-3 flex size-12 items-center justify-center rounded-2xl",
          styles.background
        )}
      >
        <Icon className={clsx("size-5", styles.icon)} />
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-3 text-4xl font-bold text-white">{value}</h3>

      <p className={clsx("mt-2 text-sm", styles.subtitle)}>{subtitle}</p>

      {normalizedProgress !== undefined && (
        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
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

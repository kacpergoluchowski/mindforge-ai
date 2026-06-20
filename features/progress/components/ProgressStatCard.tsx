import type { LucideIcon } from "lucide-react";

type ProgressStatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: "violet" | "emerald" | "orange" | "blue";
  progress?: number;
};

const colorStyles = {
  violet: {
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    subtitle: "text-emerald-400",
  },

  emerald: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10",
    subtitle: "text-slate-400",
  },

  orange: {
    icon: "text-orange-400",
    bg: "bg-orange-500/10",
    subtitle: "text-orange-400",
  },

  blue: {
    icon: "text-sky-400",
    bg: "bg-sky-500/10",
    subtitle: "text-sky-400",
  },
} as const;

export default function ProgressStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  progress,
}: ProgressStatCardProps) {
  const styles = colorStyles[color];

  return (
    <article className="rounded-3xl border border-white/10 bg-[#111a2d]/80 px-6 py-4">
      <div
        className={`mb-3 flex size-12 items-center justify-center rounded-2xl ${styles.bg}`}
      >
        <Icon className={`size-5 ${styles.icon}`} />
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-3 text-4xl font-bold text-white">
        {value}
      </h3>

      <p className={`mt-2 text-sm ${styles.subtitle}`}>
        {subtitle}
      </p>

      {progress && (
        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </article>
  );
}
import clsx from "clsx";

import type {
  ProfileStat,
  ProfileStatColor,
} from "../../types/profile.types";

type ProfileStatCardProps = ProfileStat;

const progressStyles: Record<ProfileStatColor, string> = {
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  orange: "bg-orange-500",
};

export default function ProfileStatCard({
  title,
  subtitle,
  icon: Icon,
  progress,
  color,
}: ProfileStatCardProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/40 p-5">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/5">
        <Icon className="size-6 text-white" />
      </div>

      <h3 className="text-4xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={clsx(
            "h-full rounded-full",
            progressStyles[color]
          )}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </article>
  );
}

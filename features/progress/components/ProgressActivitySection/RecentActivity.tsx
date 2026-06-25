import clsx from "clsx";

import type {
  RecentActivityColor,
  RecentActivityItem,
} from "../../types/progress.types";

type ActivityItemProps = Omit<RecentActivityItem, "id">;

const colorStyles: Record<RecentActivityColor, string> = {
  violet: "bg-violet-500/10 text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
};

function ActivityItem({
  title,
  description,
  xp,
  icon: Icon,
  color,
}: ActivityItemProps) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            colorStyles[color]
          )}
        >
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-5 text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-400">{description}</p>

          <span className="mt-2 inline-block text-xs font-semibold text-emerald-400 sm:hidden">
            {xp}
          </span>
        </div>

        <span className="hidden shrink-0 text-xs font-semibold text-emerald-400 sm:block">
          {xp}
        </span>
      </div>
    </div>
  );
}

type RecentActivityProps = {
  activities: RecentActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section className="w-full rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 xl:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>

        <button
          type="button"
          className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          View all
        </button>
      </div>

      {activities.length ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          No activity yet.
        </div>
      )}
    </section>
  );
}

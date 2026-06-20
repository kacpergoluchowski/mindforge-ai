import type { LucideIcon } from "lucide-react";

import { recentActivityData } from "../data/progressData";

type ActivityItemProps = {
  title: string;
  description: string;
  xp: string;
  icon: LucideIcon;
  color: "violet" | "emerald" | "yellow";
};

const colorStyles = {
  violet: "bg-violet-500/10 text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
} as const;

function ActivityItem({
  title,
  description,
  xp,
  icon: Icon,
  color,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${colorStyles[color]}`}
      >
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <span className="shrink-0 text-sm font-semibold text-emerald-400">
        {xp}
      </span>
    </div>
  );
}

export default function RecentActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>

        <button className="text-sm font-medium text-violet-400 transition hover:text-violet-300">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {recentActivityData.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </section>
  );
}
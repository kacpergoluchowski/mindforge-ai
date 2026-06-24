import type { StatsCardItem } from "../../types/dashboard.types";

type StatsCardProps = {
  stat: StatsCardItem;
};

export default function StatsCard({ stat }: StatsCardProps) {
  const Icon = stat.icon;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 lg:py-4">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20">
          <Icon className="size-7 text-violet-400" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm text-slate-400">{stat.title}</p>

          <h3 className="mt-1 text-lg font-bold text-white">{stat.value}</h3>

          <p className="text-sm text-emerald-400">{stat.change}</p>
        </div>
      </div>
    </article>
  );
}

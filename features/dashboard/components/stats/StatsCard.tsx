import type { StatsCardItem } from "../../types/dashboard.types";

type StatsCardProps = {
  stat: StatsCardItem;
};

export default function StatsCard({ stat }: StatsCardProps) {
  const Icon = stat.icon;

  return (
    <article className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/15 sm:px-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-400/15 sm:size-14">
          <Icon aria-hidden="true" className="size-6 text-violet-400 sm:size-7" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-slate-400">{stat.title}</p>

          <p className="mt-1 truncate text-xl font-bold leading-tight text-white">
            {stat.value}
          </p>

          <p className="truncate text-sm text-emerald-400">{stat.change}</p>
        </div>
      </div>
    </article>
  );
}

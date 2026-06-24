import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { ChallengeStatCardProps } from "../../types/challenges.types";

type StatColor = ChallengeStatCardProps["color"];
type StatTrend = ChallengeStatCardProps["trend"];

const colorStyles: Record<StatColor, string> = {
  violet: "bg-violet-500/10 text-violet-400",
  orange: "bg-orange-500/10 text-orange-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
};

const trendStyles: Record<StatTrend, string> = {
  up: "text-emerald-400",
  down: "text-red-400",
};

export default function ChallengeStatCard({
  title,
  value,
  change,
  trend,
  icon,
  color,
}: ChallengeStatCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-white/20 hover:bg-[#131f35]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h3 className="mt-3 text-2xl font-bold text-white">{value}</h3>

          <StatTrend trend={trend} value={change} />
        </div>

        <StatIcon color={color} icon={icon} />
      </div>
    </article>
  );
}

type StatTrendProps = {
  trend: StatTrend;
  value: string;
};

function StatTrend({ trend, value }: StatTrendProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="mt-3 flex items-center gap-1 text-sm">
      <TrendIcon className={clsx("size-4", trendStyles[trend])} />
      <span className={clsx("font-medium", trendStyles[trend])}>{value}</span>
      <span className="text-slate-500">this month</span>
    </div>
  );
}

type StatIconProps = {
  color: StatColor;
  icon: ChallengeStatCardProps["icon"];
};

function StatIcon({ color, icon: Icon }: StatIconProps) {
  return (
    <div
      className={clsx(
        "flex size-12 shrink-0 items-center justify-center rounded-xl",
        colorStyles[color]
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}

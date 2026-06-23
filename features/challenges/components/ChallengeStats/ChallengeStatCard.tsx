import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type ChallengeStatCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "violet" | "orange" | "yellow" | "emerald";
};

const colorStyles = {
  violet: "bg-violet-500/10 text-violet-400",
  orange: "bg-orange-500/10 text-orange-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
} as const;

export default function ChallengeStatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: ChallengeStatCardProps) {
  const isPositive = trend === "up";

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-white/20 hover:bg-[#131f35]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h3 className="mt-3 text-2xl font-bold text-white">{value}</h3>

          <div className="mt-3 flex items-center gap-1 text-sm">
            {isPositive ? (
              <>
                <ArrowUpRight className="size-4 text-emerald-400" />
                <span className="font-medium text-emerald-400">{change}</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="size-4 text-red-400" />
                <span className="font-medium text-red-400">{change}</span>
              </>
            )}

            <span className="text-slate-500">this month</span>
          </div>
        </div>

        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${colorStyles[color]}`}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </article>
  );
}
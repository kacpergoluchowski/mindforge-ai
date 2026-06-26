import clsx from "clsx";

import type {
  LearningInsightColor,
  LearningInsightItem,
} from "../../types/progress.types";

type InsightItemProps = Omit<LearningInsightItem, "id">;

const colorStyles: Record<LearningInsightColor, string> = {
  blue: "bg-sky-500/10 text-sky-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  violet: "bg-violet-500/10 text-violet-400",
};

function InsightItem({
  title,
  description,
  icon: Icon,
  color,
}: InsightItemProps) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white/[0.03] p-4">
      <div
        className={clsx(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          colorStyles[color]
        )}
      >
        <Icon className="size-5" />
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
    </div>
  );
}

type LearningInsightsProps = {
  insights: LearningInsightItem[];
};

export default function LearningInsights({ insights }: LearningInsightsProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Learning Insights</h2>

        <p className="mt-1 text-sm text-slate-400">
          AI-powered recommendations based on your progress.
        </p>
      </div>

      {insights.length ? (
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightItem key={insight.id} {...insight} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          Complete lessons to generate learning insights.
        </div>
      )}
    </section>
  );
}

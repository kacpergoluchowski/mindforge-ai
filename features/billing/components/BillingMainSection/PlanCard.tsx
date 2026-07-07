import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import type { BillingPlan } from "../../types/billing.types";

type PlanCardProps = {
  current: boolean;
  plan: BillingPlan;
};

export default function PlanCard({ current, plan }: PlanCardProps) {
  const Icon = plan.icon;

  return (
    <article
      className={clsx(
        "relative flex min-h-full flex-col overflow-hidden rounded-3xl border bg-[#111a2d]/80 p-5 transition sm:p-6",
        plan.highlighted
          ? "border-violet-400/50 shadow-2xl shadow-violet-950/20"
          : "border-white/10 hover:border-violet-400/25"
      )}
    >
      {plan.highlighted ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-violet-400" />
      ) : null}

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold text-white">
              <TranslatedText
                fallback={plan.nameFallback}
                translationKey={plan.nameKey}
              />
            </h2>

            {plan.badgeKey ? (
              <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-200">
                <TranslatedText
                  fallback={plan.badgeFallback ?? ""}
                  translationKey={plan.badgeKey}
                />
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback={plan.descriptionFallback}
              translationKey={plan.descriptionKey}
            />
          </p>
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <Icon className="size-5" />
        </div>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        <span className="ml-2 text-sm text-slate-400">
          <TranslatedText fallback="/ month" translationKey="billing.perMonth" />
        </span>
      </div>

      <div className="space-y-3">
        {plan.features.map((feature) => (
          <div
            key={feature.translationKey}
            className="flex gap-3 text-sm text-slate-300"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span>
              <TranslatedText
                fallback={feature.fallback}
                translationKey={feature.translationKey}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
        {plan.limits.map((limit) => (
          <div
            key={limit.labelKey}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="text-slate-400">
              <TranslatedText
                fallback={limit.labelFallback}
                translationKey={limit.labelKey}
              />
            </span>
            <span className="font-semibold text-white">
              <TranslatedText
                fallback={limit.valueFallback}
                translationKey={limit.valueKey}
              />
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={current}
        className={clsx(
          "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70",
          current
            ? "cursor-default border border-white/10 bg-white/[0.03] text-slate-400"
            : "bg-violet-500 text-white hover:bg-violet-600"
        )}
      >
        {current ? (
          <TranslatedText
            fallback="Current plan"
            translationKey="billing.currentPlan"
          />
        ) : (
          <TranslatedText
            fallback="Choose plan"
            translationKey="billing.choosePlan"
          />
        )}
      </button>
    </article>
  );
}

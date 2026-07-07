import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import TranslatedText from "@/components/shared/TranslatedText";
import { billingPlans } from "../../data/billingData";
import type { BillingPlanId } from "../../types/billing.types";

type BillingHeroProps = {
  currentPlan: BillingPlanId;
};

export default function BillingHero({ currentPlan }: BillingHeroProps) {
  const currentPlanData =
    billingPlans.find((plan) => plan.id === currentPlan) ?? billingPlans[0];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
        <div className="min-w-0 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <CreditCard className="size-3.5" />
            <TranslatedText fallback="Billing" translationKey="billing.title" />
          </span>

          <h1 className="mt-5 max-w-2xl break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            <TranslatedText
              fallback="Manage your plan and AI limits."
              translationKey="billing.heroTitle"
            />
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            <TranslatedText
              fallback="Control your plan, monthly AI usage and future subscription options from one clean place."
              translationKey="billing.subtitle"
            />
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <HeroMetric
            icon={<Sparkles className="size-5" />}
            label={
              <TranslatedText
                fallback="Current plan"
                translationKey="billing.currentPlan"
              />
            }
            value={
              <TranslatedText
                fallback={currentPlanData.nameFallback}
                translationKey={currentPlanData.nameKey}
              />
            }
          />
          <HeroMetric
            icon={<ShieldCheck className="size-5" />}
            label={
              <TranslatedText
                fallback="Billing status"
                translationKey="billing.metrics.billingStatus"
              />
            }
            value={
              <TranslatedText
                fallback="Active"
                translationKey="billing.metrics.active"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

type HeroMetricProps = {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
};

function HeroMetric({ icon, label, value }: HeroMetricProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220]/60 p-4 backdrop-blur">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-slate-400">{label}</p>
        <p className="mt-1 truncate text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

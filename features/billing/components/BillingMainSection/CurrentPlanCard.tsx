import { CreditCard, Crown, Rocket, Zap } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { billingPlans } from "../../data/billingData";
import type { BillingPlanId } from "../../types/billing.types";
import BillingMetricCard from "./BillingMetricCard";

type CurrentPlanCardProps = {
  currentPlan: BillingPlanId;
};

export default function CurrentPlanCard({ currentPlan }: CurrentPlanCardProps) {
  const currentPlanData =
    billingPlans.find((plan) => plan.id === currentPlan) ?? billingPlans[0];

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
      <div className="border-b border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-violet-300">
              <TranslatedText
                fallback="Current plan"
                translationKey="billing.currentPlan"
              />
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              <TranslatedText
                fallback={currentPlanData.nameFallback}
                translationKey={currentPlanData.nameKey}
              />
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              <TranslatedText
                fallback={currentPlanData.descriptionFallback}
                translationKey={currentPlanData.descriptionKey}
              />
            </p>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
            <Crown className="size-7" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-3">
        <BillingMetricCard
          icon={Zap}
          labelKey="billing.metrics.aiAccess"
          labelFallback="AI access"
          valueKey="billing.metrics.active"
          valueFallback="Active"
        />
        <BillingMetricCard
          icon={Rocket}
          labelKey="billing.metrics.learning"
          labelFallback="Learning"
          valueKey="billing.metrics.unlocked"
          valueFallback="Unlocked"
        />
        <BillingMetricCard
          icon={CreditCard}
          labelKey="billing.metrics.paymentMethod"
          labelFallback="Payment method"
          valueKey="billing.metrics.noCard"
          valueFallback="No card"
        />
      </div>
    </section>
  );
}

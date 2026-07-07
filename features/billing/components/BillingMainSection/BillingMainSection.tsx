import { billingInfoItems, billingPlans } from "../../data/billingData";
import { normalizePlan } from "../../utils/billingUtils";
import BillingHero from "./BillingHero";
import CurrentPlanCard from "./CurrentPlanCard";
import InfoCard from "./InfoCard";
import PlanCard from "./PlanCard";
import UsageCard from "./UsageCard";

type BillingMainSectionProps = {
  currentPlan: string;
};

export default function BillingMainSection({
  currentPlan,
}: BillingMainSectionProps) {
  const normalizedCurrentPlan = normalizePlan(currentPlan);

  return (
    <div className="min-w-0 space-y-6 pb-24 xl:pb-8">
      <BillingHero currentPlan={normalizedCurrentPlan} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <CurrentPlanCard currentPlan={normalizedCurrentPlan} />
        <UsageCard />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {billingPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            current={plan.id === normalizedCurrentPlan}
            plan={plan}
          />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {billingInfoItems.map((item) => (
          <InfoCard key={item.titleKey} item={item} />
        ))}
      </section>
    </div>
  );
}

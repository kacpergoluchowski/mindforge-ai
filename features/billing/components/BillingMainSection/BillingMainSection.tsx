import clsx from "clsx";
import {
  Bot,
  CheckCircle2,
  Code2,
  CreditCard,
  Crown,
  Gauge,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";

type BillingMainSectionProps = {
  currentPlan: string;
};

type BillingPlan = {
  id: "free" | "pro" | "premium";
  nameKey: string;
  nameFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  price: string;
  badgeKey?: string;
  badgeFallback?: string;
  features: Array<{
    key: string;
    fallback: string;
  }>;
  limits: Array<{
    labelKey: string;
    labelFallback: string;
    valueKey: string;
    valueFallback: string;
  }>;
  highlighted?: boolean;
};

const plans: BillingPlan[] = [
  {
    id: "free",
    nameKey: "billing.plans.free.name",
    nameFallback: "Free",
    descriptionKey: "billing.plans.free.description",
    descriptionFallback: "Start learning and test the core platform.",
    price: "0 PLN",
    features: [
      {
        key: "billing.features.courseProgress",
        fallback: "Course progress tracking",
      },
      {
        key: "billing.features.basicChallenges",
        fallback: "Basic coding challenges",
      },
      {
        key: "billing.features.limitedAiMentor",
        fallback: "Limited AI Mentor access",
      },
    ],
    limits: [
      {
        labelKey: "billing.limits.aiMessages",
        labelFallback: "AI messages",
        valueKey: "billing.plans.free.aiMessages",
        valueFallback: "20 / month",
      },
      {
        labelKey: "billing.limits.codeReviews",
        labelFallback: "Code reviews",
        valueKey: "billing.plans.free.codeReviews",
        valueFallback: "3 / month",
      },
    ],
  },
  {
    id: "pro",
    nameKey: "billing.plans.pro.name",
    nameFallback: "Pro",
    descriptionKey: "billing.plans.pro.description",
    descriptionFallback: "For regular learning with AI support.",
    price: "39 PLN",
    badgeKey: "billing.popular",
    badgeFallback: "Popular",
    highlighted: true,
    features: [
      {
        key: "billing.features.moreAiMentor",
        fallback: "More AI Mentor conversations",
      },
      {
        key: "billing.features.advancedCodeReviews",
        fallback: "Advanced code reviews",
      },
      {
        key: "billing.features.aiRoadmaps",
        fallback: "AI-generated roadmaps",
      },
      {
        key: "billing.features.priorityCourses",
        fallback: "Priority access to new courses",
      },
    ],
    limits: [
      {
        labelKey: "billing.limits.aiMessages",
        labelFallback: "AI messages",
        valueKey: "billing.plans.pro.aiMessages",
        valueFallback: "500 / month",
      },
      {
        labelKey: "billing.limits.codeReviews",
        labelFallback: "Code reviews",
        valueKey: "billing.plans.pro.codeReviews",
        valueFallback: "50 / month",
      },
    ],
  },
  {
    id: "premium",
    nameKey: "billing.plans.premium.name",
    nameFallback: "Premium",
    descriptionKey: "billing.plans.premium.description",
    descriptionFallback: "For heavy AI usage and portfolio building.",
    price: "79 PLN",
    features: [
      {
        key: "billing.features.highAiLimits",
        fallback: "High AI usage limits",
      },
      {
        key: "billing.features.projectReviews",
        fallback: "Project-level code reviews",
      },
      {
        key: "billing.features.personalizedMentor",
        fallback: "Personalized AI Mentor context",
      },
      {
        key: "billing.features.futureBeta",
        fallback: "Early access to beta features",
      },
    ],
    limits: [
      {
        labelKey: "billing.limits.aiMessages",
        labelFallback: "AI messages",
        valueKey: "billing.plans.premium.aiMessages",
        valueFallback: "2,000 / month",
      },
      {
        labelKey: "billing.limits.codeReviews",
        labelFallback: "Code reviews",
        valueKey: "billing.plans.premium.codeReviews",
        valueFallback: "200 / month",
      },
    ],
  },
];

const usageItems = [
  {
    icon: Bot,
    labelKey: "billing.usage.aiMessages",
    labelFallback: "AI messages",
    value: "0 / 20",
    progress: 0,
  },
  {
    icon: Code2,
    labelKey: "billing.usage.codeReviews",
    labelFallback: "Code reviews",
    value: "0 / 3",
    progress: 0,
  },
  {
    icon: Gauge,
    labelKey: "billing.usage.monthlyBudget",
    labelFallback: "Monthly AI budget",
    value: "Included",
    valueKey: "billing.usage.included",
    progress: 0,
  },
];

export default function BillingMainSection({
  currentPlan,
}: BillingMainSectionProps) {
  const normalizedCurrentPlan = normalizePlan(currentPlan);

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <CurrentPlanCard currentPlan={normalizedCurrentPlan} />
        <UsageCard />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            current={plan.id === normalizedCurrentPlan}
            plan={plan}
          />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <InfoCard
          icon={CreditCard}
          titleKey="billing.info.paymentTitle"
          titleFallback="Payment method"
          descriptionKey="billing.info.paymentDescription"
          descriptionFallback="Add a payment method to upgrade your plan and keep AI features active."
        />
        <InfoCard
          icon={Sparkles}
          titleKey="billing.info.limitsTitle"
          titleFallback="Monthly limits"
          descriptionKey="billing.info.limitsDescription"
          descriptionFallback="Track AI messages, code reviews and usage limits in one place."
        />
        <InfoCard
          icon={ShieldCheck}
          titleKey="billing.info.aiTitle"
          titleFallback="Secure billing"
          descriptionKey="billing.info.aiDescription"
          descriptionFallback="Your subscription and payment settings stay protected."
        />
      </section>
    </div>
  );
}

function CurrentPlanCard({ currentPlan }: { currentPlan: BillingPlan["id"] }) {
  const currentPlanData = plans.find((plan) => plan.id === currentPlan) ?? plans[0];

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
      <div className="border-b border-white/10 bg-white/[0.02] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
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

          <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
            <Crown className="size-7" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-3">
        <MetricCard
          icon={Zap}
          labelKey="billing.metrics.aiAccess"
          labelFallback="AI access"
          valueKey="billing.metrics.active"
          valueFallback="Active"
        />
        <MetricCard
          icon={Rocket}
          labelKey="billing.metrics.learning"
          labelFallback="Learning"
          valueKey="billing.metrics.unlocked"
          valueFallback="Unlocked"
        />
        <MetricCard
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

function UsageCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText fallback="Usage" translationKey="billing.usage.title" />
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          <TranslatedText
            fallback="Monthly usage preview for AI features."
            translationKey="billing.usage.description"
          />
        </p>
      </div>

      <div className="space-y-5">
        {usageItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.labelKey}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-violet-300" />
                  <span className="text-sm text-slate-300">
                    <TranslatedText
                      fallback={item.labelFallback}
                      translationKey={item.labelKey}
                    />
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {item.valueKey ? (
                    <TranslatedText
                      fallback={item.value}
                      translationKey={item.valueKey}
                    />
                  ) : (
                    item.value
                  )}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PlanCard({
  current,
  plan,
}: {
  current: boolean;
  plan: BillingPlan;
}) {
  return (
    <article
      className={clsx(
        "flex min-h-full flex-col rounded-3xl border bg-[#111a2d]/80 p-6",
        plan.highlighted
          ? "border-violet-400/50 shadow-2xl shadow-violet-950/20"
          : "border-white/10"
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
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
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        <span className="ml-2 text-sm text-slate-400">
          <TranslatedText fallback="/ month" translationKey="billing.perMonth" />
        </span>
      </div>

      <div className="space-y-3">
        {plan.features.map((feature) => (
          <div key={feature.key} className="flex gap-3 text-sm text-slate-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span>
              <TranslatedText
                fallback={feature.fallback}
                translationKey={feature.key}
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
          "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold transition",
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

function MetricCard({
  icon: Icon,
  labelFallback,
  labelKey,
  valueFallback,
  valueKey,
}: {
  icon: typeof Zap;
  labelFallback: string;
  labelKey: string;
  valueFallback: string;
  valueKey: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>
      <p className="text-sm text-slate-400">
        <TranslatedText fallback={labelFallback} translationKey={labelKey} />
      </p>
      <p className="mt-1 font-semibold text-white">
        <TranslatedText fallback={valueFallback} translationKey={valueKey} />
      </p>
    </div>
  );
}

function InfoCard({
  descriptionFallback,
  descriptionKey,
  icon: Icon,
  titleFallback,
  titleKey,
}: {
  descriptionFallback: string;
  descriptionKey: string;
  icon: typeof CreditCard;
  titleFallback: string;
  titleKey: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-white/[0.04] text-violet-300">
        <Icon className="size-5" />
      </div>
      <h2 className="font-semibold text-white">
        <TranslatedText fallback={titleFallback} translationKey={titleKey} />
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        <TranslatedText
          fallback={descriptionFallback}
          translationKey={descriptionKey}
        />
      </p>
    </article>
  );
}

function normalizePlan(plan: string): BillingPlan["id"] {
  const normalizedPlan = plan.toLowerCase();

  if (normalizedPlan === "pro") return "pro";
  if (normalizedPlan === "premium") return "premium";

  return "free";
}

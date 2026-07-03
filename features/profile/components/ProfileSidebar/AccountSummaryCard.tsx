import { CheckCircle2, Crown, ExternalLink } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { getLevelingProgress, XP_PER_LEVEL } from "@/lib/learning/leveling";
import type { CurrentProfile } from "../../types/profile.types";

type AccountSummaryCardProps = {
  profile: CurrentProfile;
};

const planFeatures = [
  {
    fallback: "Unlimited AI Mentoring",
    translationKey: "profile.planFeatures.unlimitedAiMentoring",
  },
  {
    fallback: "Advanced Code Reviews",
    translationKey: "profile.planFeatures.advancedCodeReviews",
  },
  {
    fallback: "Priority Support",
    translationKey: "profile.planFeatures.prioritySupport",
  },
];

export default function AccountSummaryCard({
  profile,
}: AccountSummaryCardProps) {
  const leveling = getLevelingProgress(profile.xp);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        <TranslatedText
          fallback="Account Summary"
          translationKey="profile.accountSummary"
        />
      </h2>

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">
              <TranslatedText
                fallback="Current Plan"
                translationKey="profile.currentPlan"
              />
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              <TranslatedText
                fallback={formatPlanFallback(profile.plan)}
                translationKey={getPlanTranslationKey(profile.plan)}
              />
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              <TranslatedText
                fallback="Manage your plan and account benefits"
                translationKey="profile.managePlanDescription"
              />
            </p>
          </div>

          <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/15">
            <Crown className="size-7 text-violet-400" />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              <TranslatedText
                fallback="Level {level}"
                translationKey="profile.stats.level"
                values={{ level: profile.level }}
              />
            </span>

            <span className="text-sm text-slate-400">
              {leveling.xpInCurrentLevel.toLocaleString()} /{" "}
              {XP_PER_LEVEL.toLocaleString()} XP
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${leveling.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {planFeatures.map((feature) => (
            <div key={feature.translationKey} className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
              <span className="text-slate-300">
                <TranslatedText
                  fallback={feature.fallback}
                  translationKey={feature.translationKey}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="
          mt-5 flex w-full items-center justify-center gap-2
          rounded-2xl border border-white/10
          px-4 py-3
          font-medium text-white
          transition
          hover:bg-white/5
        "
      >
        <TranslatedText
          fallback="Manage Subscription"
          translationKey="profile.manageSubscription"
        />

        <ExternalLink className="size-4" />
      </button>
    </section>
  );
}

function getPlanTranslationKey(plan: string) {
  const normalizedPlan = plan.toLowerCase();

  if (normalizedPlan === "free") return "profile.plans.free";
  if (normalizedPlan === "pro") return "profile.plans.pro";
  if (normalizedPlan === "premium") return "profile.plans.premium";

  return "profile.plans.default";
}

function formatPlanFallback(plan: string) {
  return `${plan.charAt(0).toUpperCase()}${plan.slice(1)} Plan`;
}

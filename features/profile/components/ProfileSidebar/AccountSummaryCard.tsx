import { CheckCircle2, Crown, ExternalLink } from "lucide-react";

import type { CurrentProfile } from "../../types/profile.types";
import { formatPlan } from "../../utils/profileFormatters";

type AccountSummaryCardProps = {
  profile: CurrentProfile;
};

const planFeatures = [
  "Unlimited AI Mentoring",
  "Advanced Code Reviews",
  "Priority Support",
];

export default function AccountSummaryCard({
  profile,
}: AccountSummaryCardProps) {
  const xpProgress =
    profile.xpGoal > 0 ? Math.min((profile.xp / profile.xpGoal) * 100, 100) : 0;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Account Summary
      </h2>

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">Current Plan</p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {formatPlan(profile.plan)}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Manage your plan and account benefits
            </p>
          </div>

          <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/15">
            <Crown className="size-7 text-violet-400" />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Level {profile.level}
            </span>

            <span className="text-sm text-slate-400">
              {profile.xp.toLocaleString()} / {profile.xpGoal.toLocaleString()} XP
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {planFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
              <span className="text-slate-300">{feature}</span>
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
        Manage Subscription

        <ExternalLink className="size-4" />
      </button>
    </section>
  );
}

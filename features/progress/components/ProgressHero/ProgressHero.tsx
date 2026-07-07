import { Activity, Flame, Star, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import TranslatedText from "@/components/shared/TranslatedText";
import type { CurrentProfile } from "@/features/profile/types/profile.types";
import { getLevelingProgress } from "@/lib/learning/leveling";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressHeroProps = {
  profile: CurrentProfile;
  summary: ProgressSummary | null;
};

type HeroMetricProps = {
  icon: LucideIcon;
  label: ReactNode;
  value: string;
};

export default function ProgressHero({ profile, summary }: ProgressHeroProps) {
  const leveling = getLevelingProgress(profile.xp);
  const currentLevelProgress = Math.min(
    Math.max(leveling.progressPercent, 0),
    100
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
        <div className="min-w-0 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Activity className="size-3.5" />
            <TranslatedText
              fallback="Learning analytics"
              translationKey="progress.heroBadge"
            />
          </span>

          <h1 className="mt-5 max-w-2xl break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            <TranslatedText fallback="Progress" translationKey="progress.title" />
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            <TranslatedText
              fallback="Track your learning journey, XP, streaks and activity."
              translationKey="progress.subtitle"
            />
          </p>

          <div className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-[#0b1220]/60 p-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-white">
                <TranslatedText
                  fallback="Level progress"
                  translationKey="progress.levelProgress"
                />
              </span>
              <span className="text-slate-400">
                {Math.round(currentLevelProgress)}%
              </span>
            </div>

            <div
              aria-label={`${Math.round(currentLevelProgress)}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Math.round(currentLevelProgress)}
              className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
            >
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <HeroMetric
            icon={Star}
            label={
              <TranslatedText
                fallback="Total XP"
                translationKey="progress.stats.totalXp"
              />
            }
            value={profile.xp.toLocaleString()}
          />
          <HeroMetric
            icon={Trophy}
            label={
              <TranslatedText
                fallback="Level"
                translationKey="dashboard.stats.level"
              />
            }
            value={String(profile.level)}
          />
          <HeroMetric
            icon={Flame}
            label={
              <TranslatedText
                fallback="This week"
                translationKey="progress.insights.thisWeek"
              />
            }
            value={`${(summary?.thisWeekXp ?? 0).toLocaleString()} XP`}
          />
        </div>
      </div>
    </section>
  );
}

function HeroMetric({ icon: Icon, label, value }: HeroMetricProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220]/60 p-4 backdrop-blur">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-slate-400">{label}</p>
        <p className="mt-1 truncate text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

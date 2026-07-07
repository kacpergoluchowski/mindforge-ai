import { Bot, CheckCircle2, Code2, Flame, Rocket, Trophy } from "lucide-react";

import LocalizedDate from "@/components/shared/LocalizedDate";
import TranslatedText from "@/components/shared/TranslatedText";
import type { CurrentProfileAchievement } from "../../types/profile.types";

type AchievementsCardProps = {
  achievements: CurrentProfileAchievement[];
};

const achievementIcons = {
  bot: Bot,
  code: Code2,
  flame: Flame,
  rocket: Rocket,
  trophy: Trophy,
};

export default function AchievementsCard({
  achievements,
}: AchievementsCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Achievements"
            translationKey="profile.achievements"
          />
        </h2>

        <button
          type="button"
          className="shrink-0 text-sm font-medium text-violet-300 transition hover:text-violet-200"
        >
          <TranslatedText fallback="View all" translationKey="common.viewAll" />
        </button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => {
          const iconKey = achievement.icon?.toLowerCase() ?? "trophy";
          const Icon =
            achievementIcons[iconKey as keyof typeof achievementIcons] ??
            Trophy;

          return (
            <div
              key={achievement.id}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0b1220]/70 p-4 transition hover:border-violet-400/20"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10">
                <Icon className="size-6 text-violet-400" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-white">{achievement.title}</h3>
                {achievement.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {achievement.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  <LocalizedDate
                    date={achievement.unlockedAt}
                    options={{ day: "numeric", month: "short", year: "numeric" }}
                  />
                </p>
              </div>

              <CheckCircle2 className="mt-3 size-5 shrink-0 text-emerald-500" />
            </div>
          );
        })}

        {achievements.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/10 bg-[#0b1220]/60 p-4 text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback="Complete learning goals to unlock achievements."
              translationKey="profile.emptyAchievements"
            />
          </p>
        )}
      </div>
    </section>
  );
}

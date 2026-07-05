import TranslatedText from "@/components/shared/TranslatedText";
import StatsCard from "./StatsCard";
import { statsConfig } from "./statsConfig";

import type { CurrentProfile } from "@/features/profile/types/profile.types";
import type { ProgressSummary } from "@/features/progress/types/progress.types";
import type { StatsCardItem } from "../../types/dashboard.types";

type StatsGridProps = {
  profile: CurrentProfile | null;
  summary: ProgressSummary | null;
};

export default function StatsGrid({ profile, summary }: StatsGridProps) {
  const stats = statsConfig.map((stat) =>
    mapDashboardStat({ profile, stat, summary })
  );

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.id} stat={stat} />
      ))}
    </section>
  );
}

function mapDashboardStat({
  profile,
  stat,
  summary,
}: StatsGridProps & { stat: StatsCardItem }): StatsCardItem {
  switch (stat.id) {
    case "completedLessons":
      return {
        ...stat,
        title: (
          <TranslatedText
            fallback="Lessons Completed"
            translationKey="dashboard.stats.lessonsCompleted"
          />
        ),
        value: String(summary?.completedLessons ?? 0),
        change: (
          <TranslatedText
            fallback="{count} this week"
            translationKey="dashboard.stats.thisWeekCount"
            values={{ count: summary?.thisWeekLessons ?? 0 }}
          />
        ),
      };
    case "completedCourses":
      return {
        ...stat,
        title: (
          <TranslatedText
            fallback="Courses Completed"
            translationKey="dashboard.stats.completedCourses"
          />
        ),
        value: String(summary?.completedCourses ?? 0),
        change: (
          <TranslatedText
            fallback="{count} started"
            translationKey="dashboard.stats.startedCount"
            values={{ count: summary?.startedCourses ?? 0 }}
          />
        ),
      };
    case "currentStreak":
      return {
        ...stat,
        title: (
          <TranslatedText
            fallback="Current Streak"
            translationKey="dashboard.stats.currentStreak"
          />
        ),
        value: (
          <TranslatedText
            fallback="{count} days"
            translationKey="dashboard.stats.daysCount"
            values={{ count: profile?.streakDays ?? 0 }}
          />
        ),
        change: (
          <TranslatedText
            fallback="Keep it up!"
            translationKey="dashboard.stats.keepItUp"
          />
        ),
      };
    case "xpEarned":
      return {
        ...stat,
        title: (
          <TranslatedText
            fallback="XP Earned"
            translationKey="dashboard.stats.xpEarned"
          />
        ),
        value: (profile?.xp ?? 0).toLocaleString(),
        change: (
          <TranslatedText
            fallback="+{count} this week"
            translationKey="dashboard.stats.xpThisWeek"
            values={{ count: (summary?.thisWeekXp ?? 0).toLocaleString() }}
          />
        ),
      };
  }
}

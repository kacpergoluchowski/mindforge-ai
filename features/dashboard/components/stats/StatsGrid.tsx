import TranslatedText from "@/components/shared/TranslatedText";
import { statsData } from "../../data/dashboardData";
import StatsCard from "./StatsCard";

import type { CurrentProfile } from "@/features/profile/types/profile.types";
import type { ProgressSummary } from "@/features/progress/types/progress.types";

type StatsGridProps = {
  profile: CurrentProfile | null;
  summary: ProgressSummary | null;
};

export default function StatsGrid({ profile, summary }: StatsGridProps) {
  const stats = statsData.map((stat) => {
    if (stat.title === "Total Learning Time") {
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
    }

    if (stat.title === "Courses Completed") {
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
    }

    if (stat.title === "Current Streak") {
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
    }

    if (stat.title === "XP Earned") {
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

    return stat;
  });

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </section>
  );
}

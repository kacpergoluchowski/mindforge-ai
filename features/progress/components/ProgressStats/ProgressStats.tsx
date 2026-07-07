import { progressStatsConfig } from "./progressStatsConfig";
import ProgressStatCard from "./ProgressStatCard";

import TranslatedText from "@/components/shared/TranslatedText";
import { getLevelingProgress } from "@/lib/learning/leveling";
import type { CurrentProfile } from "@/features/profile/types/profile.types";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressStatsProps = {
  profile: CurrentProfile;
  summary: ProgressSummary | null;
};

export default function ProgressStats({ profile, summary }: ProgressStatsProps) {
  const leveling = getLevelingProgress(profile.xp);
  const stats = progressStatsConfig.map((stat) => {
    switch (stat.id) {
      case "totalXp":
        return {
          ...stat,
          title: (
            <TranslatedText
              fallback="Total XP"
              translationKey="progress.stats.totalXp"
            />
          ),
          value: profile.xp.toLocaleString(),
          subtitle: (
            <TranslatedText
              fallback="+{xp} this week"
              translationKey="progress.stats.xpThisWeek"
              values={{ xp: (summary?.thisWeekXp ?? 0).toLocaleString() }}
            />
          ),
        };
      case "level":
        return {
          ...stat,
          title: (
            <TranslatedText fallback="Level" translationKey="dashboard.stats.level" />
          ),
          value: String(profile.level),
          subtitle: (
            <TranslatedText
              fallback="{xp} XP to next level"
              translationKey="progress.stats.xpToNextLevel"
              values={{ xp: leveling.xpToNextLevel.toLocaleString() }}
            />
          ),
          progress: leveling.progressPercent,
        };
      case "lessons":
        return {
          ...stat,
          title: (
            <TranslatedText
              fallback="Lessons"
              translationKey="progress.stats.lessons"
            />
          ),
          value: String(summary?.completedLessons ?? 0),
          subtitle: (
            <TranslatedText
              fallback="Completed lessons"
              translationKey="progress.stats.completedLessons"
            />
          ),
        };
      case "courses":
        return {
          ...stat,
          title: (
            <TranslatedText
              fallback="Courses"
              translationKey="progress.stats.courses"
            />
          ),
          value: String(summary?.completedCourses ?? 0),
          subtitle: (
            <TranslatedText
              fallback="{started} started / {lessons} lessons done"
              translationKey="progress.stats.coursesSummary"
              values={{
                started: summary?.startedCourses ?? 0,
                lessons: summary?.completedLessons ?? 0,
              }}
            />
          ),
        };
    }
  });

  return (
    <section className="min-w-0">
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <ProgressStatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}


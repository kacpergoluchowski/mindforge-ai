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
        title: "Lessons Completed",
        value: String(summary?.completedLessons ?? 0),
        change: `${summary?.thisWeekLessons ?? 0} this week`,
      };
    }

    if (stat.title === "Courses Completed") {
      return {
        ...stat,
        value: String(summary?.completedCourses ?? 0),
        change: `${summary?.startedCourses ?? 0} started`,
      };
    }

    if (stat.title === "Current Streak") {
      return {
        ...stat,
        value: `${profile?.streakDays ?? 0} days`,
        change: "Keep it up!",
      };
    }

    if (stat.title === "XP Earned") {
      return {
        ...stat,
        value: (profile?.xp ?? 0).toLocaleString(),
        change: `+${(summary?.thisWeekXp ?? 0).toLocaleString()} this week`,
      };
    }

    return stat;
  });

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} stat={stat} />
      ))}
    </section>
  );
}

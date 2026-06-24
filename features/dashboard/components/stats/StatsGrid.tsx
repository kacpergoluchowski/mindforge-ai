import { statsData } from "../../data/dashboardData";
import StatsCard from "./StatsCard";

import type { CurrentProfile } from "@/features/profile/types/profile.types";

type StatsGridProps = {
  profile: CurrentProfile | null;
};

export default function StatsGrid({ profile }: StatsGridProps) {
  const stats = statsData.map((stat) => {
    if (stat.title === "Current Streak" && profile) {
      return { ...stat, value: `${profile.streakDays} days` };
    }

    if (stat.title === "XP Earned" && profile) {
      return { ...stat, value: profile.xp.toLocaleString() };
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

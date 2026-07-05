import TimeSpent from "./TimeSpent";
import XpOverview from "./XpOverview";

import type { CurrentProfile } from "@/features/profile/types/profile.types";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressOverviewSectionProps = {
  profile: CurrentProfile;
  summary: ProgressSummary | null;
};

export default function ProgressOverviewSection({
  profile,
  summary,
}: ProgressOverviewSectionProps) {
  return (
    <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="h-full min-w-0">
        <XpOverview
          dailyAverageXp={summary?.dailyAverageXp ?? 0}
          totalXp={profile.xp}
          weekXp={summary?.thisWeekXp ?? 0}
          xpOverview={summary?.xpOverview ?? []}
        />
      </div>
      <div className="h-full min-w-0">
        <TimeSpent items={summary?.categoryBreakdown ?? []} />
      </div>
    </section>
  );
}

import Achievements from "./Achievements";
import RecentActivity from "./RecentActivity";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressActivitySectionProps = {
  summary: ProgressSummary | null;
};

export default function ProgressActivitySection({
  summary,
}: ProgressActivitySectionProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
      <RecentActivity activities={summary?.recentActivities ?? []} />
      <Achievements achievements={summary?.achievements ?? []} />
    </section>
  );
}

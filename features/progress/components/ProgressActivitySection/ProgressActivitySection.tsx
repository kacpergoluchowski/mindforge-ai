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
    <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <RecentActivity activities={summary?.recentActivities ?? []} />
      <Achievements achievements={summary?.achievements ?? []} />
    </section>
  );
}

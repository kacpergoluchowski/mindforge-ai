import Achievements from "./Achievements";
import RecentActivity from "./RecentActivity";
import type { RecentActivityItem } from "../../types/progress.types";

type ProgressActivitySectionProps = {
  activities: RecentActivityItem[];
};

export default function ProgressActivitySection({
  activities,
}: ProgressActivitySectionProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
      <RecentActivity activities={activities} />
      <Achievements />
    </section>
  );
}

import TimeSpent from "./TimeSpent";
import XpOverview from "./XpOverview";

type ProgressOverviewSectionProps = {
  totalXp: number;
};

export default function ProgressOverviewSection({
  totalXp,
}: ProgressOverviewSectionProps) {
  return (
    <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <XpOverview totalXp={totalXp} />
      </div>
      <div className="min-w-0">
        <TimeSpent />
      </div>
    </section>
  );
}

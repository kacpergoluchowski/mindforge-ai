import TimeSpent from "./TimeSpent";
import XpOverview from "./XpOverview";

export default function ProgressOverviewSection() {
  return (
    <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <XpOverview />
      </div>

      <div className="min-w-0">
        <TimeSpent />
      </div>
    </section>
  );
}
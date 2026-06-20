import TimeSpent from "./TimeSpent";
import XpOverview from "./XpOverview";

export default function ProgressOverviewSection() {
  return (
    <section className="grid gap-5 xl:grid-cols-[2fr_1fr]">
      <XpOverview />
      <TimeSpent />
    </section>
  );
}
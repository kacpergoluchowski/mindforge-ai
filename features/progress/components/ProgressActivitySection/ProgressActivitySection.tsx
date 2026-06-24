import Achievements from "./Achievements";
import RecentActivity from "./RecentActivity";

export default function ProgressActivitySection() {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
      <RecentActivity />
      <Achievements />
    </section>
  );
}

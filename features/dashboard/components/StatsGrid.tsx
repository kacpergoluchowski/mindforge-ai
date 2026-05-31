import { statsData } from "../data/dashboardData";
import StatsCard from "./StatsCard";

export default function StatsGrid() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat) => (
        <StatsCard key={stat.title} stat={stat} />
      ))}
    </section>
  );
}

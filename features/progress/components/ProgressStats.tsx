import { progressStats } from "../data/progressData";
import ProgressStatCard from "./ProgressStatCard";

export default function ProgressStats() {
  return (
    <section>
      <div className="grid gap-5 lg:grid-cols-4">
        {progressStats.map((stat) => (
          <ProgressStatCard
            key={stat.id}
            {...stat}
          />
        ))}
      </div>
    </section>
  );
}
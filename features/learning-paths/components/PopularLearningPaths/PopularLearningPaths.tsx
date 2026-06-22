import { popularLearningPaths } from "../../data/learningData";
import PopularLearningPathCard from "./PopularLearningPathCard";

export default function PopularLearningPaths() {
  return (
    <section className="space-y-6 border-t border-white/10 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Popular Learning Paths
        </h2>

        <button className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.05]">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {popularLearningPaths.map((path) => (
          <PopularLearningPathCard key={path.id} {...path} />
        ))}
      </div>
    </section>
  );
}

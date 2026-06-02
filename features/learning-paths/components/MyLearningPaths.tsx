import { learningPaths } from "../data/learningData";
import LearningPathCard from "./LearningPathCard";

export default function MyLearningPaths() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          My Learning Paths
        </h2>

        <button className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.05]">
          View all
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {learningPaths.map((path) => (
          <LearningPathCard key={path.id} {...path} />
        ))}
      </div>
    </section>
  );
}
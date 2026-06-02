import { Plus } from "lucide-react";

export default function LearningPathsHero() {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white lg:text-3xl xl:text-4xl">
          Learning Paths
        </h1>

        <p className="mt-1 text-sm text-slate-400 lg:text-lg xl:text-xl">
          AI-powered roadmaps designed to help you master any skill.
        </p>
      </div>

      <button
        type="button"
        className="
          flex items-center justify-center gap-3
          rounded-2xl
          bg-violet-500
          px-6 py-3 lg:py-4
          font-medium text-white
          transition
          hover:bg-violet-600
        "
      >
        <Plus className="size-5" />

        <span>Create AI Path</span>
      </button>
    </section>
  );
}
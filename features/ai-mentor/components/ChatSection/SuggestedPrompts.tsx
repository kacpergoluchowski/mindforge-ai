import { Code2, Compass, Lightbulb, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const quickPrompts = [
  {
    title: "Explain a topic",
    subtitle: "Get simple explanations",
    icon: Lightbulb,
  },
  {
    title: "Review my code",
    subtitle: "Improve your code",
    icon: Code2,
  },
  {
    title: "Help me plan",
    subtitle: "Build a study plan",
    icon: Route,
  },
  {
    title: "Recommend course",
    subtitle: "Find the best course",
    icon: Compass,
  },
] satisfies {
  icon: LucideIcon;
  subtitle: string;
  title: string;
}[];

export default function SuggestedPrompts() {
  return (
    <section className="mb-3">
      <h2 className="mb-3 text-sm font-semibold text-white">Quick prompts</h2>

      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        {quickPrompts.map(({ title, subtitle, icon: Icon }) => (
          <button
            key={title}
            type="button"
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-violet-400/40 hover:bg-violet-500/10"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <Icon className="size-4" />
            </span>

            <span className="min-w-0">
              <span className="block break-words text-sm font-medium text-white">
                {title}
              </span>
              <span className="mt-1 block break-words text-xs text-slate-400">
                {subtitle}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

import { BookOpenCheck, Sparkles } from "lucide-react";
import TranslatedText from "@/components/shared/TranslatedText";

export default function AICourseBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_34%),#111a2d] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.16)] sm:p-6 lg:p-7">
      <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase text-violet-300">
            <Sparkles className="size-3.5" />
            <TranslatedText translationKey="courses.aiBanner.badge" fallback="AI" />
          </span>

          <h2 className="mt-4 break-words text-2xl font-bold text-white lg:text-3xl">
            <TranslatedText
              translationKey="courses.aiBanner.title"
              fallback="AI-Powered Learning"
            />
          </h2>

          <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-slate-400 lg:text-base">
            <TranslatedText
              translationKey="courses.aiBanner.description"
              fallback="Get personalized course recommendations based on your learning goals and progress."
            />
          </p>
        </div>

        <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
              <BookOpenCheck className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                <TranslatedText
                  translationKey="courses.aiBanner.cardTitle"
                  fallback="Adaptive courses"
                />
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                <TranslatedText
                  translationKey="courses.aiBanner.cardDescription"
                  fallback="Generate a path, learn with quizzes and continue from your progress."
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

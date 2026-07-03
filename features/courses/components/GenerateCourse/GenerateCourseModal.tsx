"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { BookOpen, Loader2, Sparkles, Target, X } from "lucide-react";

import { createAiCourse } from "../../actions/aiCourseActions";
import { useI18n } from "@/lib/i18n/I18nProvider";

type GenerateCourseModalProps = {
  onClose: () => void;
};

type GenerateCourseState = {
  error?: string;
};

const initialState: GenerateCourseState = {};

export default function GenerateCourseModal({ onClose }: GenerateCourseModalProps) {
  const { t } = useI18n();
  const [state, formAction] = useActionState(createAiCourse, initialState);
  const [goal, setGoal] = useState("JavaScript Basics and ES6+");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#101827] shadow-2xl shadow-black/50">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 p-5">
          <div className="min-w-0">
            <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 sm:text-sm">
              <Sparkles className="size-4" />
              <span className="truncate">
                {t("courses.generate.badge", "AI Course Builder")}
              </span>
            </div>

            <h2 className="text-xl font-bold leading-tight text-white">
              {t("courses.generate.title", "Generate a new course")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t(
                "courses.generate.subtitle",
                "Enter a goal. AI will create a complete course with modules, lessons, practice and quizzes."
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("common.close", "Close")}
            className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-slate-400 transition hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <form action={formAction} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Target className="size-4 text-violet-300" />
                {t("courses.generate.goal", "Course goal")}
              </span>
              <input
                name="goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                placeholder="JavaScript Basics and ES6+"
                className="w-full rounded-2xl border border-white/10 bg-[#080e18] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:bg-white/[0.03]"
              />
            </label>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {t("courses.generate.outputTitle", "What will be created")}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {t(
                      "courses.generate.outputDescription",
                      "A full course with 5-7 modules, lessons, practice tasks, quizzes, XP and normal course progress."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {state.error ? (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {state.error}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              {t("common.cancel", "Cancel")}
            </button>

            <GenerateCourseSubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function GenerateCourseSubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {pending
        ? t("courses.generate.generating", "Generating course...")
        : t("courses.generate.submit", "Generate course")}
    </button>
  );
}

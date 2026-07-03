"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Sparkles } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";

export default function GenerateStepCourseButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {pending ? (
        <TranslatedText
          fallback="Generating course..."
          translationKey="learningPaths.generatingCourse"
        />
      ) : (
        <TranslatedText
          fallback="Generate course"
          translationKey="learningPaths.generateCourse"
        />
      )}
    </button>
  );
}

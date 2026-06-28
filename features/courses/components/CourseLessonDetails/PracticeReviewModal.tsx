"use client";

import { useState, useTransition } from "react";
import { Bot, Loader2, Sparkles, X } from "lucide-react";

import { reviewLessonPracticeCode } from "../../actions/courseActions";

type PracticeReviewModalProps = {
  courseId: string;
  lessonId: string;
  lessonTitle: string;
};

export default function PracticeReviewModal({
  courseId,
  lessonId,
  lessonTitle,
}: PracticeReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [review, setReview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function closeModal() {
    setOpen(false);
    setError(null);
  }

  function submitReview() {
    const trimmedCode = code.trim();

    if (!trimmedCode || isPending) {
      return;
    }

    setError(null);
    setReview(null);

    const formData = new FormData();
    formData.set("courseId", courseId);
    formData.set("lessonId", lessonId);
    formData.set("code", trimmedCode);

    startTransition(async () => {
      try {
        const result = await reviewLessonPracticeCode(formData);
        setReview(result);
      } catch {
        setError("AI review is not available right now. Try again in a moment.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/15 sm:w-auto"
      >
        <Bot className="size-4" />
        Review with AI
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[92dvh] w-full max-w-4xl min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-violet-300">
                  AI Practice Review
                </p>
                <h2 className="mt-1 break-words text-lg font-semibold text-white sm:text-xl">
                  {lessonTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Paste your HTML, CSS or notes from this practice task. AI will
                  give you quick feedback before you mark it as done.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:border-white/20 hover:text-white"
                aria-label="Close AI review"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-4 sm:p-5">
              <div className="grid min-w-0 gap-5 lg:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor="practice-code"
                    className="text-sm font-semibold text-white"
                  >
                    Your code
                  </label>
                  <textarea
                    id="practice-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="<section>...</section>&#10;&#10;.card { ... }"
                    className="mt-3 min-h-80 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/60 p-4 font-mono text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                  />
                </div>

                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                      <Sparkles className="size-4" />
                    </div>
                    <p className="font-semibold text-white">AI feedback</p>
                  </div>

                  <div className="mt-4 min-h-72 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {isPending ? (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="size-4 animate-spin" />
                        Reviewing your code...
                      </div>
                    ) : review ? (
                      review
                    ) : error ? (
                      <p className="text-red-300">{error}</p>
                    ) : (
                      <p className="text-slate-500">
                        Feedback will appear here after review.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={submitReview}
                  disabled={!code.trim() || isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Bot className="size-4" />
                  )}
                  Review with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

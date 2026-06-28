"use client";

import { useState, useTransition } from "react";
import clsx from "clsx";
import { Bot, CheckCircle2, Loader2, X, XCircle } from "lucide-react";

import {
  completeChallenge,
  reviewChallengeSolution,
} from "../../actions/challengeActions";

type ChallengeSolutionReviewProps = {
  challengeId: string | number;
  starterCode: string | null;
  initialSolution: string | null;
  initialFeedback: string | null;
  initialVerdict: "passed" | "needs_work" | null;
  alreadyCompleted: boolean;
};

export default function ChallengeSolutionReview({
  challengeId,
  starterCode,
  initialSolution,
  initialFeedback,
  initialVerdict,
  alreadyCompleted,
}: ChallengeSolutionReviewProps) {
  const [solution, setSolution] = useState(initialSolution ?? starterCode ?? "");
  const [feedback, setFeedback] = useState<string | null>(initialFeedback);
  const [verdict, setVerdict] = useState<"passed" | "needs_work" | null>(
    initialVerdict
  );
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isCompleting, startCompleteTransition] = useTransition();
  const needsWork = verdict === "needs_work";
  const canComplete = Boolean(feedback) && !needsWork;

  function verifySolution() {
    const trimmedSolution = solution.trim();

    if (!trimmedSolution || isPending) {
      return;
    }

    setError(null);
    setFeedback(null);
    setVerdict(null);
    setCompleteError(null);
    setModalOpen(true);

    const formData = new FormData();
    formData.set("challengeId", String(challengeId));
    formData.set("solution", trimmedSolution);

    startTransition(async () => {
      try {
        const result = await reviewChallengeSolution(formData);
        setFeedback(result.feedback);
        setVerdict(result.verdict);
      } catch {
        setError("AI verification is not available right now. Try again soon.");
      }
    });
  }

  function closeModal() {
    if (isPending || isCompleting) {
      return;
    }

    setModalOpen(false);
  }

  function markAsCompleted() {
    if (completed || isCompleting) {
      return;
    }

    setCompleteError(null);

    const formData = new FormData();
    formData.set("challengeId", String(challengeId));
    formData.set("solution", solution.trim());

    startCompleteTransition(async () => {
      try {
        await completeChallenge(formData);
        setCompleted(true);
      } catch {
        setCompleteError("Could not complete challenge. Try again in a moment.");
      }
    });
  }

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Your solution</p>
              <p className="text-xs text-slate-500">HTML, CSS, JS or notes</p>
            </div>
            <span className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-500">
              editor
            </span>
          </div>

          <textarea
            value={solution}
            onChange={(event) => setSolution(event.target.value)}
            placeholder="<article class='profile-card'>...</article>"
            spellCheck={false}
            className="min-h-[520px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600"
          />
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
              <Bot className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI verification</h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                AI checks your code against the challenge requirements and opens
                feedback in a modal.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={verifySolution}
            disabled={!solution.trim() || isPending || completed}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Bot className="size-4" />
            )}
            Verify with AI
          </button>

          {completed ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
              Challenge completed. XP has been added to your profile.
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
              {error}
            </p>
          ) : null}

          {feedback ? (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-4 w-full rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              View last feedback
            </button>
          ) : null}
        </aside>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <p className="text-sm font-medium text-violet-300">
                  AI verification
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Challenge feedback
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isPending || isCompleting}
                className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close feedback modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-5">
              {isPending ? (
                <div className="flex min-h-72 flex-col items-center justify-center text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                    <Loader2 className="size-7 animate-spin" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    Checking your solution...
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                    AI is comparing your code with the requirements and
                    acceptance criteria.
                  </p>
                </div>
              ) : feedback ? (
                <div className="space-y-5">
                  <div
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl border p-4",
                      canComplete
                        ? "border-emerald-400/20 bg-emerald-500/10"
                        : "border-orange-400/20 bg-orange-500/10"
                    )}
                  >
                    {canComplete ? (
                      <CheckCircle2 className="size-6 text-emerald-400" />
                    ) : (
                      <XCircle className="size-6 text-orange-400" />
                    )}
                    <div>
                      <p
                        className={clsx(
                          "font-semibold",
                          canComplete ? "text-emerald-300" : "text-orange-300"
                        )}
                      >
                        {canComplete ? "Looks good" : "Needs work"}
                      </p>
                      <p className="text-sm text-slate-400">
                        {canComplete
                          ? "You can complete this challenge."
                          : "Go back, improve your solution and verify again."}
                      </p>
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-slate-300">
                    {feedback}
                  </div>

                  {completeError ? (
                    <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
                      {completeError}
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
                  {error ?? "Could not verify solution."}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end">
              {feedback && canComplete && !completed ? (
                <button
                  type="button"
                  onClick={markAsCompleted}
                  disabled={isCompleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompleting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="size-4" />
                  )}
                  Complete challenge
                </button>
              ) : null}

              {completed ? (
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
                >
                  <CheckCircle2 className="size-4" />
                  Done
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isPending || isCompleting}
                  className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back to challenge
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

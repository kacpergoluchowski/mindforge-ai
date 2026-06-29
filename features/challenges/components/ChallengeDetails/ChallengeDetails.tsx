import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  PlayCircle,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { startChallenge } from "../../actions/challengeActions";
import { createAiChallengeChat } from "@/features/ai-mentor/actions/aiMentorActions";
import type { ChallengeDetail } from "../../types/challenges.types";
import ChallengeAskAiButton from "./ChallengeAskAiButton";
import ChallengeSolutionReview from "./ChallengeSolutionReview";

type ChallengeDetailsProps = {
  challenge: ChallengeDetail;
};

export default function ChallengeDetails({ challenge }: ChallengeDetailsProps) {
  const isStarted = Boolean(challenge.status);
  const isCompleted = challenge.status === "completed";
  const status = challenge.status ?? "not_started";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/learn/challenges"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <TranslatedText
            fallback="Back to challenges"
            translationKey="challenges.backToChallenges"
          />
        </Link>

        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          <ChallengeStatusLabel status={status} />
        </span>
      </div>

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424]">
        <div className="border-b border-white/10 bg-white/[0.02] px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">
              {challenge.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300">
              <ChallengeDifficultyLabel difficulty={challenge.difficulty} />
            </span>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              {challenge.aiFeedback ? (
                <TranslatedText
                  fallback="AI reviewed"
                  translationKey="challenges.aiReviewed"
                />
              ) : (
                <TranslatedText
                  fallback="AI ready"
                  translationKey="challenges.aiReady"
                />
              )}
            </span>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/20 sm:flex">
                <Flag className="size-7" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-violet-300">
                  <TranslatedText
                    fallback="Challenge workspace"
                    translationKey="challenges.challengeWorkspace"
                  />
                </p>
                <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  {challenge.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
                  {challenge.description}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <ChallengeMetric
                icon={Clock3}
                label={
                  <TranslatedText fallback="Time" translationKey="challenges.time" />
                }
                value={
                  challenge.duration ?? (
                    <TranslatedText
                      fallback="Practice"
                      translationKey="challenges.practice"
                    />
                  )
                }
              />
              <ChallengeMetric
                icon={Trophy}
                label={
                  <TranslatedText
                    fallback="Reward"
                    translationKey="challenges.reward"
                  />
                }
                value={`${challenge.points} XP`}
              />
              <ChallengeMetric
                icon={Star}
                label={
                  <TranslatedText
                    fallback="Rating"
                    translationKey="challenges.rating"
                  />
                }
                value={challenge.rating}
              />
              <ChallengeMetric
                icon={Users}
                label={
                  <TranslatedText
                    fallback="Solvers"
                    translationKey="challenges.solvers"
                  />
                }
                value={challenge.participants}
              />
            </div>
          </div>

          <aside className="border-t border-white/10 bg-[#111a2d]/80 p-6 lg:border-l lg:border-t-0">
            <StatusPanel
              challenge={challenge}
              isCompleted={isCompleted}
              isStarted={isStarted}
              status={status}
            />
          </aside>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-6">
          <WorkspacePanel
            icon={Target}
            title={
              <TranslatedText
                fallback="Task brief"
                translationKey="challenges.taskBrief"
              />
            }
          >
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm font-semibold text-white">
                  <TranslatedText
                    fallback="What you need to build"
                    translationKey="challenges.whatToBuild"
                  />
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  <TranslatedText
                    fallback="Build this challenge as a real frontend task. Your solution should be readable, responsive and close to something you could show in a portfolio."
                    translationKey="challenges.whatToBuildDescription"
                  />
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  <TranslatedText
                    fallback="Paste your HTML, CSS, JavaScript or notes in the editor below. AI will verify the result and return feedback."
                    translationKey="challenges.pasteSolutionDescription"
                  />
                </p>
              </div>

              <div className="space-y-3">
                {challenge.requirements.map((item, index) => (
                  <RequirementStep
                    key={item}
                    index={index + 1}
                    text={item}
                  />
                ))}
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            icon={PlayCircle}
            title={
              <TranslatedText
                fallback="Solution workspace"
                translationKey="challenges.solutionWorkspace"
              />
            }
          >
            <ChallengeSolutionReview
              challengeId={challenge.id}
              xpReward={challenge.points}
              starterCode={challenge.starterCode}
              initialSolution={challenge.userSolution}
              initialFeedback={challenge.aiFeedback}
              initialVerdict={challenge.aiVerdict}
              alreadyCompleted={isCompleted}
            />
          </WorkspacePanel>
        </main>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <WorkspacePanel
            icon={CheckCircle2}
            title={
              <TranslatedText
                fallback="Acceptance criteria"
                translationKey="challenges.acceptanceCriteria"
              />
            }
          >
            <Checklist items={challenge.checklist} />
          </WorkspacePanel>

          {challenge.solutionNotes ? (
            <WorkspacePanel
              icon={FileText}
              title={
                <TranslatedText
                  fallback="Review guide"
                  translationKey="challenges.reviewGuide"
                />
              }
            >
              <p className="text-sm leading-7 text-slate-300">
                {challenge.solutionNotes}
              </p>
            </WorkspacePanel>
          ) : null}
        </aside>
      </section>
    </div>
  );
}

type StatusPanelProps = {
  challenge: ChallengeDetail;
  isCompleted: boolean;
  isStarted: boolean;
  status: NonNullable<ChallengeDetail["status"]> | "not_started";
};

function StatusPanel({
  challenge,
  isCompleted,
  isStarted,
  status,
}: StatusPanelProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <Flag className="size-5" />
        </div>
        <div>
          <p className="font-semibold text-white">
            <TranslatedText
              fallback="Challenge status"
              translationKey="challenges.challengeStatus"
            />
          </p>
          <p className="text-sm text-slate-400">
            <ChallengeStatusLabel status={status} />
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            <TranslatedText
              fallback="Progress"
              translationKey="learningPaths.progress"
            />
          </span>
          <span className="font-semibold text-white">
            {challenge.progress}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${challenge.progress}%` }}
          />
        </div>
      </div>

      {isCompleted ? (
        <span className="mt-5 flex w-full items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-300">
          <TranslatedText fallback="Completed" translationKey="common.completed" />
        </span>
      ) : (
        <form action={startChallenge} className="mt-5">
          <input type="hidden" name="challengeId" value={challenge.id} />
          <input type="hidden" name="challengeSlug" value={challenge.slug} />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
          >
            <PlayCircle className="size-5" />
            {isStarted ? (
              <TranslatedText
                fallback="Continue Challenge"
                translationKey="challenges.continueChallenge"
              />
            ) : (
              <TranslatedText
                fallback="Start Challenge"
                translationKey="challenges.startChallenge"
              />
            )}
          </button>
        </form>
      )}

      <form action={createAiChallengeChat} className="mt-3">
        <input type="hidden" name="challengeId" value={challenge.id} />
        <ChallengeAskAiButton />
      </form>
    </div>
  );
}

type WorkspacePanelProps = {
  children: ReactNode;
  icon: LucideIcon;
  title: ReactNode;
};

function WorkspacePanel({ children, icon: Icon, title }: WorkspacePanelProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <Icon className="size-5" />
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="p-5">{children}</div>
    </article>
  );
}

type ChallengeMetricProps = {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
};

function ChallengeMetric({ icon: Icon, label, value }: ChallengeMetricProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Icon className="size-4 text-violet-300" />
        {label}
      </div>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function RequirementStep({ index, text }: { index: number; text: string }) {
  return (
    <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-bold text-violet-300">
        {index}
      </div>
      <p className="self-center text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  if (!items.length) {
    return (
      <p className="text-sm leading-6 text-slate-400">
        <TranslatedText
          fallback="No checklist yet."
          translationKey="challenges.noChecklist"
        />
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ChallengeStatusLabel({
  status,
}: {
  status: NonNullable<ChallengeDetail["status"]> | "not_started";
}) {
  const labels: Record<
    NonNullable<ChallengeDetail["status"]> | "not_started",
    { fallback: string; translationKey: string }
  > = {
    completed: {
      fallback: "Completed",
      translationKey: "common.completed",
    },
    in_progress: {
      fallback: "In progress",
      translationKey: "common.inProgress",
    },
    not_started: {
      fallback: "Not started",
      translationKey: "challenges.notStarted",
    },
    submitted: {
      fallback: "Submitted",
      translationKey: "challenges.submitted",
    },
  };
  const label = labels[status];

  return (
    <TranslatedText
      fallback={label.fallback}
      translationKey={label.translationKey}
    />
  );
}

function ChallengeDifficultyLabel({
  difficulty,
}: {
  difficulty: ChallengeDetail["difficulty"];
}) {
  const keys: Record<ChallengeDetail["difficulty"], string> = {
    Beginner: "common.beginner",
    Easy: "challenges.difficulty.easy",
    Hard: "challenges.difficulty.hard",
    Medium: "challenges.difficulty.medium",
  };

  return (
    <TranslatedText fallback={difficulty} translationKey={keys[difficulty]} />
  );
}

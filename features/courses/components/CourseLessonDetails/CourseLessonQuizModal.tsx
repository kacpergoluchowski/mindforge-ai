"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Trophy,
  X,
  XCircle,
} from "lucide-react";

import { submitLessonQuiz } from "../../actions/courseActions";
import type { CourseLesson } from "../../types/courses.types";
import { passingQuizScore, quizQuestionCount } from "../../utils/lessonQuiz";

type CourseLessonQuizModalProps = {
  courseId: string;
  courseSlug: string;
  disabled?: boolean;
  disabledReason?: string;
  lesson: CourseLesson;
  nextLessonTitle: string | null;
  nextLessonSlug: string;
};

type QuizResult = {
  passed: boolean;
  saved?: boolean;
  score: number;
};

export default function CourseLessonQuizModal({
  courseId,
  courseSlug,
  disabled = false,
  disabledReason = "Complete the required steps first.",
  lesson,
  nextLessonTitle,
  nextLessonSlug,
}: CourseLessonQuizModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSaving, startSaving] = useTransition();

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const allAnswered = answeredQuestions === quizQuestionCount;
  const score = useMemo(() => {
    return lesson.quizQuestions.reduce((total, question) => {
      return selectedAnswers[question.id] === question.correctOptionId
        ? total + 1
        : total;
    }, 0);
  }, [lesson.quizQuestions, selectedAnswers]);

  function openModal() {
    if (disabled) {
      return;
    }

    setOpen(true);
    setResult(null);
  }

  function closeModal() {
    setOpen(false);
    setResult(null);
  }

  function selectAnswer(questionId: string, optionId: string) {
    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionId,
    }));
    setResult(null);
  }

  function checkAnswers() {
    if (!allAnswered) {
      return;
    }

    setResult({
      passed: score >= passingQuizScore,
      score,
    });
  }

  function tryAgain() {
    setSelectedAnswers({});
    setResult(null);
  }

  function completeLesson() {
    const formData = new FormData();
    formData.set("courseId", courseId);
    formData.set("courseSlug", courseSlug);
    formData.set("lessonId", lesson.id);
    formData.set("lessonSlug", lesson.slug);

    lesson.quizQuestions.forEach((question) => {
      formData.set(
        `question_${question.id}`,
        selectedAnswers[question.id] ?? ""
      );
    });

    startSaving(async () => {
      const saveResult = await submitLessonQuiz(formData);

      setResult({
        passed: saveResult.passed,
        saved: saveResult.passed,
        score: saveResult.score,
      });
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        disabled={disabled}
        title={disabled ? disabledReason : undefined}
        className="flex w-full items-center justify-center rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        {disabled ? "Quiz locked" : "Take quiz"}
      </button>

      {disabled ? (
        <p className="mt-2 text-center text-xs leading-5 text-slate-500">
          {disabledReason}
        </p>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[92dvh] w-full max-w-4xl min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 p-4 sm:gap-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-violet-300">
                  Lesson Quiz
                </p>
                <h2 className="mt-1 break-words text-lg font-semibold text-white sm:text-xl">
                  {lesson.title}
                </h2>
                <p className="mt-2 text-sm text-slate-400 break-words">
                  Score at least {passingQuizScore}/{quizQuestionCount} to
                  complete this lesson.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:border-white/20 hover:text-white"
                aria-label="Close quiz"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-4 sm:p-5">
              <div className="space-y-5">
                {lesson.quizQuestions.map((question, index) => (
                  <fieldset
                    key={question.id}
                    className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4"
                  >
                    <legend className="break-words text-sm font-semibold text-white">
                      {index + 1}. {question.question}
                    </legend>

                    <div className="mt-4 grid gap-3">
                      {question.options.map((option) => {
                        const selectedOptionId = selectedAnswers[question.id];
                        const isSelected = selectedOptionId === option.id;
                        const isCorrect = question.correctOptionId === option.id;
                        const isWrongSelection =
                          Boolean(result) && isSelected && !isCorrect;

                        return (
                          <label
                            key={option.id}
                            className={clsx(
                              "flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition",
                              result && isCorrect
                                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                                : "border-white/10 bg-[#111a2d] text-slate-300 hover:border-violet-400/40 hover:text-white",
                              isSelected && !result
                                ? "border-violet-400/60 bg-violet-500/10 text-white"
                                : null,
                              isWrongSelection
                                ? "border-red-400/40 bg-red-500/10 text-red-100"
                                : null
                            )}
                          >
                            <input
                              required
                              type="radio"
                              name={question.id}
                              value={option.id}
                              checked={isSelected}
                              onChange={() => selectAnswer(question.id, option.id)}
                              className="mt-1 accent-violet-500"
                            />
                            <span className="min-w-0 break-words">
                              {option.text}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>

              <div className="sticky bottom-0 mt-6 min-w-0 rounded-2xl border border-white/10 bg-[#0d1424]/95 p-3 backdrop-blur sm:p-4">
                {result ? (
                  result.passed ? (
                    <QuizPassedSummary
                      nextLessonTitle={nextLessonTitle}
                      score={result.score}
                      xpReward={lesson.xpReward}
                    />
                  ) : (
                    <QuizFailedSummary score={result.score} />
                  )
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  {result?.passed ? (
                    result.saved ? (
                      nextLessonSlug ? (
                        <Link
                          href={`/learn/courses/${courseSlug}/lessons/${nextLessonSlug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
                        >
                          Next Lesson
                          <ArrowRight className="size-4" />
                        </Link>
                      ) : (
                        <Link
                          href={`/learn/courses/${courseSlug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
                        >
                          Back to course
                          <ArrowRight className="size-4" />
                        </Link>
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={completeLesson}
                        disabled={isSaving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : null}
                        {nextLessonSlug ? "Claim XP" : "Complete course"}
                      </button>
                    )
                  ) : result ? (
                    <button
                      type="button"
                      onClick={tryAgain}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
                    >
                      <RotateCcw className="size-4" />
                      Try again
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={checkAnswers}
                      disabled={!allAnswered}
                      className="rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Check answers
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type QuizPassedSummaryProps = {
  nextLessonTitle: string | null;
  score: number;
  xpReward: number;
};

function QuizPassedSummary({
  nextLessonTitle,
  score,
  xpReward,
}: QuizPassedSummaryProps) {
  return (
    <div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-white">Quiz passed</p>
          <p className="mt-1 text-emerald-100/80">
            Score: {score}/{quizQuestionCount}. Read this summary, claim your XP,
            then choose when to continue.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-400/20 bg-slate-950/20 p-3">
              <div className="flex items-center gap-2 text-xs text-emerald-100/70">
                <Trophy className="size-4" />
                Reward
              </div>
              <p className="mt-1 font-semibold text-white">+{xpReward} XP</p>
            </div>

            <div className="rounded-xl border border-emerald-400/20 bg-slate-950/20 p-3">
              <p className="text-xs text-emerald-100/70">Next</p>
              <p className="mt-1 line-clamp-2 font-semibold text-white">
                {nextLessonTitle ?? "Course summary"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type QuizFailedSummaryProps = {
  score: number;
};

function QuizFailedSummary({ score }: QuizFailedSummaryProps) {
  return (
    <div className="mb-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
      <div className="flex items-start gap-3">
        <XCircle className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="font-semibold text-white">Quiz not passed</p>
          <p className="mt-1">
            Score: {score}/{quizQuestionCount}. You need at least{" "}
            {passingQuizScore}/{quizQuestionCount}. Review the highlighted
            answers and try again.
          </p>
        </div>
      </div>
    </div>
  );
}

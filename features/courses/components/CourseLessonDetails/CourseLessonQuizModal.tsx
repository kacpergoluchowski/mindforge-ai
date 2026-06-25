"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { CheckCircle2, X } from "lucide-react";

import { submitLessonQuiz } from "../../actions/courseActions";
import type { CourseLesson } from "../../types/courses.types";
import { passingQuizScore, quizQuestionCount } from "../../utils/lessonQuiz";

type CourseLessonQuizModalProps = {
  courseId: string;
  courseSlug: string;
  lesson: CourseLesson;
  nextLessonSlug: string;
};

type QuizResult = {
  passed: boolean;
  score: number;
};

export default function CourseLessonQuizModal({
  courseId,
  courseSlug,
  lesson,
  nextLessonSlug,
}: CourseLessonQuizModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

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

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex w-full items-center justify-center rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
      >
        Take quiz
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <p className="text-sm font-medium text-violet-300">
                  Lesson Quiz
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  {lesson.title}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
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

            <form action={submitLessonQuiz} className="min-h-0 overflow-y-auto p-5">
              <input type="hidden" name="courseId" value={courseId} />
              <input type="hidden" name="courseSlug" value={courseSlug} />
              <input type="hidden" name="lessonId" value={lesson.id} />
              <input type="hidden" name="lessonSlug" value={lesson.slug} />
              <input type="hidden" name="nextLessonSlug" value={nextLessonSlug} />

              <div className="space-y-5">
                {lesson.quizQuestions.map((question, index) => (
                  <fieldset
                    key={question.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <legend className="text-sm font-semibold text-white">
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
                              "flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition",
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
                              name={`question_${question.id}`}
                              value={option.id}
                              checked={isSelected}
                              onChange={() => selectAnswer(question.id, option.id)}
                              className="mt-1 accent-violet-500"
                            />
                            <span>{option.text}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>

              <div className="sticky bottom-0 mt-6 rounded-2xl border border-white/10 bg-[#0d1424]/95 p-4 backdrop-blur">
                {result ? (
                  <div
                    className={clsx(
                      "mb-4 rounded-xl border p-4 text-sm",
                      result.passed
                        ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                        : "border-red-400/20 bg-red-500/10 text-red-200"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {result.passed ? (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                      ) : null}
                      <div>
                        <p className="font-semibold">
                          {result.passed ? "Quiz passed" : "Quiz not passed"}
                        </p>
                        <p className="mt-1">
                          Your score: {result.score}/{quizQuestionCount}.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  {result?.passed ? (
                    <button
                      type="submit"
                      className="rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
                    >
                      Complete lesson
                    </button>
                  ) : result ? (
                    <button
                      type="button"
                      onClick={tryAgain}
                      className="rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600"
                    >
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
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

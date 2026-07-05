import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Clock3,
  FileText,
  ListChecks,
  PlayCircle,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { createAiLessonChat } from "@/features/ai-mentor/actions/aiMentorActions";
import { completeLessonPractice } from "../../actions/courseActions";
import type { CourseDetail, CourseLesson } from "../../types/courses.types";
import AskAiMentorButton from "./AskAiMentorButton";
import CourseLessonQuizModal from "./CourseLessonQuizModal";
import PracticeReviewModal from "./PracticeReviewModal";

type CourseLessonDetailsProps = {
  course: CourseDetail;
  lesson: CourseLesson;
};

export default function CourseLessonDetails({
  course,
  lesson,
}: CourseLessonDetailsProps) {
  const lessons = course.modules.flatMap((module) => module.lessons);
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = lessons[lessonIndex + 1];
  const availableNextLesson = nextLesson?.locked ? null : nextLesson;
  const lessonNumber = lessonIndex + 1;
  const lessonProgress = Math.round((lessonNumber / lessons.length) * 100);
  const contentBlocks = formatContent(lesson.content);
  const practiceTasks = getPracticeTasks(lesson);

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <Link
        href={`/learn/courses/${course.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        <TranslatedText
          fallback="Back to course"
          translationKey="courses.lesson.backToCourse"
        />
      </Link>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap gap-3">
              <span className="max-w-full break-words rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {course.title}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300">
                <LessonTypeLabel type={lesson.type} />
              </span>
            </div>

            <h1 className="mt-5 break-words text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {lesson.title}
            </h1>

            <p className="mt-4 max-w-2xl break-words text-sm leading-7 text-slate-400 sm:text-base">
              {lesson.summary}
            </p>
          </div>

          <div className="grid w-full min-w-0 gap-3 text-sm text-slate-300 sm:grid-cols-3 lg:min-w-52 lg:grid-cols-1">
            <LessonMeta
              icon={FileText}
              label={
                <TranslatedText
                  fallback="Lesson"
                  translationKey="courses.lesson.lesson"
                />
              }
              value={`${lessonNumber}/${lessons.length}`}
            />
            <LessonMeta
              icon={Clock3}
              label={
                <TranslatedText
                  fallback="Duration"
                  translationKey="courses.duration"
                />
              }
              value={lesson.duration}
            />
            <LessonMeta
              icon={Trophy}
              label={
                <TranslatedText
                  fallback="Reward"
                  translationKey="courses.lesson.reward"
                />
              }
              value={`${lesson.xpReward} XP`}
            />
          </div>
        </div>
      </section>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-6">
          <LessonCard
            icon={Target}
            title={
              <TranslatedText
                fallback="Objective"
                translationKey="courses.lesson.objective"
              />
            }
          >
            <p className="text-base leading-8 text-slate-300">
              {lesson.objective ?? (
                <TranslatedText
                  fallback="Understand the main concept and apply it in practice."
                  translationKey="courses.lesson.defaultObjective"
                />
              )}
            </p>
          </LessonCard>

          <LessonCard
            icon={FileText}
            title={
              <TranslatedText
                fallback="Lesson Content"
                translationKey="courses.lesson.content"
              />
            }
          >
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {contentBlocks.map((block, index) => (
                <LessonContentBlock
                  key={`${block.type}-${index}`}
                  block={block}
                  highlighted={index === 0}
                />
              ))}
            </div>
          </LessonCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <LessonCard
              icon={ClipboardCheck}
              title={
                <TranslatedText
                  fallback="Checklist"
                  translationKey="courses.lesson.checklist"
                />
              }
            >
              {lesson.checklist.length ? (
                <LessonList items={lesson.checklist} />
              ) : (
                <p className="text-sm text-slate-400">
                  <TranslatedText
                    fallback="Complete the lesson and make sure you understand the key idea."
                    translationKey="courses.lesson.emptyChecklist"
                  />
                </p>
              )}
            </LessonCard>

            <LessonCard
              icon={ListChecks}
              title={
                <TranslatedText
                  fallback="Practice Task"
                  translationKey="courses.lesson.practiceTask"
                />
              }
            >
              <PracticeTask
                courseId={course.id}
                courseSlug={course.slug}
                lesson={lesson}
                tasks={practiceTasks}
              />
            </LessonCard>
          </div>

          <LessonCard
            icon={PlayCircle}
            title={
              <TranslatedText
                fallback="Finish this lesson"
                translationKey="courses.lesson.finishLesson"
              />
            }
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold text-white">
                  <TranslatedText
                    fallback="Ready to check your knowledge?"
                    translationKey="courses.lesson.readyToCheck"
                  />
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  <TranslatedText
                    fallback="Complete the practice task, then pass the quiz with at least 4 correct answers to unlock the next lesson and earn XP."
                    translationKey="courses.lesson.finishInstruction"
                  />
                </p>
              </div>

              <div className="w-full shrink-0 lg:w-56">
                {lesson.completed ? (
                  <CompletedBadge />
                ) : (
                  <CourseLessonQuizModal
                    key={lesson.id}
                    courseId={course.id}
                    courseSlug={course.slug}
                    lesson={lesson}
                    nextLessonTitle={nextLesson?.title ?? null}
                    nextLessonSlug={nextLesson?.slug ?? ""}
                    disabled={!lesson.practiceCompleted}
                  />
                )}
              </div>
            </div>
          </LessonCard>
        </main>

        <LessonProgressPanel
          availableNextLesson={availableNextLesson}
          courseId={course.id}
          courseSlug={course.slug}
          lesson={lesson}
          lessonNumber={lessonNumber}
          lessonProgress={lessonProgress}
          totalLessons={lessons.length}
        />
      </div>
    </div>
  );
}

type LessonProgressPanelProps = {
  availableNextLesson?: CourseLesson | null;
  courseId: string;
  courseSlug: string;
  lesson: CourseLesson;
  lessonNumber: number;
  lessonProgress: number;
  totalLessons: number;
};

function LessonProgressPanel({
  availableNextLesson,
  courseId,
  courseSlug,
  lesson,
  lessonNumber,
  lessonProgress,
  totalLessons,
}: LessonProgressPanelProps) {
  return (
    <aside className="min-w-0 rounded-2xl border border-white/10 bg-[#111a2d]/80 p-4 sm:p-5 xl:sticky xl:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            <TranslatedText
              fallback="Lesson Progress"
              translationKey="courses.lesson.lessonProgress"
            />
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            <TranslatedText
              fallback="Lesson {current} of {total}"
              translationKey="courses.lesson.lessonCounter"
              values={{ current: lessonNumber, total: totalLessons }}
            />
          </p>
        </div>

        {lesson.completed ? (
          <CheckCircle2 className="size-6 text-emerald-400" />
        ) : (
          <PlayCircle className="size-6 text-violet-300" />
        )}
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-violet-500"
          style={{ width: `${lessonProgress}%` }}
        />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <ProgressRow
          label={
            <TranslatedText
              fallback="Status"
              translationKey="courses.lesson.status"
            />
          }
          value={
            lesson.completed ? (
              <TranslatedText
                fallback="Completed"
                translationKey="common.completed"
              />
            ) : (
              <TranslatedText
                fallback="In progress"
                translationKey="common.inProgress"
              />
            )
          }
          valueClassName={lesson.completed ? "text-emerald-400" : "text-violet-300"}
        />
        <ProgressRow
          label={
            <TranslatedText fallback="Type" translationKey="courses.lesson.type" />
          }
          value={<LessonTypeLabel type={lesson.type} />}
        />
        <ProgressRow
          label={
            <TranslatedText fallback="Duration" translationKey="courses.duration" />
          }
          value={lesson.duration}
        />
        <ProgressRow
          label={
            <TranslatedText
              fallback="Reward"
              translationKey="courses.lesson.reward"
            />
          }
          value={`${lesson.xpReward} XP`}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-sm font-semibold text-white">
          <TranslatedText
            fallback="How to finish"
            translationKey="courses.lesson.howToFinishTitle"
          />
        </p>
        <p className="mt-2 break-words text-sm leading-6 text-slate-400">
          <TranslatedText
            fallback="Read the lesson, complete the practice task, then pass the quiz at the bottom of the page."
            translationKey="courses.lesson.howToFinish"
          />
        </p>
      </div>

      <form action={createAiLessonChat} className="mt-4">
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="lessonId" value={lesson.id} />
        <AskAiMentorButton />
      </form>

      {availableNextLesson ? (
        <Link
          href={`/learn/courses/${courseSlug}/lessons/${availableNextLesson.slug}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
        >
          <TranslatedText
            fallback="Next Lesson"
            translationKey="courses.lesson.nextLesson"
          />
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </aside>
  );
}

type LessonContentBlockProps = {
  block: LessonContentBlock;
  highlighted: boolean;
};

function LessonContentBlock({ block, highlighted }: LessonContentBlockProps) {
  if (block.type === "mini-task") {
    return (
      <div className="min-w-0 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <ListChecks className="size-4" />
          </div>
          <p className="font-semibold text-white">
            <TranslatedText
              fallback="Mini task"
              translationKey="courses.lesson.miniTask"
            />
          </p>
        </div>

        <p className="break-words text-sm leading-7 text-emerald-50/90">
          {block.content}
        </p>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-medium text-slate-300">
          <Code2 className="size-4 text-violet-300" />
          <TranslatedText
            fallback="Code example"
            translationKey="courses.lesson.codeExample"
          />
        </div>
        <pre className="max-w-full overflow-x-auto p-4 text-xs leading-6 text-slate-200 sm:text-sm">
          <code>{block.content}</code>
        </pre>
      </div>
    );
  }

  return (
    <p
      className={clsx(
        "break-words",
        highlighted &&
          "rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 text-slate-200 sm:p-5"
      )}
    >
      {block.content}
    </p>
  );
}

type PracticeTaskProps = {
  courseId: string;
  courseSlug: string;
  lesson: CourseLesson;
  tasks: string[];
};

function PracticeTask({
  courseId,
  courseSlug,
  lesson,
  tasks,
}: PracticeTaskProps) {
  return (
    <div className="space-y-5">
      <LessonList items={tasks} />

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-semibold text-white">
              {lesson.practiceCompleted ? (
                <TranslatedText
                  fallback="Practice completed"
                  translationKey="courses.lesson.practiceCompleted"
                />
              ) : (
                <TranslatedText
                  fallback="Finish the practical task"
                  translationKey="courses.lesson.finishPracticeTask"
                />
              )}
            </p>
            <p className="mt-1 break-words text-sm leading-6 text-slate-400">
              {lesson.practiceCompleted ? (
                <TranslatedText
                  fallback="You can now take the quiz for this lesson."
                  translationKey="courses.lesson.practiceCompletedDescription"
                />
              ) : (
                <TranslatedText
                  fallback="Do the task in your editor, check it in the browser, then mark it as done."
                  translationKey="courses.lesson.practiceTodoDescription"
                />
              )}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <PracticeReviewModal
              courseId={courseId}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
            />

            {lesson.practiceCompleted ? (
              <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
                <CheckCircle2 className="size-4" />
                <TranslatedText fallback="Done" translationKey="common.completed" />
              </span>
            ) : (
              <form action={completeLessonPractice} className="shrink-0">
                <input type="hidden" name="courseId" value={courseId} />
                <input type="hidden" name="courseSlug" value={courseSlug} />
                <input type="hidden" name="lessonId" value={lesson.id} />
                <input type="hidden" name="lessonSlug" value={lesson.slug} />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 sm:w-auto"
                >
                  <ClipboardCheck className="size-4" />
                  <TranslatedText
                    fallback="Mark practice as done"
                    translationKey="courses.lesson.markPracticeDone"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type LessonCardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  icon: LucideIcon;
  title: ReactNode;
};

function LessonCard({
  children,
  className,
  id,
  icon: Icon,
  title,
}: LessonCardProps) {
  return (
    <section
      id={id}
      className={clsx(
        "min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 p-4 sm:p-6 md:p-8",
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <Icon className="size-5" />
        </div>
        <h2 className="min-w-0 break-words text-lg font-semibold text-white sm:text-xl">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

type LessonMetaProps = {
  icon: LucideIcon;
  label: ReactNode;
  value: string;
};

function LessonMeta({ icon: Icon, label, value }: LessonMetaProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <Icon className="size-4 text-violet-400" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="break-words font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

type LessonListProps = {
  items: string[];
};

function LessonList({ items }: LessonListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 gap-3 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

type ProgressRowProps = {
  label: ReactNode;
  value: ReactNode;
  valueClassName?: string;
};

function ProgressRow({ label, value, valueClassName }: ProgressRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-400">{label}</span>
      <span className={clsx("break-words text-right font-medium text-slate-300", valueClassName)}>
        {value}
      </span>
    </div>
  );
}

function CompletedBadge() {
  return (
    <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-300">
      <CheckCircle2 className="size-5" />
      <TranslatedText fallback="Completed" translationKey="common.completed" />
    </span>
  );
}

function LessonTypeLabel({ type }: { type: string }) {
  const labels: Record<string, { fallback: string; translationKey: string }> = {
    exercise: {
      fallback: "Exercise",
      translationKey: "courses.lesson.types.exercise",
    },
    final_project: {
      fallback: "Final Project",
      translationKey: "courses.lesson.types.finalProject",
    },
    lesson: {
      fallback: "Lesson",
      translationKey: "courses.lesson.types.lesson",
    },
    project: {
      fallback: "Project",
      translationKey: "courses.lesson.types.project",
    },
  };
  const label = labels[type] ?? labels.lesson;

  return (
    <TranslatedText
      fallback={label.fallback}
      translationKey={label.translationKey}
    />
  );
}

type LessonContentBlock =
  | {
      content: string;
      type: "code" | "mini-task" | "paragraph";
    };

function formatContent(content: string): LessonContentBlock[] {
  const normalizedContent = content
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();
  const blocks: LessonContentBlock[] = [];
  let remainingContent = normalizedContent;

  while (remainingContent.length) {
    const codeIndex = remainingContent.indexOf("```");
    const taskIndex = remainingContent.indexOf("Mini task:");
    const nextIndex = getNextSpecialBlockIndex(codeIndex, taskIndex);

    if (nextIndex === -1) {
      pushParagraphBlocks(blocks, remainingContent);
      break;
    }

    if (nextIndex > 0) {
      pushParagraphBlocks(blocks, remainingContent.slice(0, nextIndex));
      remainingContent = remainingContent.slice(nextIndex);
      continue;
    }

    if (remainingContent.startsWith("```")) {
      const closingIndex = remainingContent.indexOf("```", 3);

      if (closingIndex === -1) {
        pushParagraphBlocks(blocks, remainingContent);
        break;
      }

      const rawCode = remainingContent.slice(3, closingIndex);
      blocks.push({
        content: rawCode.replace(/^[a-z]+\n/, "").trim(),
        type: "code",
      });
      remainingContent = remainingContent.slice(closingIndex + 3).trim();
      continue;
    }

    const nextCodeIndex = remainingContent.indexOf("```", "Mini task:".length);
    const nextTaskIndex = remainingContent.indexOf(
      "Mini task:",
      "Mini task:".length
    );
    const nextBlockIndex = getNextSpecialBlockIndex(nextCodeIndex, nextTaskIndex);
    const taskContent =
      nextBlockIndex === -1
        ? remainingContent
        : remainingContent.slice(0, nextBlockIndex);

    blocks.push({
      content: taskContent.replace("Mini task:", "").trim(),
      type: "mini-task",
    });
    remainingContent =
      nextBlockIndex === -1 ? "" : remainingContent.slice(nextBlockIndex).trim();
  }

  return blocks;
}

function getNextSpecialBlockIndex(
  codeIndex: number,
  taskIndex: number
): number {
  const indexes = [codeIndex, taskIndex].filter((index) => index >= 0);

  return indexes.length ? Math.min(...indexes) : -1;
}

function pushParagraphBlocks(
  blocks: LessonContentBlock[],
  content: string
) {
  content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .forEach((paragraph) => {
      blocks.push({
        content: paragraph,
        type: "paragraph",
      });
    });
}

function getPracticeTasks(lesson: CourseLesson): string[] {
  if (lesson.checklist.length) {
    return lesson.checklist.map((item) => `Practice: ${item}`);
  }

  return [
    "Create a small example based on the lesson topic.",
    "Check your work in the browser or developer tools.",
    "Write down one thing that was unclear before taking the quiz.",
  ];
}

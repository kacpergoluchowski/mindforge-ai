import Link from "next/link";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Clock3,
  FileText,
  Lightbulb,
  ListChecks,
  PlayCircle,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { completeLessonPractice } from "../../actions/courseActions";
import type { CourseDetail, CourseLesson } from "../../types/courses.types";
import CourseLessonQuizModal from "./CourseLessonQuizModal";

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
  const keyConcepts = getKeyConcepts(lesson);
  const practiceTasks = getPracticeTasks(lesson);

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <Link
        href={`/learn/courses/${course.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to course
      </Link>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap gap-3">
              <span className="max-w-full break-words rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {course.title}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300">
                {formatLessonType(lesson.type)}
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
            <LessonMeta icon={FileText} label="Lesson" value={`${lessonNumber}/${lessons.length}`} />
            <LessonMeta icon={Clock3} label="Duration" value={lesson.duration} />
            <LessonMeta icon={Trophy} label="Reward" value={`${lesson.xpReward} XP`} />
          </div>
        </div>
      </section>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-6">
          <LessonCard icon={Target} title="Objective">
            <p className="text-base leading-8 text-slate-300">
              {lesson.objective ??
                "Understand the main concept and apply it in practice."}
            </p>
          </LessonCard>

          <LessonCard icon={FileText} title="Lesson Content">
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
            <LessonCard icon={Lightbulb} title="Key Concepts">
              <LessonList items={keyConcepts} />
            </LessonCard>

            <LessonCard icon={ListChecks} title="Practice Task">
              <PracticeTask
                courseId={course.id}
                courseSlug={course.slug}
                lesson={lesson}
                tasks={practiceTasks}
              />
            </LessonCard>
          </div>

          <LessonCard icon={ClipboardCheck} title="Checklist">
            {lesson.checklist.length ? (
              <LessonList items={lesson.checklist} />
            ) : (
              <p className="text-sm text-slate-400">
                Complete the lesson and make sure you understand the key idea.
              </p>
            )}
          </LessonCard>

          <LessonCard icon={PlayCircle} title="Finish this lesson">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold text-white">
                  Ready to check your knowledge?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Complete the practice task, then pass the quiz with at least
                  4 correct answers to unlock the next lesson and earn XP.
                </p>
              </div>

              <div className="w-full shrink-0 lg:w-56">
                {lesson.completed ? (
                  <CompletedBadge />
                ) : (
                  <CourseLessonQuizModal
                    courseId={course.id}
                    courseSlug={course.slug}
                    lesson={lesson}
                    nextLessonTitle={nextLesson?.title ?? null}
                    nextLessonSlug={nextLesson?.slug ?? ""}
                    disabled={!lesson.practiceCompleted}
                    disabledReason="Complete the practice task first."
                  />
                )}
              </div>
            </div>
          </LessonCard>
        </main>

        <LessonProgressPanel
          availableNextLesson={availableNextLesson}
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
  courseSlug: string;
  lesson: CourseLesson;
  lessonNumber: number;
  lessonProgress: number;
  totalLessons: number;
};

function LessonProgressPanel({
  availableNextLesson,
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
          <h2 className="text-lg font-semibold text-white">Lesson Progress</h2>
          <p className="mt-1 text-sm text-slate-400">
            Lesson {lessonNumber} of {totalLessons}
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
          label="Status"
          value={lesson.completed ? "Completed" : "In progress"}
          valueClassName={lesson.completed ? "text-emerald-400" : "text-violet-300"}
        />
        <ProgressRow label="Type" value={formatLessonType(lesson.type)} />
        <ProgressRow label="Duration" value={lesson.duration} />
        <ProgressRow label="Reward" value={`${lesson.xpReward} XP`} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-sm font-semibold text-white">How to finish</p>
        <p className="mt-2 break-words text-sm leading-6 text-slate-400">
          Read the lesson, complete the practice task, then pass the quiz at the
          bottom of the page.
        </p>
      </div>

      {availableNextLesson ? (
        <Link
          href={`/learn/courses/${courseSlug}/lessons/${availableNextLesson.slug}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
        >
          Next Lesson
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
          <p className="font-semibold text-white">Mini task</p>
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
          Code example
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
              {lesson.practiceCompleted
                ? "Practice completed"
                : "Finish the practical task"}
            </p>
            <p className="mt-1 break-words text-sm leading-6 text-slate-400">
              {lesson.practiceCompleted
                ? "You can now take the quiz for this lesson."
                : "Do the task in your editor, check it in the browser, then mark it as done."}
            </p>
          </div>

          {lesson.practiceCompleted ? (
            <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
              <CheckCircle2 className="size-4" />
              Done
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
                Mark practice as done
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

type LessonCardProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  icon: LucideIcon;
  title: string;
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
  label: string;
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
  label: string;
  value: string;
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
      Completed
    </span>
  );
}

function formatLessonType(type: string): string {
  const labels: Record<string, string> = {
    exercise: "Exercise",
    final_project: "Final Project",
    lesson: "Lesson",
    project: "Project",
  };

  return labels[type] ?? "Lesson";
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

function getKeyConcepts(lesson: CourseLesson): string[] {
  if (lesson.checklist.length) {
    return lesson.checklist.slice(0, 4);
  }

  return [
    lesson.objective ?? "Understand the main concept of this lesson.",
    "Connect the theory with a small practical example.",
    "Prepare for the quiz before moving to the next lesson.",
  ];
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

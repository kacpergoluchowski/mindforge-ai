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
  const contentParagraphs = formatContent(lesson.content);
  const keyConcepts = getKeyConcepts(lesson);
  const practiceTasks = getPracticeTasks(lesson);

  return (
    <div className="space-y-8">
      <Link
        href={`/learn/courses/${course.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to course
      </Link>

      <section className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {course.title}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300">
                {formatLessonType(lesson.type)}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white md:text-4xl">
              {lesson.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              {lesson.summary}
            </p>
          </div>

          <div className="grid min-w-52 gap-3 text-sm text-slate-300">
            <LessonMeta icon={FileText} label="Lesson" value={`${lessonNumber}/${lessons.length}`} />
            <LessonMeta icon={Clock3} label="Duration" value={lesson.duration} />
            <LessonMeta icon={Trophy} label="Reward" value={`${lesson.xpReward} XP`} />
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-6">
          <LessonCard icon={Target} title="Objective">
            <p className="text-base leading-8 text-slate-300">
              {lesson.objective ??
                "Understand the main concept and apply it in practice."}
            </p>
          </LessonCard>

          <LessonCard icon={FileText} title="Lesson Content">
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {contentParagraphs.map((block, index) => (
                <LessonContentBlock
                  key={block}
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
              <LessonList items={practiceTasks} />
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
                  Pass the quiz with at least 4 correct answers to unlock the
                  next lesson and earn XP.
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
    <aside className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 xl:sticky xl:top-24">
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
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Read the lesson, complete the checklist, then pass the quiz at the
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
  block: string;
  highlighted: boolean;
};

function LessonContentBlock({ block, highlighted }: LessonContentBlockProps) {
  if (block.startsWith("Mini task:")) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <ListChecks className="size-4" />
          </div>
          <p className="font-semibold text-white">Mini task</p>
        </div>

        <p className="text-sm leading-7 text-emerald-50/90">
          {block.replace("Mini task:", "").trim()}
        </p>
      </div>
    );
  }

  if (block.startsWith("```") && block.endsWith("```")) {
    const code = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "").trim();

    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-medium text-slate-300">
          <Code2 className="size-4 text-violet-300" />
          Code example
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <p
      className={clsx(
        highlighted &&
          "rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5 text-slate-200"
      )}
    >
      {block}
    </p>
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
        "rounded-2xl border border-white/10 bg-[#111a2d]/80 p-6 md:p-8",
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <Icon className="size-5" />
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
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
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <Icon className="size-4 text-violet-400" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-medium text-white">{value}</p>
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
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" />
          <span>{item}</span>
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
      <span className={clsx("text-right font-medium text-slate-300", valueClassName)}>
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

function formatContent(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
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

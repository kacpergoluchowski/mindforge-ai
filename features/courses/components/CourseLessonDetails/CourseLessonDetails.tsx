import Link from "next/link";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Target,
  Trophy,
} from "lucide-react";

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

      <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <LessonCard className="h-full" icon={Target} title="Objective">
          <p className="text-base leading-8 text-slate-300">
            {lesson.objective ?? "Understand the main concept and apply it in practice."}
          </p>
        </LessonCard>

        <aside className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5">
          <h2 className="text-lg font-semibold text-white">Lesson Progress</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status</span>
              <span className={lesson.completed ? "text-emerald-400" : "text-violet-300"}>
                {lesson.completed ? "Completed" : "In progress"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Type</span>
              <span className="text-slate-300">{formatLessonType(lesson.type)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">XP</span>
              <span className="text-slate-300">{lesson.xpReward}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {lesson.completed ? (
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-300">
                <CheckCircle2 className="size-5" />
                Completed
              </span>
            ) : (
              <CourseLessonQuizModal
                courseId={course.id}
                courseSlug={course.slug}
                lesson={lesson}
                nextLessonSlug={nextLesson?.slug ?? ""}
              />
            )}

            {availableNextLesson ? (
              <Link
                href={`/learn/courses/${course.slug}/lessons/${availableNextLesson.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Next Lesson
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </aside>
      </div>

      <LessonCard icon={FileText} title="Lesson Content">
        <div className="space-y-4 text-base leading-8 text-slate-300">
          {formatContent(lesson.content).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </LessonCard>

      <LessonCard icon={ClipboardCheck} title="Checklist">
        {lesson.checklist.length ? (
          <ul className="space-y-3">
            {lesson.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-300">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Complete the lesson and make sure you understand the key idea.
          </p>
        )}
      </LessonCard>
    </div>
  );
}

type LessonCardProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  icon: typeof FileText;
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
  icon: typeof FileText;
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

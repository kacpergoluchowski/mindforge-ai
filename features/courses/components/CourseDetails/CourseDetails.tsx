import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  LayoutTemplate,
  Lock,
  PlayCircle,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import { startCourse } from "../../actions/courseActions";
import type { CourseDetail } from "../../types/courses.types";

type CourseDetailsProps = {
  course: CourseDetail;
};

export default function CourseDetails({ course }: CourseDetailsProps) {
  const firstLessonSlug = course.modules[0]?.lessons[0]?.slug;
  const nextLessonSlug =
    course.modules
      .flatMap((module) => module.lessons)
      .find((lesson) => !lesson.completed && !lesson.locked)?.slug ?? firstLessonSlug;
  const progress = course.userProgress?.progressPercent ?? 0;
  const courseStarted = Boolean(course.userProgress);
  const courseCompleted = course.userProgress?.status === "completed";
  const overview = getCourseOverview(course);

  return (
    <div className="space-y-8">
      <Link
        href="/learn/courses"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        <TranslatedText
          translationKey="courses.details.backToCourses"
          fallback="Back to courses"
        />
      </Link>

      <section className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {course.category}
            </span>

            <h1 className="mt-5 text-3xl font-bold text-white md:text-4xl">
              {course.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              {course.description}
            </p>
          </div>

          {nextLessonSlug && !courseCompleted ? (
            <form action={startCourse}>
              <input type="hidden" name="courseId" value={course.id} />
              <input type="hidden" name="courseSlug" value={course.slug} />
              <input type="hidden" name="lessonSlug" value={nextLessonSlug} />
              <button
                type="submit"
                className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
              >
                {courseStarted ? (
                  <TranslatedText
                    translationKey="courses.continueCourse"
                    fallback="Continue Course"
                  />
                ) : (
                  <TranslatedText
                    translationKey="courses.startCourse"
                    fallback="Start Course"
                  />
                )}
              </button>
            </form>
          ) : courseCompleted ? (
            <span className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300">
              <TranslatedText translationKey="common.completed" fallback="Completed" />
            </span>
          ) : null}
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">
                <TranslatedText
                  translationKey="courses.details.yourProgress"
                  fallback="Your progress"
                />
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {courseStarted ? (
                  <TranslatedText
                    translationKey="courses.details.percentCompleted"
                    fallback="{progress}% completed"
                    values={{ progress }}
                  />
                ) : (
                  <TranslatedText
                    translationKey="courses.details.startToTrack"
                    fallback="Start the course to track progress."
                  />
                )}
              </p>
            </div>
            <span className="text-sm font-semibold text-violet-300">
              {courseStarted ? (
                <CourseStatus status={course.userProgress?.status} />
              ) : (
                <TranslatedText
                  translationKey="courses.status.notStarted"
                  fallback="Not started"
                />
              )}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CourseMeta
            label={<TranslatedText translationKey="courses.level" fallback="Level" />}
            value={course.level}
          />
          <CourseMeta
            label={
              <TranslatedText translationKey="courses.duration" fallback="Duration" />
            }
            value={course.duration}
            icon={Clock3}
          />
          <CourseMeta
            label={<TranslatedText translationKey="courses.lessons" fallback="Lessons" />}
            value={course.lessons}
          />
          <CourseMeta
            label={
              <TranslatedText translationKey="courses.xpReward" fallback="XP Reward" />
            }
            value={course.xpReward}
            icon={Trophy}
          />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <OverviewCard
          icon={Target}
          title={
            <TranslatedText
              translationKey="courses.details.whatYouWillLearn"
              fallback="What you will learn"
            />
          }
          items={overview.learningOutcomes}
        />

        <div className="grid gap-5">
          <OverviewCard
            icon={BookOpen}
            title={
              <TranslatedText
                translationKey="courses.details.requirements"
                fallback="Requirements"
              />
            }
            items={overview.requirements}
          />
          <OverviewCard
            icon={LayoutTemplate}
            title={
              <TranslatedText
                translationKey="courses.details.finalProject"
                fallback="Final project"
              />
            }
            items={overview.finalProject}
          />
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-white">
            <TranslatedText
              translationKey="courses.details.courseContent"
              fallback="Course content"
            />
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            <TranslatedText
              translationKey="courses.details.courseContentSummary"
              fallback="{modules} modules, {lessons} lessons and {xp} XP to earn."
              values={{
                lessons: course.lessons,
                modules: course.modules.length,
                xp: course.xpReward,
              }}
            />
          </p>
        </div>

        <div className="space-y-4">
          {course.modules.map((module) => (
            <CourseModuleCard
              key={module.id}
              courseSlug={course.slug}
              module={module}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

type OverviewCardProps = {
  icon: LucideIcon;
  items: string[];
  title: ReactNode;
};

function OverviewCard({ icon: Icon, items, title }: OverviewCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="size-5" />
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

type CourseModuleCardProps = {
  courseSlug: string;
  module: CourseDetail["modules"][number];
};

function CourseModuleCard({ courseSlug, module }: CourseModuleCardProps) {
  const completedLessons = module.lessons.filter((lesson) => lesson.completed).length;
  const totalLessons = module.lessons.length;
  const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const status = getModuleStatus(module);
  const StatusIcon = status.icon;

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-semibold text-white">{module.title}</h3>
            <span
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                status.className
              )}
            >
              <StatusIcon className="size-3.5" />
              {status.label}
            </span>
          </div>

          {module.description ? (
            <p className="mt-1 text-sm leading-6 text-slate-400">
              {module.description}
            </p>
          ) : null}
        </div>

        <div className="shrink-0 text-sm text-slate-400 lg:text-right">
          <p>
            <TranslatedText
              translationKey="courses.details.moduleLessonsCompleted"
              fallback="{completed}/{total} lessons completed"
              values={{ completed: completedLessons, total: totalLessons }}
            />
          </p>
          <p className="mt-1 font-semibold text-violet-300">{progress}%</p>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={clsx(
            "h-full rounded-full",
            progress === 100 ? "bg-emerald-500" : "bg-violet-500"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {module.lessons.map((lesson) =>
          lesson.locked ? (
            <div
              key={lesson.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 opacity-60 sm:flex-row sm:items-center sm:justify-between"
            >
              <LessonRowContent lesson={lesson} />
            </div>
          ) : (
            <Link
              key={lesson.id}
              href={`/learn/courses/${courseSlug}/lessons/${lesson.slug}`}
              className={clsx(
                "flex flex-col gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center sm:justify-between",
                lesson.completed
                  ? "border-emerald-400/20 bg-emerald-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              )}
            >
              <LessonRowContent lesson={lesson} />
            </Link>
          )
        )}
      </div>
    </article>
  );
}

type LessonRowContentProps = {
  lesson: CourseDetail["modules"][number]["lessons"][number];
};

function LessonRowContent({ lesson }: LessonRowContentProps) {
  return (
    <>
      <div className="flex gap-3">
        {lesson.locked ? (
          <Lock className="mt-0.5 size-5 shrink-0 text-slate-500" />
        ) : (
          <CheckCircle2
            className={clsx(
              "mt-0.5 size-5 shrink-0",
              lesson.completed ? "text-emerald-400" : "text-slate-600"
            )}
          />
        )}
        <div>
          <h4 className="font-medium text-white">{lesson.title}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {lesson.summary}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-sm text-slate-400">
        <span>{lesson.duration}</span>
        <span>{lesson.xpReward} XP</span>
        {lesson.isPreview ? (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <TranslatedText translationKey="courses.details.preview" fallback="Preview" />
          </span>
        ) : null}
        {lesson.completed ? (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <TranslatedText translationKey="common.completed" fallback="Done" />
          </span>
        ) : null}
        {lesson.locked ? (
          <span className="rounded-full bg-slate-700/60 px-2.5 py-1 text-xs font-medium text-slate-300">
            <TranslatedText translationKey="common.locked" fallback="Locked" />
          </span>
        ) : null}
      </div>
    </>
  );
}

function getCourseOverview(course: CourseDetail) {
  const isHtmlCssCourse = course.title.toLowerCase().includes("html");

  if (isHtmlCssCourse) {
    return {
      learningOutcomes: [
        "Build clean HTML documents with semantic structure.",
        "Style real UI sections with CSS, spacing, typography and colors.",
        "Use Flexbox and Grid for responsive layouts.",
        "Create forms, buttons, cards and reusable UI patterns.",
        "Prepare a full responsive SaaS landing page as a portfolio project.",
      ],
      requirements: [
        "No previous coding experience required.",
        "Basic computer skills and willingness to practice.",
        "VS Code and a browser with developer tools.",
      ],
      finalProject: [
        "Responsive landing page for a fictional SaaS application.",
        "Header, hero, features, pricing, FAQ and footer.",
        "Semantic HTML, accessible forms, Flexbox, Grid and mobile-first CSS.",
      ],
    };
  }

  return {
    learningOutcomes: [
      `Understand the core concepts behind ${course.title}.`,
      "Complete structured lessons with short quizzes.",
      "Build practical skills step by step.",
      "Track progress and earn XP as you move through the course.",
    ],
    requirements: [
      "Basic programming curiosity.",
      "A code editor and browser.",
      "Time for practice after each lesson.",
    ],
    finalProject: [
      "Complete the practical course project.",
      "Apply the main skills from each module.",
      "Use the result as a portfolio-ready learning milestone.",
    ],
  };
}

function getModuleStatus(module: CourseDetail["modules"][number]) {
  const completedLessons = module.lessons.filter((lesson) => lesson.completed).length;
  const hasUnlockedLesson = module.lessons.some((lesson) => !lesson.locked);

  if (completedLessons === module.lessons.length) {
    return {
      className: "bg-emerald-500/10 text-emerald-300",
      icon: CheckCircle2,
      label: "Completed",
    };
  }

  if (completedLessons > 0 || hasUnlockedLesson) {
    return {
      className: "bg-violet-500/10 text-violet-300",
      icon: PlayCircle,
      label: "In progress",
    };
  }

  return {
    className: "bg-slate-700/60 text-slate-300",
    icon: Lock,
    label: "Locked",
  };
}

function CourseStatus({ status }: { status?: string }) {
  if (status === "completed") {
    return (
      <TranslatedText translationKey="common.completed" fallback="Completed" />
    );
  }

  if (status === "in_progress") {
    return (
      <TranslatedText translationKey="common.inProgress" fallback="In progress" />
    );
  }

  return (
    <TranslatedText
      translationKey="courses.status.notStarted"
      fallback="Not started"
    />
  );
}

type CourseMetaProps = {
  label: ReactNode;
  value: number | string;
  icon?: typeof Star;
};

function CourseMeta({ label, value, icon: Icon }: CourseMetaProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
        {Icon ? <Icon className="size-5 text-violet-400" /> : null}
        {value}
      </div>
    </div>
  );
}

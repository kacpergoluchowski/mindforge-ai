import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers3,
  LayoutTemplate,
  Lock,
  PlayCircle,
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
  const lessons = course.modules.flatMap((module) => module.lessons);
  const firstLessonSlug = lessons[0]?.slug;
  const nextLesson =
    lessons.find((lesson) => !lesson.completed && !lesson.locked) ?? lessons[0];
  const nextLessonSlug = nextLesson?.slug ?? firstLessonSlug;
  const progress = course.userProgress?.progressPercent ?? 0;
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const courseStarted = Boolean(course.userProgress);
  const courseCompleted = course.userProgress?.status === "completed";
  const overview = getCourseOverview(course);

  return (
    <div className="min-w-0 space-y-7 sm:space-y-8">
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

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_34%),#111a2d] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-6 lg:p-8">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {course.category}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300">
                {course.level}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl break-words text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {course.title}
            </h1>

            <p className="mt-4 max-w-3xl break-words text-sm leading-7 text-slate-400 sm:text-base">
              {course.description}
            </p>

            {nextLesson ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <TranslatedText
                    translationKey="courses.details.nextStep"
                    fallback="Next step"
                  />
                </p>
                <p className="mt-2 break-words font-semibold text-white">
                  {nextLesson.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">
                  {nextLesson.summary}
                </p>
              </div>
            ) : null}
          </div>

          <CourseProgressCard
            course={course}
            courseCompleted={courseCompleted}
            courseStarted={courseStarted}
            nextLessonSlug={nextLessonSlug}
            progress={progress}
          />
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <CourseMeta
            icon={BarChart3}
            label={<TranslatedText translationKey="courses.level" fallback="Level" />}
            value={course.level}
          />
          <CourseMeta
            icon={Layers3}
            label={
              <TranslatedText
                translationKey="courses.details.modules"
                fallback="Modules"
              />
            }
            value={course.modules.length}
          />
          <CourseMeta
            icon={BookOpen}
            label={
              <TranslatedText translationKey="courses.lessons" fallback="Lessons" />
            }
            value={course.lessons}
          />
          <CourseMeta
            icon={Clock3}
            label={
              <TranslatedText translationKey="courses.duration" fallback="Duration" />
            }
            value={course.duration}
          />
          <CourseMeta
            icon={Trophy}
            label={
              <TranslatedText
                translationKey="courses.xpReward"
                fallback="XP Reward"
              />
            }
            value={`${course.xpReward} XP`}
          />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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

          <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
            <span className="font-semibold text-white">{completedLessons}</span>
            <span className="text-slate-500"> / </span>
            <span>{course.lessons}</span>{" "}
            <TranslatedText
              translationKey="courses.details.lessonsCompletedShort"
              fallback="lessons completed"
            />
          </div>
        </div>

        <div className="space-y-4">
          {course.modules.map((module, index) => (
            <CourseModuleCard
              key={module.id}
              courseSlug={course.slug}
              module={module}
              moduleNumber={index + 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

type CourseProgressCardProps = {
  course: CourseDetail;
  courseCompleted: boolean;
  courseStarted: boolean;
  nextLessonSlug?: string;
  progress: number;
};

function CourseProgressCard({
  course,
  courseCompleted,
  courseStarted,
  nextLessonSlug,
  progress,
}: CourseProgressCardProps) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-950/25 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">
            <TranslatedText
              translationKey="courses.details.yourProgress"
              fallback="Your progress"
            />
          </p>
          <p className="mt-2 text-4xl font-bold text-white">{progress}%</p>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
          {courseCompleted ? (
            <CheckCircle2 className="size-6" />
          ) : (
            <PlayCircle className="size-6" />
          )}
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={clsx(
            "h-full rounded-full",
            courseCompleted ? "bg-emerald-500" : "bg-violet-500"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-500">
          {courseStarted ? (
            <CourseStatus status={course.userProgress?.status} />
          ) : (
            <TranslatedText
              translationKey="courses.status.notStarted"
              fallback="Not started"
            />
          )}
        </span>
        <span className="font-semibold text-violet-300">
          {courseStarted ? (
            <TranslatedText
              translationKey="courses.details.percentCompleted"
              fallback="{progress}% completed"
              values={{ progress }}
            />
          ) : (
            <TranslatedText
              translationKey="courses.details.startToTrack"
              fallback="Start to track"
            />
          )}
        </span>
      </div>

      <CourseAction
        course={course}
        courseCompleted={courseCompleted}
        courseStarted={courseStarted}
        nextLessonSlug={nextLessonSlug}
      />
    </aside>
  );
}

type CourseActionProps = {
  course: CourseDetail;
  courseCompleted: boolean;
  courseStarted: boolean;
  nextLessonSlug?: string;
};

function CourseAction({
  course,
  courseCompleted,
  courseStarted,
  nextLessonSlug,
}: CourseActionProps) {
  if (courseCompleted) {
    return (
      <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300">
        <CheckCircle2 className="size-5" />
        <TranslatedText translationKey="common.completed" fallback="Completed" />
      </span>
    );
  }

  if (!nextLessonSlug) {
    return null;
  }

  return (
    <form action={startCourse} className="mt-6">
      <input type="hidden" name="courseId" value={course.id} />
      <input type="hidden" name="courseSlug" value={course.slug} />
      <input type="hidden" name="lessonSlug" value={nextLessonSlug} />
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
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
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

type OverviewCardProps = {
  icon: LucideIcon;
  items: string[];
  title: ReactNode;
};

function OverviewCard({ icon: Icon, items, title }: OverviewCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.16)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="size-5" />
        </div>
        <h2 className="min-w-0 break-words text-lg font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex min-w-0 gap-3 text-sm leading-6 text-slate-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span className="min-w-0 break-words">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

type CourseModuleCardProps = {
  courseSlug: string;
  module: CourseDetail["modules"][number];
  moduleNumber: number;
};

function CourseModuleCard({
  courseSlug,
  module,
  moduleNumber,
}: CourseModuleCardProps) {
  const completedLessons = module.lessons.filter((lesson) => lesson.completed).length;
  const totalLessons = module.lessons.length;
  const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const status = getModuleStatus(module);
  const StatusIcon = status.icon;

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 shadow-[0_18px_70px_rgba(0,0,0,0.14)]">
      <div className="border-b border-white/10 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-bold text-violet-300">
                {moduleNumber}
              </span>
              <h3 className="min-w-0 break-words font-semibold text-white">
                {module.title}
              </h3>
              <span
                className={clsx(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  status.className
                )}
              >
                <StatusIcon className="size-3.5" />
                <TranslatedText
                  translationKey={status.translationKey}
                  fallback={status.fallback}
                />
              </span>
            </div>

            {module.description ? (
              <p className="mt-3 max-w-3xl break-words text-sm leading-6 text-slate-400">
                {module.description}
              </p>
            ) : null}
          </div>

          <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-400 lg:text-right">
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
      </div>

      <div className="divide-y divide-white/10">
        {module.lessons.map((lesson, index) =>
          lesson.locked ? (
            <div
              key={lesson.id}
              className="bg-white/[0.015] p-4 opacity-60 sm:p-5"
            >
              <LessonRowContent index={index + 1} lesson={lesson} />
            </div>
          ) : (
            <Link
              key={lesson.id}
              href={`/learn/courses/${courseSlug}/lessons/${lesson.slug}`}
              className={clsx(
                "block p-4 transition sm:p-5",
                lesson.completed
                  ? "bg-emerald-500/[0.06] hover:bg-emerald-500/[0.08]"
                  : "bg-white/[0.015] hover:bg-white/[0.04]"
              )}
            >
              <LessonRowContent index={index + 1} lesson={lesson} />
            </Link>
          )
        )}
      </div>
    </article>
  );
}

type LessonRowContentProps = {
  index: number;
  lesson: CourseDetail["modules"][number]["lessons"][number];
};

function LessonRowContent({ index, lesson }: LessonRowContentProps) {
  const LessonIcon = lesson.locked
    ? Lock
    : lesson.completed
      ? CheckCircle2
      : PlayCircle;

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <div
          className={clsx(
            "flex size-10 shrink-0 items-center justify-center rounded-xl border",
            lesson.locked
              ? "border-white/10 bg-slate-800 text-slate-500"
              : lesson.completed
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
                : "border-violet-400/20 bg-violet-500/10 text-violet-300"
          )}
        >
          <LessonIcon className="size-5" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {index.toString().padStart(2, "0")}
            </span>
            <h4 className="min-w-0 break-words font-medium text-white">
              {lesson.title}
            </h4>
          </div>
          <p className="mt-1 line-clamp-2 break-words text-sm leading-6 text-slate-400">
            {lesson.summary}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 pl-[52px] text-sm text-slate-400 sm:justify-end sm:pl-0">
        <LessonPill icon={Clock3}>{lesson.duration}</LessonPill>
        <LessonPill icon={Trophy}>{lesson.xpReward} XP</LessonPill>
        {lesson.isPreview ? (
          <StatusPill className="bg-blue-500/10 text-blue-300">
            <TranslatedText translationKey="courses.details.preview" fallback="Preview" />
          </StatusPill>
        ) : null}
        {lesson.completed ? (
          <StatusPill className="bg-emerald-500/10 text-emerald-300">
            <TranslatedText translationKey="common.completed" fallback="Done" />
          </StatusPill>
        ) : null}
        {lesson.locked ? (
          <StatusPill className="bg-slate-700/60 text-slate-300">
            <TranslatedText translationKey="common.locked" fallback="Locked" />
          </StatusPill>
        ) : null}
      </div>
    </div>
  );
}

type LessonPillProps = {
  children: ReactNode;
  icon: LucideIcon;
};

function LessonPill({ children, icon: Icon }: LessonPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-300">
      <Icon className="size-3.5 text-slate-500" />
      {children}
    </span>
  );
}

type StatusPillProps = {
  children: ReactNode;
  className: string;
};

function StatusPill({ children, className }: StatusPillProps) {
  return (
    <span className={clsx("rounded-full px-2.5 py-1 text-xs font-medium", className)}>
      {children}
    </span>
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
      fallback: "Completed",
      icon: CheckCircle2,
      translationKey: "common.completed",
    };
  }

  if (completedLessons > 0 || hasUnlockedLesson) {
    return {
      className: "bg-violet-500/10 text-violet-300",
      fallback: "In progress",
      icon: PlayCircle,
      translationKey: "common.inProgress",
    };
  }

  return {
    className: "bg-slate-700/60 text-slate-300",
    fallback: "Locked",
    icon: Lock,
    translationKey: "common.locked",
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
  icon: LucideIcon;
  label: ReactNode;
  value: number | string;
};

function CourseMeta({ icon: Icon, label, value }: CourseMetaProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-1 break-words text-base font-semibold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

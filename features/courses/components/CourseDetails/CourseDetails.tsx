import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Lock, Star, Trophy } from "lucide-react";
import clsx from "clsx";

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

  return (
    <div className="space-y-8">
      <Link
        href="/learn/courses"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to courses
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
                {courseStarted ? "Continue Course" : "Start Course"}
              </button>
            </form>
          ) : courseCompleted ? (
            <span className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300">
              Completed
            </span>
          ) : null}
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">Your progress</p>
              <p className="mt-1 text-sm text-slate-400">
                {courseStarted
                  ? `${progress}% completed`
                  : "Start the course to track progress."}
              </p>
            </div>
            <span className="text-sm font-semibold text-violet-300">
              {courseStarted ? formatStatus(course.userProgress?.status) : "Not started"}
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
          <CourseMeta label="Level" value={course.level} />
          <CourseMeta label="Duration" value={course.duration} icon={Clock3} />
          <CourseMeta label="Lessons" value={course.lessons} />
          <CourseMeta label="XP Reward" value={course.xpReward} icon={Trophy} />
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-white">Course content</h2>
          <p className="mt-1 text-sm text-slate-400">
            {course.modules.length} modules ready for the first test flow.
          </p>
        </div>

        <div className="space-y-4">
          {course.modules.map((module) => (
            <article
              key={module.id}
              className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-white">{module.title}</h3>
                  {module.description ? (
                    <p className="mt-1 text-sm text-slate-400">
                      {module.description}
                    </p>
                  ) : null}
                </div>

                <span className="text-sm text-slate-500">
                  {module.lessons.length} lessons
                </span>
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
                      href={`/learn/courses/${course.slug}/lessons/${lesson.slug}`}
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
          ))}
        </div>
      </section>
    </div>
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
            Preview
          </span>
        ) : null}
        {lesson.completed ? (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            Done
          </span>
        ) : null}
        {lesson.locked ? (
          <span className="rounded-full bg-slate-700/60 px-2.5 py-1 text-xs font-medium text-slate-300">
            Locked
          </span>
        ) : null}
      </div>
    </>
  );
}

function formatStatus(status?: string): string {
  if (status === "completed") {
    return "Completed";
  }

  if (status === "in_progress") {
    return "In progress";
  }

  return "Not started";
}

type CourseMetaProps = {
  label: string;
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

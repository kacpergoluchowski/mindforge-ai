import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Trophy } from "lucide-react";

import { completeLesson } from "../../actions/courseActions";
import type { CourseDetail, CourseLesson } from "../../types/courses.types";

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
        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          {course.title}
        </span>

        <h1 className="mt-5 text-3xl font-bold text-white md:text-4xl">
          {lesson.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          {lesson.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
            <Clock3 className="size-4 text-violet-400" />
            {lesson.duration}
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
            <Trophy className="size-4 text-violet-400" />
            {lesson.xpReward} XP
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">Lesson content</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          {lesson.content}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {lesson.completed ? (
            <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300">
              <CheckCircle2 className="size-5" />
              Completed
            </span>
          ) : (
            <form action={completeLesson}>
              <input type="hidden" name="courseId" value={course.id} />
              <input type="hidden" name="courseSlug" value={course.slug} />
              <input type="hidden" name="lessonId" value={lesson.id} />
              <input
                type="hidden"
                name="nextLessonSlug"
                value={nextLesson?.slug ?? ""}
              />
              <button
                type="submit"
                className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
              >
                Mark as completed
              </button>
            </form>
          )}

          {nextLesson ? (
            <Link
              href={`/learn/courses/${course.slug}/lessons/${nextLesson.slug}`}
              className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Next Lesson
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}

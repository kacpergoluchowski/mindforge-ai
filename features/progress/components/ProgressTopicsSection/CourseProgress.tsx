import TranslatedText from "@/components/shared/TranslatedText";
import type { CourseProgressItem } from "../../types/progress.types";

type CourseProgressProps = {
  courses: CourseProgressItem[];
};

export default function CourseProgress({ courses }: CourseProgressProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Course Progress"
            translationKey="progress.courseProgress"
          />
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          <TranslatedText
            fallback="Active courses connected with your lesson progress."
            translationKey="progress.courseProgressDescription"
          />
        </p>
      </div>

      {courses.length ? (
        <div className="space-y-4">
          {courses.map((course) => (
            <article
              key={course.id}
              className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-semibold text-white">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {course.category} /{" "}
                    <TranslatedText
                      fallback="{count} lessons"
                      translationKey="progress.lessonsCount"
                      values={{ count: course.lessons }}
                    />{" "}
                    / {course.duration}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  <TranslatedText
                    fallback={course.status}
                    translationKey={getCourseStatusTranslationKey(course.status)}
                  />
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    <TranslatedText fallback="Progress" translationKey="learningPaths.progress" />
                  </span>
                  <span className="font-medium text-white">{course.progress}%</span>
                </div>

                <div
                  aria-label={`${course.progress}%`}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={course.progress}
                  className="h-2 overflow-hidden rounded-full bg-slate-800"
                  role="progressbar"
                >
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <TranslatedText
            fallback="Start a course to track progress here."
            translationKey="progress.emptyCourseProgress"
          />
        </div>
      )}
    </section>
  );
}

function getCourseStatusTranslationKey(status: string) {
  if (status === "Completed") {
    return "common.completed";
  }

  if (status === "In Progress") {
    return "common.inProgress";
  }

  return "progress.unknownStatus";
}

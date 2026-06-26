import type { CourseProgressItem } from "../../types/progress.types";

type CourseProgressProps = {
  courses: CourseProgressItem[];
};

export default function CourseProgress({ courses }: CourseProgressProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Course Progress</h2>
        <p className="mt-1 text-sm text-slate-400">
          Active courses connected with your lesson progress.
        </p>
      </div>

      {courses.length ? (
        <div className="space-y-4">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-white">{course.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {course.category} / {course.lessons} lessons / {course.duration}
                  </p>
                </div>

                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  {course.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-medium text-white">{course.progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
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
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          Start a course to track progress here.
        </div>
      )}
    </section>
  );
}

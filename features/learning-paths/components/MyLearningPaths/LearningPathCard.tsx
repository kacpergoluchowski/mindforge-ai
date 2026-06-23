import { MoreVertical, ArrowRight } from "lucide-react";
import { LearningPath } from "../../types/learningPaths.types";

const colors = {
  violet: {
    iconBg: "bg-violet-500/20",
    iconText: "text-violet-400",
    progress: "bg-violet-500",
    button: "text-violet-400",
  },

  emerald: {
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-400",
    progress: "bg-emerald-500",
    button: "text-emerald-400",
  },

  orange: {
    iconBg: "bg-orange-500/20",
    iconText: "text-orange-400",
    progress: "bg-orange-500",
    button: "text-orange-400",
  },
};

export default function LearningPathCard({
  title,
  progress,
  coursesCompleted,
  totalCourses,
  color,
  icon: Icon,
}: LearningPath) {
  const styles = colors[color];

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <div
          className={`flex size-12 items-center justify-center rounded-full ${styles.iconBg}`}
        >
          <Icon className={`size-5 ${styles.iconText}`} />
        </div>

        <button>
          <MoreVertical className="size-5 text-slate-500" />
        </button>
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className={`mt-2 text-sm ${styles.iconText}`}>
        {progress}% Complete
      </p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${styles.progress}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-5 text-sm text-slate-400">
        {coursesCompleted} / {totalCourses} Courses
      </p>

      <button
        className={`mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.03] py-4 font-medium transition hover:bg-white/[0.05] ${styles.button}`}
      >
        Continue Learning
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
}
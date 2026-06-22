import { ArrowRight, Star, Users } from "lucide-react";
import { PopularCourseCardProps } from "../../types/courses.types";

const colorStyles = {
  blue: {
    icon: "bg-sky-500/10 text-sky-400",
    badge: "bg-sky-500/10 text-sky-400",
  },

  violet: {
    icon: "bg-violet-500/10 text-violet-400",
    badge: "bg-violet-500/10 text-violet-400",
  },

  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
  },

  orange: {
    icon: "bg-orange-500/10 text-orange-400",
    badge: "bg-orange-500/10 text-orange-400",
  },
} as const;

export default function PopularCourseCard({
  title,
  description,
  rating,
  students,
  lessons,
  level,
  icon: Icon,
  color,
}: PopularCourseCardProps) {
  const styles = colorStyles[color];

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-white/20 hover:bg-[#131f35]">
      <div
        className={`mb-5 flex size-14 items-center justify-center rounded-2xl ${styles.icon}`}
      >
        <Icon className="size-7" />
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="size-4 fill-yellow-400" />
          {rating}
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <Users className="size-4" />
          {students}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-400">
          {lessons} Lessons
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
        >
          {level}
        </span>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 py-3 font-medium text-white transition hover:bg-violet-600">
        Start Learning
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
}
import { Check, Star } from "lucide-react";
import { PopularLearningPathCardProps } from "../../types/learningPaths.types";

const colorStyles = {
  blue: {
    icon: "bg-sky-500/10 text-sky-400 shadow-sky-500/20",
    badge: "bg-sky-500/10 text-sky-400",
    check: "text-emerald-400",
  },
  green: {
    icon: "bg-lime-500/10 text-lime-400 shadow-lime-500/20",
    badge: "bg-emerald-500/10 text-emerald-400",
    check: "text-emerald-400",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-400 shadow-violet-500/20",
    badge: "bg-violet-500/10 text-violet-400",
    check: "text-emerald-400",
  },
  yellow: {
    icon: "bg-yellow-500/10 text-yellow-400 shadow-yellow-500/20",
    badge: "bg-yellow-500/10 text-yellow-400",
    check: "text-yellow-400",
  },
};

export default function PopularLearningPathCard({
  title,
  icon: Icon,
  technologies,
  rating,
  students,
  courses,
  color,
}: PopularLearningPathCardProps) {
  const styles = colorStyles[color];

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-white/20 hover:bg-[#131f35]">
      <div
        className={`mb-8 flex size-14 items-center justify-center rounded-full shadow-2xl ${styles.icon}`}
      >
        <Icon className="size-8" />
      </div>

      <h3 className="max-w-36 text-md font-semibold leading-tight text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-2">
        {technologies.map((tech) => (
          <li key={tech} className="flex items-center gap-2 text-sm text-slate-400">
            <Check className={`size-4 ${styles.check}`} />
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-sm text-white">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
          <span className="text-slate-500">({students})</span>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {courses} Courses
        </span>
      </div>
    </article>
  );
}
import clsx from "clsx";
import { ArrowRight, Star, Users } from "lucide-react";

import type { PopularCourseCardProps } from "../../types/courses.types";

type PopularCourseColor = PopularCourseCardProps["color"];

type PopularCourseColorStyle = {
  badge: string;
  icon: string;
};

const colorStyles: Record<PopularCourseColor, PopularCourseColorStyle> = {
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
};

export default function PopularCourseCard({
  title,
  description,
  rating,
  students,
  lessons,
  level,
  icon,
  color,
}: PopularCourseCardProps) {
  const styles = colorStyles[color];

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-white/20 hover:bg-[#131f35]">
      <CourseIcon icon={icon} className={styles.icon} />

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>

      <div className="mt-5 flex items-center gap-4 text-sm">
        <CourseMetric
          icon={Star}
          iconClassName="fill-yellow-400"
          className="text-yellow-400"
          value={rating}
        />
        <CourseMetric icon={Users} className="text-slate-400" value={students} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-400">{lessons} Lessons</span>

        <span
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-medium",
            styles.badge
          )}
        >
          {level}
        </span>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 py-3 font-medium text-white transition hover:bg-violet-600"
      >
        Start Learning
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
}

type CourseIconProps = {
  className: string;
  icon: PopularCourseCardProps["icon"];
};

function CourseIcon({ className, icon: Icon }: CourseIconProps) {
  return (
    <div
      className={clsx(
        "mb-5 flex size-14 items-center justify-center rounded-2xl",
        className
      )}
    >
      <Icon className="size-7" />
    </div>
  );
}

type CourseMetricProps = {
  className: string;
  icon: PopularCourseCardProps["icon"];
  iconClassName?: string;
  value: number | string;
};

function CourseMetric({
  className,
  icon: Icon,
  iconClassName,
  value,
}: CourseMetricProps) {
  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <Icon className={clsx("size-4", iconClassName)} />
      {value}
    </div>
  );
}

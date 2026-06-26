import clsx from "clsx";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers3,
  PlayCircle,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

import { startCourse } from "../../actions/courseActions";
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
  id,
  title,
  description,
  rating,
  students,
  modulesCount,
  lessons,
  xpReward,
  duration,
  level,
  icon,
  color,
  slug,
  firstLessonSlug,
  nextLessonSlug,
  status,
  progress = 0,
}: PopularCourseCardProps) {
  const styles = colorStyles[color];
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const isStarted = Boolean(status);
  const isCompleted = status === "completed";
  const statusDetails = getCourseStatusDetails(status);
  const StatusIcon = statusDetails.icon;
  const actionLessonSlug = nextLessonSlug ?? firstLessonSlug;
  const actionClassName =
    "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 py-3 font-medium text-white transition hover:bg-violet-600";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-white/20 hover:bg-[#131f35]">
      <div className="flex items-start justify-between gap-4">
        <CourseIcon icon={icon} className={styles.icon} />
        <span
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
            statusDetails.className
          )}
        >
          <StatusIcon className="size-3.5" />
          {statusDetails.label}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-sm">
        <CourseMetric
          icon={Star}
          iconClassName="fill-yellow-400"
          className="text-yellow-400"
          value={rating}
        />
        <CourseMetric icon={Users} className="text-slate-400" value={students} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <CourseInfo icon={Layers3} label="Modules" value={modulesCount || "-"} />
        <CourseInfo icon={BookOpen} label="Lessons" value={lessons} />
        <CourseInfo icon={Clock3} label="Duration" value={duration} />
        <CourseInfo icon={Trophy} label="XP" value={xpReward} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-400">Level</span>
        <span
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-medium",
            styles.badge
          )}
        >
          {level}
        </span>
      </div>

      {isStarted ? (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300">
              {isCompleted ? "Completed" : "In progress"}
            </span>
            <span className="text-slate-400">{normalizedProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${normalizedProgress}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-auto" />

      {slug && actionLessonSlug && !isCompleted ? (
        <StartCourseForm
          courseId={String(id)}
          courseSlug={slug}
          lessonSlug={actionLessonSlug}
          className={actionClassName}
          label={isStarted ? "Continue Course" : "Start Course"}
        />
      ) : slug ? (
        <Link
          href={`/learn/courses/${slug}`}
          className={clsx(
            actionClassName,
            isCompleted && "bg-emerald-500 hover:bg-emerald-600"
          )}
        >
          {isCompleted ? "Completed" : "View Course"}
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <button type="button" className={actionClassName}>
          Start Learning
          <ArrowRight className="size-4" />
        </button>
      )}
    </article>
  );
}

type StartCourseFormProps = {
  courseId: string;
  courseSlug: string;
  lessonSlug: string;
  className: string;
  label: string;
};

function StartCourseForm({
  courseId,
  courseSlug,
  lessonSlug,
  className,
  label,
}: StartCourseFormProps) {
  return (
    <form action={startCourse}>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="courseSlug" value={courseSlug} />
      <input type="hidden" name="lessonSlug" value={lessonSlug} />
      <button type="submit" className={className}>
        {label}
        <ArrowRight className="size-4" />
      </button>
    </form>
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

type CourseInfoProps = {
  icon: PopularCourseCardProps["icon"];
  label: string;
  value: number | string;
};

function CourseInfo({ icon: Icon, label, value }: CourseInfoProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="size-4 text-violet-300" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
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

function getCourseStatusDetails(status?: string) {
  if (status === "completed") {
    return {
      className: "bg-emerald-500/10 text-emerald-300",
      icon: CheckCircle2,
      label: "Completed",
    };
  }

  if (status) {
    return {
      className: "bg-violet-500/10 text-violet-300",
      icon: PlayCircle,
      label: "In progress",
    };
  }

  return {
    className: "bg-slate-700/60 text-slate-300",
    icon: BookOpen,
    label: "Not started",
  };
}

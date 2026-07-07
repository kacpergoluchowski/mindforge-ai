import clsx from "clsx";
import {
  ArrowRight,
  Atom,
  Brain,
  Check,
  Code2,
  Database,
  GraduationCap,
  Hexagon,
  Star,
} from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { startLearningPath } from "../../actions/learningPathActions";
import type { PopularLearningPath } from "../../types/learningPaths.types";

type PopularLearningPathColor = PopularLearningPath["color"];

type PopularLearningPathColorStyle = {
  badge: string;
  check: string;
  icon: string;
};

const colorStyles: Record<
  PopularLearningPathColor,
  PopularLearningPathColorStyle
> = {
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

const iconMap = {
  atom: Atom,
  brain: Brain,
  code: Code2,
  database: Database,
  hexagon: Hexagon,
};

export default function PopularLearningPathCard({
  id,
  slug,
  title,
  iconName,
  technologies,
  rating,
  students,
  courses,
  color,
}: PopularLearningPath) {
  const styles = colorStyles[color];
  const icon = iconMap[iconName as keyof typeof iconMap] ?? Code2;

  return (
    <article className="group flex min-h-full flex-col rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-violet-400/30 hover:bg-[#131f35]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <PopularPathIcon icon={icon} styles={styles} />
        <span
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            styles.badge
          )}
        >
          <GraduationCap className="size-3.5" />
          <TranslatedText
            fallback="{count} Courses"
            translationKey="learningPaths.coursesCount"
            values={{ count: courses }}
          />
        </span>
      </div>

      <h3 className="line-clamp-2 min-h-[44px] text-base font-semibold leading-snug text-white">
        {title}
      </h3>

      <ul className="mt-5 flex-1 space-y-2">
        {technologies.slice(0, 3).map((technology) => (
          <TechnologyItem key={technology} label={technology} styles={styles} />
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-4">
        <Rating rating={rating} students={students} />
      </div>

      {slug ? (
        <form action={startLearningPath} className="mt-5">
          <input type="hidden" name="pathId" value={String(id)} />
          <input type="hidden" name="pathSlug" value={slug} />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
          >
            <TranslatedText
              fallback="Start Path"
              translationKey="learningPaths.startPath"
            />
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </button>
        </form>
      ) : null}
    </article>
  );
}

type PopularPathIconProps = {
  icon: typeof Code2;
  styles: PopularLearningPathColorStyle;
};

function PopularPathIcon({ icon: Icon, styles }: PopularPathIconProps) {
  return (
    <div
      className={clsx(
        "flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-2xl",
        styles.icon
      )}
    >
      <Icon className="size-6" />
    </div>
  );
}

type TechnologyItemProps = {
  label: string;
  styles: PopularLearningPathColorStyle;
};

function TechnologyItem({ label, styles }: TechnologyItemProps) {
  return (
    <li className="flex min-w-0 items-center gap-2 text-sm text-slate-400">
      <Check className={clsx("size-4 shrink-0", styles.check)} />
      <span className="truncate">{label}</span>
    </li>
  );
}

type RatingProps = {
  rating: string;
  students: string;
};

function Rating({ rating, students }: RatingProps) {
  return (
    <div className="flex items-center gap-1 text-sm text-slate-300">
      <Star className="size-4 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold text-white">{rating}</span>
      <span className="text-slate-500">({students})</span>
    </div>
  );
}

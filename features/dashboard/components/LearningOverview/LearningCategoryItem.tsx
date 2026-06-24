import clsx from "clsx";

import type {
  LearningCategory,
  LearningCategoryColor,
} from "../../types/dashboard.types";

type LearningCategoryItemProps = {
  category: LearningCategory;
};

const colorClasses: Record<LearningCategoryColor, string> = {
  violet: "bg-violet-500",
  emerald: "bg-emerald-400",
  orange: "bg-orange-400",
  blue: "bg-blue-500",
};

export default function LearningCategoryItem({
  category,
}: LearningCategoryItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className={clsx("size-3 rounded-full", colorClasses[category.color])}
        />

        <span className="text-sm font-medium text-white">{category.label}</span>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <span className="text-slate-300">{category.time}</span>
        <span className="w-10 text-right text-white">
          {category.percentage}%
        </span>
      </div>
    </div>
  );
}

import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
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
  const categoryKey = getCategoryTranslationKey(category.label);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className={clsx("size-3 rounded-full", colorClasses[category.color])}
        />

        <span className="text-sm font-medium text-white">
          {categoryKey ? (
            <TranslatedText
              fallback={category.label}
              translationKey={categoryKey}
            />
          ) : (
            category.label
          )}
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <span className="text-slate-300">
          <TranslatedText
            fallback="{value}% focus"
            translationKey="dashboard.focusPercent"
            values={{ value: category.time }}
          />
        </span>
        <span className="w-10 text-right text-white">
          {category.percentage}%
        </span>
      </div>
    </div>
  );
}

function getCategoryTranslationKey(label: string) {
  const categoryKeys: Record<string, string> = {
    "AI & ML": "dashboard.categories.aiMl",
    Backend: "dashboard.categories.backend",
    Database: "dashboard.categories.database",
    Development: "dashboard.categories.development",
    DevOps: "dashboard.categories.devops",
    Frontend: "dashboard.categories.frontend",
    Fullstack: "dashboard.categories.fullstack",
    Other: "dashboard.categories.other",
    "System Design": "dashboard.categories.systemDesign",
  };

  return categoryKeys[label];
}

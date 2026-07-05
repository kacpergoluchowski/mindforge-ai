import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import type {
  LearningInsightColor,
  LearningInsightItem,
} from "../../types/progress.types";

const colorStyles: Record<LearningInsightColor, string> = {
  blue: "bg-sky-500/10 text-sky-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  violet: "bg-violet-500/10 text-violet-400",
};

function InsightItem({
  id,
  title,
  description,
  icon: Icon,
  color,
}: LearningInsightItem) {
  return (
    <div className="flex gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <div
        className={clsx(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          colorStyles[color]
        )}
      >
        <Icon aria-hidden="true" className="size-5" />
      </div>

      <div>
        <h3 className="font-semibold text-white">
          <TranslatedText
            fallback={title}
            translationKey={getInsightTitleTranslationKey(id, title)}
          />
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          {getInsightDescription(id, description)}
        </p>
      </div>
    </div>
  );
}

type LearningInsightsProps = {
  insights: LearningInsightItem[];
};

export default function LearningInsights({ insights }: LearningInsightsProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Learning Insights"
            translationKey="progress.learningInsights"
          />
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          <TranslatedText
            fallback="AI-powered recommendations based on your progress."
            translationKey="progress.learningInsightsDescription"
          />
        </p>
      </div>

      {insights.length ? (
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightItem key={insight.id} {...insight} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <TranslatedText
            fallback="Complete lessons to generate learning insights."
            translationKey="progress.emptyLearningInsights"
          />
        </div>
      )}
    </section>
  );
}

function getInsightTitleTranslationKey(id: number | string, title: string) {
  if (id === "weekly-xp") return "progress.insights.thisWeek";
  if (id === "course-focus" && title === "Current focus") {
    return "progress.insights.currentFocus";
  }
  if (id === "course-focus") return "progress.insights.nextStep";
  if (id === "strongest-topic" && title === "Strongest topic") {
    return "progress.insights.strongestTopic";
  }
  if (id === "strongest-topic") return "progress.insights.learningBase";
  if (id === 1) return "progress.insights.bestLearningTime";
  if (id === 2) return "progress.insights.strongestTopic";
  if (id === 3) return "progress.insights.aiRecommendation";

  return "progress.insights.unknownTitle";
}

function getInsightDescription(id: number | string, description: string) {
  if (id === "weekly-xp") {
    const earnedXp = description.match(/You earned ([\d,]+) XP/)?.[1];

    if (earnedXp) {
      return (
        <TranslatedText
          fallback={description}
          translationKey="progress.insights.weeklyXpDescription"
          values={{ xp: earnedXp }}
        />
      );
    }

    return (
      <TranslatedText
        fallback={description}
        translationKey="progress.insights.startWeeklyXp"
      />
    );
  }

  if (id === "course-focus") {
    const courseTitle = description.match(/^Continue (.+)\.$/)?.[1];

    if (courseTitle) {
      return (
        <TranslatedText
          fallback={description}
          translationKey="progress.insights.continueCourse"
          values={{ course: courseTitle }}
        />
      );
    }

    return (
      <TranslatedText
        fallback={description}
        translationKey="progress.insights.startCourse"
      />
    );
  }

  if (id === "strongest-topic") {
    const strongestTopic = description.match(
      /^(.+) has the highest course progress right now\.$/
    )?.[1];

    if (strongestTopic) {
      return (
        <TranslatedText
          fallback={description}
          translationKey="progress.insights.strongestTopicDescription"
          values={{ topic: strongestTopic }}
        />
      );
    }

    const completedLessons = description.match(/^(\d+) lessons completed/)?.[1];

    if (completedLessons) {
      return (
        <TranslatedText
          fallback={description}
          translationKey="progress.insights.lessonsCompleted"
          values={{ count: completedLessons }}
        />
      );
    }
  }

  if (id === 1) {
    return (
      <TranslatedText
        fallback={description}
        translationKey="progress.insights.bestLearningTimeDescription"
      />
    );
  }

  if (id === 2) {
    return (
      <TranslatedText
        fallback={description}
        translationKey="progress.insights.strongestTopicStaticDescription"
      />
    );
  }

  if (id === 3) {
    return (
      <TranslatedText
        fallback={description}
        translationKey="progress.insights.aiRecommendationDescription"
      />
    );
  }

  return description;
}

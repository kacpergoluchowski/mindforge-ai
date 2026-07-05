import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import type {
  RecentActivityColor,
  RecentActivityItem,
} from "../../types/progress.types";

type ActivityItemProps = Omit<RecentActivityItem, "id">;

const colorStyles: Record<RecentActivityColor, string> = {
  violet: "bg-violet-500/10 text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
};

function ActivityItem({
  title,
  description,
  xp,
  icon: Icon,
  color,
}: ActivityItemProps) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            colorStyles[color]
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-5 text-white">
            {getActivityTitle(title)}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {getActivityDescription(description)}
          </p>

          <span className="mt-2 inline-block text-xs font-semibold text-emerald-400 sm:hidden">
            {xp}
          </span>
        </div>

        <span className="hidden shrink-0 text-xs font-semibold text-emerald-400 sm:block">
          {xp}
        </span>
      </div>
    </div>
  );
}

type RecentActivityProps = {
  activities: RecentActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section className="w-full rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Recent Activity"
            translationKey="progress.recentActivity"
          />
        </h2>
      </div>

      {activities.length ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <TranslatedText
            fallback="No activity yet."
            translationKey="progress.noActivity"
          />
        </div>
      )}
    </section>
  );
}

function getActivityTitle(title: string) {
  const completedTitle = title.match(/^Completed "(.+)"$/)?.[1];

  if (completedTitle) {
    return (
      <TranslatedText
        fallback={title}
        translationKey="progress.activity.completed"
        values={{ title: completedTitle }}
      />
    );
  }

  const solvedTitle = title.match(/^Solved "(.+)" challenge$/)?.[1];

  if (solvedTitle) {
    return (
      <TranslatedText
        fallback={title}
        translationKey="progress.activity.solvedChallenge"
        values={{ title: solvedTitle }}
      />
    );
  }

  if (title === "AI Code Review completed") {
    return (
      <TranslatedText
        fallback={title}
        translationKey="progress.activity.codeReviewCompleted"
      />
    );
  }

  if (title.startsWith("Earned ")) {
    return (
      <TranslatedText fallback={title} translationKey="progress.activity.earnedXp" />
    );
  }

  return title;
}

function getActivityDescription(description: string) {
  const [type, time] = description.split(" / ");

  if (!time) {
    return translateActivityType(type);
  }

  return (
    <>
      {translateActivityType(type)} / {translateRelativeTime(time)}
    </>
  );
}

function translateActivityType(type: string) {
  const keys: Record<string, string> = {
    Activity: "progress.activity.activity",
    "AI Mentor": "navigation.aiMentor",
    Challenge: "navigation.challenges",
    Course: "navigation.courses",
    "Course added to Continue Learning": "progress.activity.courseAdded",
    "Lesson completed": "progress.activity.lessonCompleted",
    "for completing a lesson": "progress.activity.forCompletingLesson",
  };

  if (!keys[type]) {
    return type;
  }

  return <TranslatedText fallback={type} translationKey={keys[type]} />;
}

function translateRelativeTime(time: string) {
  if (time === "Just now") {
    return <TranslatedText fallback={time} translationKey="progress.time.justNow" />;
  }

  if (time === "Yesterday") {
    return <TranslatedText fallback={time} translationKey="progress.time.yesterday" />;
  }

  const minutes = time.match(/^(\d+)m ago$/)?.[1];

  if (minutes) {
    return (
      <TranslatedText
        fallback={time}
        translationKey="progress.time.minutesAgo"
        values={{ count: minutes }}
      />
    );
  }

  const hours = time.match(/^(\d+)h ago$/)?.[1];

  if (hours) {
    return (
      <TranslatedText
        fallback={time}
        translationKey="progress.time.hoursAgo"
        values={{ count: hours }}
      />
    );
  }

  const days = time.match(/^(\d+)d ago$/)?.[1];

  if (days) {
    return (
      <TranslatedText
        fallback={time}
        translationKey="progress.time.daysAgo"
        values={{ count: days }}
      />
    );
  }

  return time;
}

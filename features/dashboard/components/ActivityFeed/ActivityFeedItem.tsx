import clsx from "clsx";
import type { ReactNode } from "react";

import TranslatedText from "@/components/shared/TranslatedText";
import type {
  ActivityColor,
  ActivityItem,
} from "../../types/dashboard.types";

type ActivityFeedItemProps = {
  item: ActivityItem;
};

const colorClasses: Record<ActivityColor, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
  blue: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
};

export default function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  const Icon = item.icon;
  const title = getActivityTitle(item);
  const description = getActivityDescription(item);
  const time = getActivityTime(item.time);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div
          className={clsx(
            "flex size-10 shrink-0 items-center justify-center rounded-full ring-1",
            colorClasses[item.color]
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-white">
            {title}
          </p>

          {description && (
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          )}
        </div>
      </div>

      <span className="pl-[3.25rem] text-xs text-slate-400 sm:shrink-0 sm:whitespace-nowrap sm:pl-0 sm:text-sm">
        {time}
      </span>
    </div>
  );
}

function getActivityTitle(
  item: ActivityItem
): ReactNode {
  if (item.type === "lesson_completed") {
    return (
      <TranslatedText
        fallback='Completed "{title}"'
        translationKey="activity.lessonCompleted"
        values={{ title: extractQuotedValue(item.title) }}
      />
    );
  }

  if (item.type === "xp_earned") {
    return (
      <TranslatedText
        fallback="Earned {xp} XP"
        translationKey="activity.xpEarned"
        values={{ xp: extractNumber(item.title) }}
      />
    );
  }

  if (item.type === "course_started") {
    return (
      <TranslatedText
        fallback='Started "{title}"'
        translationKey="activity.courseStarted"
        values={{ title: extractQuotedValue(item.title) }}
      />
    );
  }

  if (item.type === "achievement_unlocked") {
    return (
      <TranslatedText
        fallback='Unlocked "{title}"'
        translationKey="activity.achievementUnlocked"
        values={{ title: extractQuotedValue(item.title) }}
      />
    );
  }

  return item.title;
}

function getActivityDescription(item: ActivityItem): ReactNode {
  if (!item.description) {
    return undefined;
  }

  const descriptionMap: Record<string, { fallback: string; key: string }> = {
    "Course added to Continue Learning": {
      fallback: "Course added to Continue Learning",
      key: "activity.courseAddedDescription",
    },
    "Lesson completed": {
      fallback: "Lesson completed",
      key: "activity.lessonCompletedDescription",
    },
    "for completing a lesson": {
      fallback: "for completing a lesson",
      key: "activity.forCompletingLesson",
    },
    "for daily challenge": {
      fallback: "for daily challenge",
      key: "activity.forDailyChallenge",
    },
  };
  const translation = descriptionMap[item.description];

  return translation ? (
    <TranslatedText
      fallback={translation.fallback}
      translationKey={translation.key}
    />
  ) : (
    item.description
  );
}

function getActivityTime(time: string): ReactNode {
  if (time === "Just now") {
    return (
      <TranslatedText fallback="Just now" translationKey="activity.time.justNow" />
    );
  }

  if (time === "Yesterday") {
    return (
      <TranslatedText
        fallback="Yesterday"
        translationKey="activity.time.yesterday"
      />
    );
  }

  const match = time.match(/^(\d+)(m|h|d) ago$/);

  if (!match) {
    return time;
  }

  const [, value, unit] = match;
  const keys: Record<string, string> = {
    d: "activity.time.daysAgo",
    h: "activity.time.hoursAgo",
    m: "activity.time.minutesAgo",
  };

  return (
    <TranslatedText
      fallback={time}
      translationKey={keys[unit]}
      values={{ count: value }}
    />
  );
}

function extractQuotedValue(text: string) {
  return text.match(/"([^"]+)"/)?.[1] ?? text;
}

function extractNumber(text: string) {
  return text.match(/\d+/)?.[0] ?? "0";
}

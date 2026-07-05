"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  Award,
  Bell,
  BookOpen,
  CheckCircle2,
  Code2,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { NotificationItem } from "@/features/notifications/types/notification.types";

type NotificationsDropdownProps = {
  compact?: boolean;
  notifications: NotificationItem[];
};

type LocalNotificationItem = NotificationItem & {
  unread: boolean;
};

export default function NotificationsDropdown({
  compact = false,
  notifications,
}: NotificationsDropdownProps) {
  const { t } = useI18n();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(
    () => new Set()
  );
  const localNotifications = useMemo<LocalNotificationItem[]>(
    () =>
      notifications.map((notification) => ({
        ...notification,
        unread: !readNotificationIds.has(notification.id),
      })),
    [notifications, readNotificationIds]
  );
  const unreadCount = localNotifications.filter((notification) => {
    return notification.unread;
  }).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function markAllAsRead() {
    setReadNotificationIds(
      new Set(notifications.map((notification) => notification.id))
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={t("notifications.open", "Open notifications")}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={clsx(
          "relative flex items-center justify-center text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70",
          compact
            ? "size-10 rounded-2xl border border-white/10 bg-white/[0.04] text-white hover:border-white/20"
            : "size-9 rounded-2xl hover:bg-white/[0.04]"
        )}
      >
        <Bell aria-hidden="true" className={compact ? "size-4" : "size-5"} />

        {unreadCount > 0 && (
          <span
            className={clsx(
              "absolute flex items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white",
              compact ? "-right-1 -top-1 size-4" : "-right-1.5 -top-1.5 size-5"
            )}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute right-0 z-50 mt-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424] shadow-2xl shadow-black/40",
            compact ? "-right-1" : "right-0"
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.02] p-4">
            <div>
              <h2 className="font-semibold text-white">
                {t("notifications.title", "Notifications")}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {unreadCount > 0
                  ? t("notifications.unreadCount", "{count} unread").replace(
                      "{count}",
                      String(unreadCount)
                    )
                  : t("notifications.allRead", "All caught up")}
              </p>
            </div>

            <button
              type="button"
              aria-label={t("common.close", "Close")}
              onClick={() => setIsOpen(false)}
              className="flex size-8 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="max-h-[360px] overflow-y-auto p-2">
            {localNotifications.length ? (
              localNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.icon);

                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() =>
                      setReadNotificationIds((currentIds) => {
                        const nextIds = new Set(currentIds);
                        nextIds.add(notification.id);

                        return nextIds;
                      })
                    }
                    className="flex w-full gap-3 rounded-2xl p-3 text-left transition hover:bg-white/[0.04]"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          {getNotificationTitle(notification, t)}
                        </p>
                        {notification.unread && (
                          <span className="mt-1 size-2 shrink-0 rounded-full bg-violet-400" />
                        )}
                      </div>

                      {notification.description && (
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {getNotificationDescription(notification.description, t)}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-slate-500">
                        {getNotificationTime(notification.time, t)}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                  <Bell aria-hidden="true" className="size-5" />
                </div>
                <p className="text-sm font-semibold text-white">
                  {t("notifications.emptyTitle", "No notifications")}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {t(
                    "notifications.emptyDescription",
                    "Your recent activity will appear here."
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 p-3">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={!unreadCount}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 aria-hidden="true" className="size-4" />
              {t("notifications.markAllRead", "Mark all as read")}
            </button>

            <Link
              href="/learn/progress"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3 py-2 text-xs font-semibold text-violet-300 transition hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
            >
              {t("notifications.viewAll", "View all")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function getNotificationIcon(icon: NotificationItem["icon"]) {
  const icons = {
    achievement: Award,
    challenge: Code2,
    course: BookOpen,
    lesson: CheckCircle2,
    xp: Trophy,
  };

  return icons[icon] ?? Sparkles;
}

function getNotificationTitle(
  notification: NotificationItem,
  translate: (key: string, fallback: string) => string
) {
  const quotedValue = extractQuotedValue(notification.title);

  if (notification.type === "lesson_completed") {
    return translate("activity.lessonCompleted", 'Completed "{title}"').replace(
      "{title}",
      quotedValue
    );
  }

  if (notification.type === "course_started") {
    return translate("activity.courseStarted", 'Started "{title}"').replace(
      "{title}",
      quotedValue
    );
  }

  if (notification.type === "challenge_started") {
    return translate("notifications.activity.challengeStarted", 'Started "{title}"').replace(
      "{title}",
      quotedValue
    );
  }

  if (notification.type === "challenge_completed") {
    return translate(
      "notifications.activity.challengeCompleted",
      'Completed "{title}"'
    ).replace("{title}", quotedValue);
  }

  if (notification.type === "achievement_unlocked") {
    return translate(
      "activity.achievementUnlocked",
      'Unlocked "{title}"'
    ).replace("{title}", quotedValue);
  }

  if (notification.type === "xp_earned") {
    return translate("activity.xpEarned", "Earned {xp} XP").replace(
      "{xp}",
      extractNumber(notification.title)
    );
  }

  return notification.title;
}

function getNotificationDescription(
  description: string,
  translate: (key: string, fallback: string) => string
) {
  const descriptionMap: Record<string, { fallback: string; key: string }> = {
    "Challenge added to your practice list": {
      fallback: "Challenge added to your practice list",
      key: "notifications.activity.challengeAdded",
    },
    "Challenge solved": {
      fallback: "Challenge solved",
      key: "activity.challengeSolved",
    },
    "Course achievement earned": {
      fallback: "Course achievement earned",
      key: "notifications.activity.courseAchievementEarned",
    },
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
  };
  const translation = descriptionMap[description];

  return translation ? translate(translation.key, translation.fallback) : description;
}

function getNotificationTime(
  time: string,
  translate: (key: string, fallback: string) => string
) {
  if (time === "Just now") {
    return translate("activity.time.justNow", "Just now");
  }

  if (time === "Yesterday") {
    return translate("activity.time.yesterday", "Yesterday");
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
  const translationKey = keys[unit];

  if (!translationKey) {
    return time;
  }

  return translate(translationKey, time).replace("{count}", value);
}

function extractQuotedValue(text: string) {
  return text.match(/"([^"]+)"/)?.[1] ?? text;
}

function extractNumber(text: string) {
  return text.match(/\d+/)?.[0] ?? "0";
}

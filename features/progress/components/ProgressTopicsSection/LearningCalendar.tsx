import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import type { CalendarSummaryItem, LearningCalendarDay } from "../../types/progress.types";

const weekDays = [
  { id: "monday", label: "M", translationKey: "progress.calendar.weekDays.monday" },
  { id: "tuesday", label: "T", translationKey: "progress.calendar.weekDays.tuesday" },
  { id: "wednesday", label: "W", translationKey: "progress.calendar.weekDays.wednesday" },
  { id: "thursday", label: "T", translationKey: "progress.calendar.weekDays.thursday" },
  { id: "friday", label: "F", translationKey: "progress.calendar.weekDays.friday" },
  { id: "saturday", label: "S", translationKey: "progress.calendar.weekDays.saturday" },
  { id: "sunday", label: "S", translationKey: "progress.calendar.weekDays.sunday" },
];

const intensityStyles = {
  0: "bg-slate-800",
  1: "bg-emerald-900/40",
  2: "bg-emerald-800/60",
  3: "bg-emerald-700/70",
  4: "bg-emerald-600/80",
  5: "bg-emerald-500/90",
  6: "bg-emerald-400",
} as const;

function getIntensity(value: number) {
  if (value <= 0) return 0;
  if (value >= 6) return 6;

  return value as keyof typeof intensityStyles;
}

type LearningCalendarProps = {
  days: LearningCalendarDay[];
};

export default function LearningCalendar({ days }: LearningCalendarProps) {
  const calendarDays = days.length ? days : getEmptyCalendarDays();
  const calendarSummary = getCalendarSummary(calendarDays);

  return (
    <section className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            <TranslatedText
              fallback="Learning Calendar"
              translationKey="progress.learningCalendar"
            />
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            <TranslatedText
              fallback="Your activity over the last 4 weeks."
              translationKey="progress.calendar.description"
            />
          </p>
        </div>

        <span
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
        >
          <TranslatedText
            fallback="Last 28 days"
            translationKey="progress.calendar.last28Days"
          />
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_180px]">
        <div>
          <div className="mb-4 grid grid-cols-7 gap-1.5 text-center text-xs text-slate-500 sm:gap-2">
            {weekDays.map((day) => (
              <span key={day.id}>
                <TranslatedText
                  fallback={day.label}
                  translationKey={day.translationKey}
                />
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarDays.map((day) => (
              <div
                key={day.id}
                className={clsx(
                  "aspect-square w-full rounded-md transition hover:ring-2 hover:ring-emerald-400/40",
                  intensityStyles[getIntensity(day.value)]
                )}
                title={`${day.day}: ${day.value}`}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <span>
              <TranslatedText fallback="Less" translationKey="progress.calendar.less" />
            </span>
            <div className="size-3 rounded bg-emerald-900/40" />
            <div className="size-3 rounded bg-emerald-700/60" />
            <div className="size-3 rounded bg-emerald-600/80" />
            <div className="size-3 rounded bg-emerald-400" />
            <span>
              <TranslatedText fallback="More" translationKey="progress.calendar.more" />
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          {calendarSummary.map((item, index) => (
            <div key={item.id}>
              <p className="text-sm text-slate-400">
                <TranslatedText
                  fallback={item.label}
                  translationKey={getCalendarSummaryLabelKey(item.id)}
                />
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {item.id === 2 ? (
                  <TranslatedText
                    fallback={item.value}
                    translationKey={getWeekdayTranslationKey(item.value)}
                  />
                ) : (
                  item.value
                )}
              </p>

              {index !== calendarSummary.length - 1 && (
                <div className="my-5 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getCalendarSummaryLabelKey(id: number) {
  const keys: Record<number, string> = {
    1: "progress.calendar.activeDays",
    2: "progress.calendar.bestDay",
    3: "progress.calendar.avgActivity",
  };

  return keys[id] ?? "common.noData";
}

function getWeekdayTranslationKey(day: string) {
  const keys: Record<string, string> = {
    Fri: "common.weekdays.fri",
    Mon: "common.weekdays.mon",
    Sat: "common.weekdays.sat",
    Sun: "common.weekdays.sun",
    Thu: "common.weekdays.thu",
    Tue: "common.weekdays.tue",
    Wed: "common.weekdays.wed",
  };

  return keys[day] ?? "progress.calendar.unknownDay";
}

function getEmptyCalendarDays(): LearningCalendarDay[] {
  return Array.from({ length: 28 }, (_, index) => ({
    id: index + 1,
    day: "",
    value: 0,
  }));
}

function getCalendarSummary(days: LearningCalendarDay[]): CalendarSummaryItem[] {
  const activeDays = days.filter((day) => day.value > 0);
  const bestDay = [...days].sort((first, second) => second.value - first.value)[0];
  const averageActivity = Math.round(
    days.reduce((total, day) => total + day.value, 0) / Math.max(days.length, 1)
  );

  return [
    {
      id: 1,
      label: "Active Days",
      value: String(activeDays.length),
    },
    {
      id: 2,
      label: "Best Day",
      value: bestDay?.value ? bestDay.day : "-",
    },
    {
      id: 3,
      label: "Avg Activity",
      value: String(averageActivity),
    },
  ];
}

import clsx from "clsx";

import {
  calendarSummary,
  learningCalendarData,
} from "../../data/progressData";

const weekDays = [
  { id: "monday", label: "M" },
  { id: "tuesday", label: "T" },
  { id: "wednesday", label: "W" },
  { id: "thursday", label: "T" },
  { id: "friday", label: "F" },
  { id: "saturday", label: "S" },
  { id: "sunday", label: "S" },
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

export default function LearningCalendar() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Learning Calendar
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your activity over the last 4 weeks.
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
        >
          Last 28 days
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_180px]">
        <div>
          <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
            {weekDays.map((day) => (
              <span key={day.id}>{day.label}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {learningCalendarData.map((day) => (
              <div
                key={day.id}
                className={clsx(
                  "h-11 w-full rounded-md transition hover:ring-2 hover:ring-emerald-400/40",
                  intensityStyles[getIntensity(day.value)]
                )}
                title={`${day.day}: ${day.value}`}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <span>Less</span>
            <div className="size-3 rounded bg-emerald-900/40" />
            <div className="size-3 rounded bg-emerald-700/60" />
            <div className="size-3 rounded bg-emerald-600/80" />
            <div className="size-3 rounded bg-emerald-400" />
            <span>More</span>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          {calendarSummary.map((item, index) => (
            <div key={item.id}>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {item.value}
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

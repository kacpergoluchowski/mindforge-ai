"use client";

import clsx from "clsx";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { TimeSpentColor, TimeSpentItem } from "../../types/progress.types";

const chartColors: Record<TimeSpentColor, string> = {
  violet: "#8b5cf6",
  emerald: "#10b981",
  blue: "#38bdf8",
  orange: "#fb923c",
};

const badgeStyles: Record<TimeSpentColor, string> = {
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  blue: "bg-sky-400",
  orange: "bg-orange-400",
};

type TimeSpentProps = {
  items: TimeSpentItem[];
};

export default function TimeSpent({ items }: TimeSpentProps) {
  const { t } = useI18n();
  const chartData = (items.length ? items : getEmptyCategoryData()).map((item) => ({
    ...item,
    label: translateCategoryLabel(item.label, t),
  }));

  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {t("progress.timeSpent", "Time Spent")}
          </h2>

          <p className="mt-1 text-sm text-emerald-400">
            {t("progress.basedOnStartedCourses", "Based on started courses")}
          </p>
        </div>

        <span
          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
        >
          {t("dashboard.thisWeek", "This Week")}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-6">
        <div className="relative mx-auto flex size-[190px] max-w-full items-center justify-center overflow-hidden sm:size-[210px] xl:size-[190px] 2xl:size-[210px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius="50%"
                outerRadius="78%"
                paddingAngle={4}
                stroke="none"
              >
                {chartData.map((item) => (
                  <Cell key={item.id} fill={chartColors[item.color]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{items.length}</span>
            <span className="mt-1 text-xs text-slate-400">
              {t("progress.topics", "Topics")}
            </span>
          </div>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {chartData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={clsx(
                    "size-2.5 shrink-0 rounded-full",
                    badgeStyles[item.color]
                  )}
                />

                <span className="truncate text-sm font-medium text-slate-300">
                  {item.label}
                </span>
              </div>

              <span className="text-sm font-medium text-white">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function getEmptyCategoryData(): TimeSpentItem[] {
  return [
    {
      id: 1,
      label: "No courses",
      value: 100,
      color: "violet",
    },
  ];
}

function translateCategoryLabel(
  label: string,
  translate: (key: string, fallback: string) => string
) {
  const keys: Record<string, string> = {
    "AI & ML": "dashboard.categories.aiMl",
    "AI Mentor": "navigation.aiMentor",
    Backend: "dashboard.categories.backend",
    Challenges: "navigation.challenges",
    Courses: "navigation.courses",
    Database: "dashboard.categories.database",
    Frontend: "dashboard.categories.frontend",
    Fullstack: "dashboard.categories.fullstack",
    "No courses": "progress.noCourses",
    Reading: "progress.reading",
  };

  return keys[label] ? translate(keys[label], label) : label;
}

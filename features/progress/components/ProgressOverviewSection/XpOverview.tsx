"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { XpOverviewItem } from "../../types/progress.types";

type XpOverviewProps = {
  dailyAverageXp: number;
  totalXp: number;
  weekXp: number;
  xpOverview: XpOverviewItem[];
};

export default function XpOverview({
  dailyAverageXp,
  totalXp,
  weekXp,
  xpOverview,
}: XpOverviewProps) {
  const { t } = useI18n();
  const chartData = (xpOverview.length ? xpOverview : getEmptyWeekData()).map(
    (item) => ({
      ...item,
      day: translateWeekday(item.day, t),
    })
  );

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">
          {t("progress.xpOverview", "XP Overview")}
        </h2>

        <span
          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
        >
          {t("dashboard.thisWeek", "This Week")}
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_170px]">
        <div className="h-[240px] w-full sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#1e293b"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                stroke="#64748b"
                fontSize={12}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => String(value)}
              />

              <Tooltip
                cursor={{ stroke: "#8b5cf6", strokeWidth: 1 }}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="xp"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#xpGradient)"
                dot={{
                  r: 4,
                  fill: "#111a2d",
                  stroke: "#a78bfa",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#8b5cf6",
                  stroke: "#c4b5fd",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          <div>
            <p className="text-sm text-slate-400">
              {t("progress.stats.totalXp", "Total XP")}
            </p>
            <p className="mt-2 text-3xl font-bold text-violet-400">
              {totalXp.toLocaleString()}
            </p>
          </div>

          <div className="my-6 h-px bg-white/10" />

          <div>
            <p className="text-sm text-slate-400">
              {t("dashboard.thisWeek", "This Week")}
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              +{weekXp.toLocaleString()}
            </p>
          </div>

          <div className="my-6 h-px bg-white/10" />

          <div>
            <p className="text-sm text-slate-400">
              {t("progress.dailyAverage", "Daily Average")}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-200">
              {dailyAverageXp.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function getEmptyWeekData(): XpOverviewItem[] {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    day,
    xp: 0,
  }));
}

function translateWeekday(
  day: string,
  translate: (key: string, fallback: string) => string
) {
  const keys: Record<string, string> = {
    Fri: "common.weekdays.fri",
    Mon: "common.weekdays.mon",
    Sat: "common.weekdays.sat",
    Sun: "common.weekdays.sun",
    Thu: "common.weekdays.thu",
    Tue: "common.weekdays.tue",
    Wed: "common.weekdays.wed",
  };

  return keys[day] ? translate(keys[day], day) : day;
}

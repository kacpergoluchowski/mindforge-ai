"use client";

import clsx from "clsx";
import { Cell, Pie, PieChart } from "recharts";

import { timeSpentData } from "../../data/progressData";
import type { TimeSpentColor } from "../../types/progress.types";

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

export default function TimeSpent() {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Time Spent</h2>

          <p className="mt-1 text-sm text-emerald-400">
            +2h 30m from last week
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
        >
          This Week
        </button>
      </div>

      <div className="grid items-center gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="relative flex h-[230px] items-center justify-center overflow-hidden">
          <PieChart width={230} height={230}>
            <Pie
              data={timeSpentData}
              dataKey="value"
              nameKey="label"
              innerRadius={65}
              outerRadius={92}
              paddingAngle={4}
              stroke="none"
            >
              {timeSpentData.map((item) => (
                <Cell key={item.id} fill={chartColors[item.color]} />
              ))}
            </Pie>
          </PieChart>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">12h 45m</span>
            <span className="mt-1 text-sm text-slate-400">Total</span>
          </div>
        </div>

        <div className="space-y-4">
          {timeSpentData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    "size-2.5 rounded-full",
                    badgeStyles[item.color]
                  )}
                />

                <span className="text-sm text-slate-300">{item.label}</span>
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

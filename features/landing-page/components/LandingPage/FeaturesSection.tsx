import { CheckCircle2, ShieldCheck } from "lucide-react";

import {
  dashboardLinks,
  dashboardStats,
  platformFeatures,
  platformStats,
} from "../../data/landingPageData";
import LandingCtaLink from "./LandingCtaLink";
import LandingSectionHeader from "./LandingSectionHeader";

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <LandingSectionHeader
              eyebrow="All-in-one platform"
              title="Everything you need to become a better developer"
              subtitle="MindForge AI combines courses, AI assistance and hands-on practice in one focused learning workspace."
            />

            <ul className="mt-8 space-y-4">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="size-5 text-violet-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <LandingCtaLink href="/register" variant="secondary">
                Explore Features
              </LandingCtaLink>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0d1424] p-3 shadow-[0_0_80px_rgba(15,23,42,0.75)]">
            <div className="grid min-h-[430px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070d19] lg:grid-cols-[180px_1fr]">
              <aside className="hidden border-r border-white/10 bg-white/[0.02] p-5 lg:block">
                <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck className="size-5 text-violet-400" />
                  MindForge AI
                </div>

                <div className="space-y-2 text-sm">
                  {dashboardLinks.map(({ label, icon: Icon }, index) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                        index === 0
                          ? "bg-violet-500/20 text-white"
                          : "text-slate-400"
                      }`}
                    >
                      <Icon className="size-4" />
                      {label}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xl font-bold text-white">
                      Welcome back, Kacper
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Keep going, you are making great progress.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-violet-500/10 px-5 py-4">
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-xs text-slate-400">day streak</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-4">
                  {dashboardStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-semibold text-white">Continue Learning</p>
                    <CourseProgress title="React Fundamentals" progress="67%" />
                    <CourseProgress title="Next.js App Router" progress="42%" />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">Weekly Goal</p>
                      <p className="text-sm text-violet-300">72%</p>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[72%] rounded-full bg-violet-500" />
                    </div>
                    <div className="mt-6 space-y-3 text-sm text-slate-400">
                      <ActivityItem
                        color="bg-emerald-400"
                        label="Completed lesson"
                      />
                      <ActivityItem color="bg-yellow-400" label="Earned 110 XP" />
                      <ActivityItem color="bg-violet-400" label="Code review" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-4 lg:mt-12">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="border-white/10 p-6 text-center md:border-r md:last:border-r-0"
            >
              <p className="text-3xl font-bold text-violet-300">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type CourseProgressProps = {
  progress: string;
  title: string;
};

function CourseProgress({ progress, title }: CourseProgressProps) {
  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-violet-300">{progress}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-violet-500"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}

type ActivityItemProps = {
  color: string;
  label: string;
};

function ActivityItem({ color, label }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`size-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}

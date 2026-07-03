import { Clock } from "lucide-react";

import { courses } from "../../data/landingPageData";
import LandingCtaLink from "./LandingCtaLink";
import LandingSectionHeader from "./LandingSectionHeader";

export default function CoursesSection() {
  return (
    <section id="courses" className="px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <LandingSectionHeader
            eyebrow="Courses"
            title="Start with practical courses built for real progress."
            subtitle="Learn step by step with lessons, quizzes, practice tasks and projects that build your portfolio skills."
          />

          <LandingCtaLink href="/learn/courses" variant="secondary">
            Browse courses
          </LandingCtaLink>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {courses.map(({ title, description, level, duration, icon: Icon }) => (
            <article
              key={title}
              className="flex min-h-[320px] flex-col rounded-3xl border border-white/10 bg-[#0d1424] p-6"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <Icon className="size-6" />
              </div>

              <div className="mt-6 flex-1">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
                <span className="rounded-full bg-violet-500/10 px-3 py-1 font-medium text-violet-200">
                  {level}
                </span>
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="size-4 text-violet-300" />
                  {duration}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

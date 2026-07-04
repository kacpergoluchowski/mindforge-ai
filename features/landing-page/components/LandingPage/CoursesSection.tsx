import { CheckCircle2, Clock, Sparkles } from "lucide-react";

import { courses } from "../../data/landingPageData";
import AnimatedSection from "./AnimatedSection";
import LandingCtaLink from "./LandingCtaLink";
import LandingSectionHeader from "./LandingSectionHeader";

// Sekcja kursów nie listuje wszystkiego z aplikacji.
// Jej zadanie to pokazać jakość ścieżki nauki i pierwszy konkretny kurs startowy.
export default function CoursesSection() {
  // Pierwszy kurs z danych traktujemy jako rekomendowany start.
  const [featuredCourse] = courses;

  return (
    <section
      id="courses"
      aria-labelledby="courses-title"
      className="px-6 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <LandingSectionHeader
            eyebrow="Courses"
            title="Start with practical courses built for real progress."
            titleId="courses-title"
            subtitle="Learn step by step with lessons, quizzes, practice tasks and projects that build your portfolio skills."
          />

          <LandingCtaLink href="/learn/courses" variant="secondary">
            Browse courses
          </LandingCtaLink>
        </div>

        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Wyróżniona karta pokazuje konkretny rezultat kursu, a nie tylko nazwę. */}
          <AnimatedSection
            as="article"
            className="overflow-hidden rounded-[2rem] border border-violet-400/30 bg-violet-500/10"
          >
            <div className="border-b border-white/10 p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-[0_0_28px_rgba(139,92,246,0.35)]">
                  <featuredCourse.icon aria-hidden="true" className="size-7" />
                </div>
                <span className="rounded-full border border-violet-300/30 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-100">
                  Recommended start
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold text-white sm:text-3xl">
                {featuredCourse.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {featuredCourse.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <CourseMeta label="Level" value={featuredCourse.level} />
                <CourseMeta label="Duration" value={featuredCourse.duration} />
                <CourseMeta label="Outcome" value="Landing page" />
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <p className="text-sm font-semibold text-white">
                What you will build
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Semantic HTML pages",
                  "Responsive layouts",
                  "Reusable UI sections",
                  "SaaS landing page",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-sm text-slate-300"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4 text-emerald-300"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            className="rounded-[2rem] border border-white/10 bg-[#0d1424] p-6 lg:p-8"
            delay={0.12}
          >
            {/* Learning track pokazuje kolejność nauki, podobnie jak prosty roadmap preview. */}
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <Sparkles aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Frontend learning track
                </h3>
                <p className="text-sm text-slate-500">
                  Follow courses in the right order.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {courses.map((course, index) => (
                <TrackStep
                  key={course.title}
                  course={course}
                  index={index}
                  isLast={index === courses.length - 1}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

type CourseMetaProps = {
  label: string;
  value: string;
};

function CourseMeta({ label, value }: CourseMetaProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

type TrackStepProps = {
  course: (typeof courses)[number];
  index: number;
  isLast: boolean;
};

function TrackStep({ course, index, isLast }: TrackStepProps) {
  const Icon = course.icon;
  const isActive = index === 0;

  return (
    <article className="relative grid grid-cols-[44px_1fr] gap-4">
      {/* Pionowa linia łączy kroki i daje efekt ścieżki nauki. */}
      {!isLast ? (
        <div className="absolute left-[21px] top-12 h-[calc(100%-12px)] w-px bg-white/10" />
      ) : null}

      <div
        className={`relative z-10 flex size-11 items-center justify-center rounded-2xl border ${
          isActive
            ? "border-violet-300/40 bg-violet-500 text-white"
            : "border-white/10 bg-slate-950/40 text-violet-300"
        }`}
      >
        <Icon className="size-5" />
      </div>

      <div
        className={`rounded-3xl border p-5 ${
          isActive
            ? "border-violet-400/30 bg-violet-500/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              Step {index + 1}
            </p>
            <h4 className="mt-2 text-lg font-semibold text-white">
              {course.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {course.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 font-medium text-violet-200">
              {course.level}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-950/40 px-3 py-1 text-slate-400">
              <Clock aria-hidden="true" className="size-3.5 text-violet-300" />
              {course.duration}
            </span>
          </div>
        </div>

        {isActive ? (
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[18%] rounded-full bg-violet-500" />
          </div>
        ) : null}
      </div>
    </article>
  );
}

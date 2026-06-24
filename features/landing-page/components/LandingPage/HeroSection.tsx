import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

import HeroHighlights from "./HeroHighlights";

export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center">
      <div className="mb-8 flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-2 text-sm text-violet-300">
        <Rocket className="size-4" />
        AI-Powered Learning Platform
      </div>

      <h1 className="max-w-4xl text-5xl font-bold text-white sm:text-6xl lg:text-8xl">
        MindForge AI
      </h1>

      <p className="mt-6 text-2xl font-semibold text-violet-300 sm:text-3xl">
        Learn faster. Build smarter.
      </p>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl sm:leading-9">
        Master programming with AI mentors, personalized learning paths and
        real-world projects.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/register"
          className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-500"
        >
          Start Learning Free
          <ArrowRight className="size-5" />
        </Link>

        <Link
          href="/dashboard"
          className="rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/5"
        >
          Watch Demo
        </Link>
      </div>

      <HeroHighlights />
    </section>
  );
}

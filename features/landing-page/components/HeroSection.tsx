import { ArrowRight, Bot, Code2, GraduationCap, Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center">
      <div
        className="
          mb-8 flex items-center gap-2
          rounded-full border border-violet-500/20
          bg-violet-500/5
          px-4 py-2
          text-sm text-violet-300
        "
      >
        🚀 AI-Powered Learning Platform
      </div>

      <h1
        className="
          max-w-4xl
          text-6xl font-bold tracking-tight text-white
          lg:text-8xl
        "
      >
        Learn Faster.
        <br />
        <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          Build Smarter.
        </span>
      </h1>

      <p
        className="
          mt-8 max-w-3xl
          text-xl leading-9 text-slate-400
        "
      >
        Master programming with AI mentors, personalized
        learning paths and real-world projects.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          className="
            flex items-center justify-center gap-2
            rounded-2xl
            bg-violet-600
            px-8 py-4
            font-semibold text-white
            transition
            hover:bg-violet-500
          "
        >
          Start Learning Free
          <ArrowRight className="size-5" />
        </button>

        <button
          className="
            rounded-2xl
            border border-white/10
            px-8 py-4
            font-semibold text-white
            transition
            hover:bg-white/5
          "
        >
          Watch Demo
        </button>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-4 text-violet-400" />
          Structured Paths
        </div>

        <div className="flex items-center gap-2">
          <Bot className="size-4 text-violet-400" />
          AI Mentor
        </div>

        <div className="flex items-center gap-2">
          <Code2 className="size-4 text-violet-400" />
          Code Reviews
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-violet-400" />
          Challenges
        </div>
      </div>
    </section>
  );
}
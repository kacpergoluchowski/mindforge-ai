import { Bot, ChevronDown } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white">
          Good morning, Kacper! 👋
        </h1>

        <p className="mt-1 text-sm lg:text-lg xl:text-xl text-slate-400">
          Ready to continue your learning journey?
        </p>
      </div>

      <button
        type="button"
        className="
          flex items-center justify-center gap-3
          rounded-2xl
          bg-violet-500
          px-6 py-3 lg:py-4 
          font-medium text-white
          transition
          hover:bg-violet-600
        "
      >
        <Bot className="size-5" />

        <span>Chat with AI Mentor</span>

        <ChevronDown className="size-4" />
      </button>
    </section>
  );
}

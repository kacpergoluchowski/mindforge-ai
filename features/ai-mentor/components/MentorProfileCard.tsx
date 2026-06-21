import { Bot } from "lucide-react";

const mentorSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
];

export default function MentorProfileCard() {
  return (
    <aside className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="flex items-center gap-4">
        <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
          <div className="absolute inset-0 rounded-full bg-violet-500/40 blur-xl" />

          <Bot className="relative size-10 text-white" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            AI Mentor
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />

            <span className="text-sm text-slate-400">
              Online
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-6 text-slate-400">
        Your AI programming mentor, ready to help you learn and grow.
      </p>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-medium text-white">
          Expertise
        </h4>

        <div className="flex flex-wrap gap-2">
          {mentorSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-xl bg-slate-800/80 px-3 py-1.5 text-sm text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
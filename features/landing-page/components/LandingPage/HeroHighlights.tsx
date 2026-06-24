import { Bot, Code2, GraduationCap, Trophy } from "lucide-react";

const highlights = [
  { label: "Structured Paths", icon: GraduationCap },
  { label: "AI Mentor", icon: Bot },
  { label: "Code Reviews", icon: Code2 },
  { label: "Challenges", icon: Trophy },
];

export default function HeroHighlights() {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
      {highlights.map(({ label, icon: Icon }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className="size-4 text-violet-400" />
          {label}
        </div>
      ))}
    </div>
  );
}

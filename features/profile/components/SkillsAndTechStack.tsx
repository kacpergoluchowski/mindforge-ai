import { Plus } from "lucide-react";

import { skills } from "../data/profileData";

export default function SkillsAndTechStack() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Skills & Tech Stack
        </h2>

        <button
          type="button"
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          Manage Skills
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.name}
              className="
                flex items-center gap-3
                rounded-2xl
                border border-white/10
                bg-slate-950/40
                px-4 py-3
                transition
                hover:border-violet-500/30
              "
            >
              <Icon className="size-4 text-violet-400" />

              <span className="text-sm font-medium text-white">
                {skill.name}
              </span>
            </div>
          );
        })}

        <button
          type="button"
          className="
            flex items-center gap-3
            rounded-2xl border border-dashed border-white/20
            px-4 py-3
            text-slate-400
            transition
            hover:border-violet-500/30
            hover:text-violet-300
          "
        >
          <Plus className="size-4" />
          Add Skill
        </button>
      </div>
    </section>
  );
}
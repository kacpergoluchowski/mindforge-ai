import { Atom, Code2, Database, FileCode2, Layers3, Plus } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import type { CurrentProfileSkill } from "../../types/profile.types";

type SkillsAndTechStackProps = {
  skills: CurrentProfileSkill[];
};

const skillIcons = {
  javascript: FileCode2,
  typescript: Code2,
  react: Atom,
  "next.js": Layers3,
  "node.js": Database,
};

export default function SkillsAndTechStack({
  skills,
}: SkillsAndTechStackProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Skills & Tech Stack"
            translationKey="profile.skillsTechStack"
          />
        </h2>

        <button
          type="button"
          className="w-fit rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-400/30 hover:bg-white/5"
        >
          <TranslatedText
            fallback="Manage Skills"
            translationKey="profile.manageSkills"
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const Icon =
            skillIcons[skill.name.toLowerCase() as keyof typeof skillIcons] ??
            Code2;

          return (
            <div
              key={skill.name}
              className="
                flex items-center gap-3
                rounded-2xl
                border border-white/10
                bg-[#0b1220]/70
                px-4 py-3
                transition
                hover:border-violet-500/30
                hover:bg-white/5
              "
            >
              <Icon className="size-4 text-violet-400" />

              <span className="text-sm font-medium text-white">
                {skill.name}
              </span>
            </div>
          );
        })}

        {skills.length === 0 && (
          <p className="w-full rounded-2xl border border-dashed border-white/10 bg-[#0b1220]/60 p-4 text-sm text-slate-400">
            <TranslatedText
              fallback="No skills added yet."
              translationKey="profile.noSkills"
            />
          </p>
        )}

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
          <TranslatedText fallback="Add Skill" translationKey="profile.addSkill" />
        </button>
      </div>
    </section>
  );
}

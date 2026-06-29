"use client";

import { useState } from "react";
import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import { challengeCategories } from "../data/challengesData";

type ChallengeCategory = (typeof challengeCategories)[number];

export default function ChallengeCategories() {
  const [activeCategory, setActiveCategory] =
    useState<ChallengeCategory>("All Challenges");

  return (
    <section className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {challengeCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setActiveCategory(category)}
          className={clsx(
            "shrink-0 rounded-xl border px-5 py-2.5 text-sm font-medium transition",
            activeCategory === category
              ? "border-violet-500 bg-violet-500 text-white"
              : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-white"
          )}
        >
          <ChallengeCategoryLabel category={category} />
        </button>
      ))}
    </section>
  );
}

function ChallengeCategoryLabel({ category }: { category: ChallengeCategory }) {
  const keys: Record<string, string> = {
    "All Challenges": "challenges.categories.all",
    AI: "challenges.categories.ai",
    Algorithms: "challenges.categories.algorithms",
    Backend: "challenges.categories.backend",
    DevOps: "challenges.categories.devops",
    Frontend: "challenges.categories.frontend",
    Fullstack: "challenges.categories.fullstack",
    "System Design": "challenges.categories.systemDesign",
  };

  return (
    <TranslatedText
      fallback={category}
      translationKey={keys[category] ?? "challenges.categories.all"}
    />
  );
}

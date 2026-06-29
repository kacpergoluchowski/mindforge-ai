import { Play, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";

type BannerActionProps = {
  icon?: LucideIcon;
  label: string;
  translationKey: string;
  variant: "primary" | "secondary";
};

const bannerActions: BannerActionProps[] = [
  {
    label: "Browse Challenges",
    translationKey: "challenges.browseChallenges",
    variant: "primary",
  },
  {
    icon: Play,
    label: "How It Works",
    translationKey: "challenges.howItWorks",
    variant: "secondary",
  },
];

export default function ChallengeBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-[#111326] px-6 py-8 lg:px-10">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-violet-500/5 to-transparent" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-violet-400">
            <Trophy className="size-5" />
            <span className="text-sm font-medium">
              <TranslatedText
                fallback="Push Your Limits"
                translationKey="challenges.bannerBadge"
              />
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white lg:text-5xl">
            <TranslatedText
              fallback="Solve. Learn. Grow."
              translationKey="challenges.bannerTitle"
            />
          </h2>

          <p className="mt-4 max-w-xl text-slate-400">
            <TranslatedText
              fallback="Join thousands of developers improving their skills through real coding challenges."
              translationKey="challenges.bannerSubtitle"
            />
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {bannerActions.map((action) => (
              <BannerAction key={action.label} {...action} />
            ))}
          </div>
        </div>

        <BannerVisual />
      </div>
    </section>
  );
}

function BannerAction({
  icon: Icon,
  label,
  translationKey,
  variant,
}: BannerActionProps) {
  if (variant === "primary") {
    return (
      <button
        type="button"
        className="rounded-2xl bg-violet-500 px-6 py-3 font-medium text-white transition hover:bg-violet-600"
      >
        <TranslatedText fallback={label} translationKey={translationKey} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-3 text-slate-300 transition hover:bg-white/[0.05]"
    >
      {Icon && <Icon className="size-4" />}
      <TranslatedText fallback={label} translationKey={translationKey} />
    </button>
  );
}

function BannerVisual() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="flex size-56 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/20">
        <Trophy className="size-28 text-violet-400" />
      </div>
    </div>
  );
}

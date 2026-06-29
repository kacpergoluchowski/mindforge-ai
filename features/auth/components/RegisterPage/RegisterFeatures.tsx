"use client";

import {
  Rocket,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

const features = [
  {
    descriptionKey: "auth.features.roadmapsLongDescription",
    titleKey: "auth.features.aiRoadmaps",
    title: "AI-Powered Roadmaps",
    description:
      "Personalized learning paths tailored to your goals.",
    icon: Rocket,
  },
  {
    descriptionKey: "auth.features.trackImproveDescription",
    titleKey: "auth.features.trackImprove",
    title: "Track & Improve",
    description:
      "Monitor your progress and celebrate every milestone.",
    icon: TrendingUp,
  },
  {
    descriptionKey: "auth.features.achievementsLongDescription",
    titleKey: "auth.features.achievements",
    title: "Earn Achievements",
    description:
      "Unlock badges and prove your skills to the world.",
    icon: Trophy,
  },
  {
    descriptionKey: "auth.features.communityLongDescription",
    titleKey: "auth.features.community",
    title: "Join Community",
    description:
      "Connect with developers and learn together worldwide.",
    icon: Users,
  },
];

export default function RegisterFeatures() {
  const { t } = useI18n();

  return (
    <div className="mt-8 flex flex-col gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.title} className="flex items-center gap-4">
            <div
              className="
                flex size-14 shrink-0 items-center justify-center
                rounded-lg
                border border-white/10
                bg-white/[0.03]
              "
            >
              <Icon className="size-6 text-fuchsia-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {t(feature.titleKey, feature.title)}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                {t(feature.descriptionKey, feature.description)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

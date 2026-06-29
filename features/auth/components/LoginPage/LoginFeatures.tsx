"use client";

import { Rocket, TrendingUp, Trophy, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

const features = [
  {
    descriptionKey: "auth.features.roadmapsDescription",
    titleKey: "auth.features.roadmaps",
    title: "Personalized Roadmaps",
    description: "AI-tailored paths for your goals.",
    icon: Rocket,
  },
  {
    descriptionKey: "auth.features.progressDescription",
    titleKey: "auth.features.progress",
    title: "Track Progress",
    description: "Monitor your skills and XP.",
    icon: TrendingUp,
  },
  {
    descriptionKey: "auth.features.achievementsDescription",
    titleKey: "auth.features.achievements",
    title: "Earn Achievements",
    description: "Unlock badges and prove your skills.",
    icon: Trophy,
  },
  {
    descriptionKey: "auth.features.communityDescription",
    titleKey: "auth.features.community",
    title: "Join Community",
    description: "Connect with developers worldwide.",
    icon: Users,
  },
];

export default function LoginFeatures() {
  const { t } = useI18n();

  return (
    <div className="mt-8 flex flex-col gap-4">
      {features.map(({ title, titleKey, description, descriptionKey, icon: Icon }) => (
        <div key={title} className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
            <Icon className="size-6 text-fuchsia-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">{t(titleKey, title)}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {t(descriptionKey, description)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

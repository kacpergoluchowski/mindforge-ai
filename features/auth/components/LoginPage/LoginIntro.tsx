"use client";

import { Sparkles } from "lucide-react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import LoginFeatures from "./LoginFeatures";

type LoginIntroProps = {
  compact?: boolean;
};

export default function LoginIntro({ compact = false }: LoginIntroProps) {
  const { t } = useI18n();

  return (
    <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
        <Sparkles className="size-4" />
        {t("auth.badge", "AI-Powered Learning Platform")}
      </div>

      <h1 className="max-w-xl text-4xl font-bold leading-tight text-white lg:text-5xl">
        {t("auth.login.heroTitleStart", "Welcome back, let's")}{" "}
        <span className="text-violet-400">
          {t("auth.login.heroTitleHighlight", "continue building.")}
        </span>
      </h1>

      <p className="mt-4 max-w-lg text-base leading-7 text-slate-400 lg:text-lg lg:leading-8">
        {t(
          "auth.login.heroSubtitle",
          "Pick up where you left off and keep growing with your AI mentor."
        )}
      </p>

      {!compact && <LoginFeatures />}
    </div>
  );
}

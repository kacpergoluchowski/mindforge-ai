import { Calendar, MapPin, Pencil, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import LocalizedDate from "@/components/shared/LocalizedDate";
import TranslatedText from "@/components/shared/TranslatedText";
import type { CurrentProfile } from "../../types/profile.types";
import { getInitials } from "../../utils/profileFormatters";

type ProfileHeroProps = {
  profile: CurrentProfile;
};

export default function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-3xl border border-violet-400/30 bg-violet-500/15 shadow-[0_18px_60px_rgba(139,92,246,0.18)] sm:size-28">
            {profile.fullName ? (
              <span className="text-3xl font-bold text-violet-100">
                {getInitials(profile.fullName)}
              </span>
            ) : (
              <User className="size-12 text-violet-200" />
            )}
          </div>

          <div className="min-w-0">
            <span className="inline-flex w-fit items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <TranslatedText
                fallback={formatPlanFallback(profile.plan)}
                translationKey={getPlanTranslationKey(profile.plan)}
              />
            </span>

            <h1 className="mt-4 break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {profile.fullName}
            </h1>

            <p className="mt-2 text-base text-slate-400 sm:text-lg">
              {profile.role ?? (
                <TranslatedText
                  fallback="Software Engineer"
                  translationKey="profile.defaultRole"
                />
              )}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
              <ProfileMetaItem icon={MapPin}>
                {profile.location ?? (
                  <TranslatedText
                    fallback="Location not set"
                    translationKey="profile.locationNotSet"
                  />
                )}
              </ProfileMetaItem>

              <ProfileMetaItem icon={Calendar}>
                <TranslatedText fallback="Joined" translationKey="profile.joined" />{" "}
                <LocalizedDate
                  date={profile.createdAt}
                  options={{ month: "long", year: "numeric" }}
                />
              </ProfileMetaItem>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {profile.bio ?? (
                <TranslatedText
                  fallback="Add a short bio to tell the community about your learning goals."
                  translationKey="profile.emptyBio"
                />
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0b1220]/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400/30 hover:bg-white/5"
        >
          <Pencil className="size-4" />
          <TranslatedText fallback="Edit Profile" translationKey="profile.editProfile" />
        </button>
      </div>
    </section>
  );
}

type ProfileMetaItemProps = {
  children: ReactNode;
  icon: LucideIcon;
};

function ProfileMetaItem({ children, icon: Icon }: ProfileMetaItemProps) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-[#0b1220]/60 px-3 py-2">
      <Icon className="size-4 shrink-0 text-violet-300" />
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

function getPlanTranslationKey(plan: string) {
  const normalizedPlan = plan.toLowerCase();

  if (normalizedPlan === "free") return "profile.plans.free";
  if (normalizedPlan === "pro") return "profile.plans.pro";
  if (normalizedPlan === "premium") return "profile.plans.premium";

  return "profile.plans.default";
}

function formatPlanFallback(plan: string) {
  return `${plan.charAt(0).toUpperCase()}${plan.slice(1)} Plan`;
}

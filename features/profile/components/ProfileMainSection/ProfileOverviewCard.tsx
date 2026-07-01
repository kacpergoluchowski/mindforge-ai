import {
  Calendar,
  MapPin,
  Pencil,
  User,
} from "lucide-react";

import LocalizedDate from "@/components/shared/LocalizedDate";
import TranslatedText from "@/components/shared/TranslatedText";
import type { CurrentProfile } from "../../types/profile.types";
import { getInitials } from "../../utils/profileFormatters";

type ProfileOverviewCardProps = {
  profile: CurrentProfile;
};

export default function ProfileOverviewCard({
  profile,
}: ProfileOverviewCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        <TranslatedText
          fallback="Profile Overview"
          translationKey="profile.overview"
        />
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex size-32 shrink-0 items-center justify-center rounded-full border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/20 to-blue-500/20">
          {profile.fullName ? (
            <span className="text-3xl font-bold text-violet-200">
              {getInitials(profile.fullName)}
            </span>
          ) : (
            <User className="size-14 text-violet-300" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <h3 className="text-3xl font-bold text-white">
              {profile.fullName}
            </h3>

            <span className="w-fit rounded-xl bg-violet-500/15 px-3 py-1 text-sm font-medium text-violet-300">
              <TranslatedText
                fallback={formatPlanFallback(profile.plan)}
                translationKey={getPlanTranslationKey(profile.plan)}
              />
            </span>
          </div>

          <p className="mt-2 text-lg text-slate-400">
            {profile.role ?? (
              <TranslatedText
                fallback="Software Engineer"
                translationKey="profile.defaultRole"
              />
            )}
          </p>

          <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              {profile.location ?? (
                <TranslatedText
                  fallback="Location not set"
                  translationKey="profile.locationNotSet"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <TranslatedText fallback="Joined" translationKey="profile.joined" />{" "}
              <LocalizedDate
                date={profile.createdAt}
                options={{ month: "long", year: "numeric" }}
              />
            </div>
          </div>

          <p className="mt-6 max-w-2xl leading-7 text-slate-300">
            {profile.bio ??
              (
                <TranslatedText
                  fallback="Add a short bio to tell the community about your learning goals."
                  translationKey="profile.emptyBio"
                />
              )}
          </p>

          <button
            type="button"
            className="
              mt-6 flex items-center gap-2
              rounded-xl border border-white/10
              px-4 py-2
              text-sm font-medium text-white
              transition
              hover:bg-white/5
            "
          >
            <Pencil className="size-4" />
            <TranslatedText fallback="Edit Profile" translationKey="profile.editProfile" />
          </button>
        </div>
      </div>
    </section>
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

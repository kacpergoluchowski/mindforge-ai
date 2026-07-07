import ProgressActivitySection from "@/features/progress/components/ProgressActivitySection/ProgressActivitySection";
import ProgressGoalSection from "@/features/progress/components/ProgressGoalSection/ProgressGoalSection";
import ProgressHero from "@/features/progress/components/ProgressHero/ProgressHero";
import ProgressOverviewSection from "@/features/progress/components/ProgressOverviewSection/ProgressOverviewSection";
import ProgressStats from "@/features/progress/components/ProgressStats/ProgressStats";
import ProgressTopicsSection from "@/features/progress/components/ProgressTopicsSection/ProgressTopicsSection";
import { getProgressSummary } from "@/features/progress/api/getProgressSummary";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { redirect } from "next/navigation";

export const metadata = {
  title: "MindForge | Progress",
};

export default async function ProgressPage() {
  const [profile, progressSummary] = await Promise.all([
    getCurrentProfile(),
    getProgressSummary(),
  ]);

  if (!profile) redirect("/login");

  return (
    <div className="min-w-0 space-y-6 pb-24 xl:pb-8">
      <ProgressHero profile={profile} summary={progressSummary} />
      <ProgressStats profile={profile} summary={progressSummary} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="min-w-0 space-y-5">
          <ProgressOverviewSection profile={profile} summary={progressSummary} />
          <ProgressTopicsSection summary={progressSummary} />
          <ProgressActivitySection summary={progressSummary} />
        </div>

        <ProgressGoalSection summary={progressSummary} />
      </div>
    </div>
  );
}

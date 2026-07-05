import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import ProgressActivitySection from "@/features/progress/components/ProgressActivitySection/ProgressActivitySection";
import ProgressGoalSection from "@/features/progress/components/ProgressGoalSection/ProgressGoalSection";
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
    <div className="space-y-5 pb-24 xl:pb-8">
      <PageHeader
        title={<TranslatedText translationKey="progress.title" fallback="Progress" />}
        subtitle={
          <TranslatedText
            translationKey="progress.subtitle"
            fallback="Track your learning journey and achievements."
          />
        }
      />
      <ProgressStats profile={profile} summary={progressSummary} />

      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
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

import PageHeader from "@/components/shared/PageHeader";
import ProgressActivitySection from "@/features/progress/components/ProgressActivitySection/ProgressActivitySection";
import ProgressGoalSection from "@/features/progress/components/ProgressGoalSection/ProgressGoalSection";
import ProgressOverviewSection from "@/features/progress/components/ProgressOverviewSection/ProgressOverviewSection";
import ProgressStats from "@/features/progress/components/ProgressStats/ProgressStats";
import ProgressTopicsSection from "@/features/progress/components/ProgressTopicsSection/ProgressTopicsSection";
import { getProgressSummary } from "@/features/progress/api/getProgressSummary";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { redirect } from "next/navigation";

export default async function ProgressPage() {
  const [profile, progressSummary] = await Promise.all([
    getCurrentProfile(),
    getProgressSummary(),
  ]);

  if (!profile) redirect("/login");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Progress"
        subtitle="Track your learning journey and achievements."
      />
      <ProgressStats profile={profile} summary={progressSummary} />
      <ProgressOverviewSection totalXp={profile.xp} />
      <ProgressTopicsSection />
      <ProgressActivitySection activities={progressSummary?.recentActivities ?? []} />
      <ProgressGoalSection />
    </div>
  );
}

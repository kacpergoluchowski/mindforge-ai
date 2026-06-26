import PageHeader from "@/components/shared/PageHeader";
import ActivityFeed from "@/features/dashboard/components/ActivityFeed/ActivityFeed";
import ContinueLearning from "@/features/dashboard/components/ContinueLearning/ContinueLearning";
import LearningOverview from "@/features/dashboard/components/LearningOverview/LearningOverview";
import RecommendedCourses from "@/features/dashboard/components/RecommendedCourses/RecommendedCourses";
import StatsGrid from "@/features/dashboard/components/stats/StatsGrid";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { getProgressSummary } from "@/features/progress/api/getProgressSummary";
import { getFirstName } from "@/features/profile/utils/profileFormatters";
import { Bot, ChevronDown } from "lucide-react";

export default async function DashboardPage() {
  const [profile, progressSummary] = await Promise.all([
    getCurrentProfile(),
    getProgressSummary(),
  ]);
  const firstName = profile ? getFirstName(profile.fullName) : "there";

  return (
    <div className="space-y-4">
      <PageHeader
        title={`Good morning, ${firstName}!`}
        subtitle="Ready to continue your learning journey?"
        action={{
          label: "Chat with AI Mentor",
          icon: Bot,
          rightIcon: ChevronDown,
        }}
      />
      <StatsGrid profile={profile} summary={progressSummary} />
      <div className="grid gap-4 semiXl:grid-cols-5">
        <div className="h-full semiXl:col-span-3">
          <LearningOverview summary={progressSummary} />
        </div>
        <div className="h-full semiXl:col-span-2">
          <ContinueLearning />
        </div>
      </div>
      <div className="grid gap-4 semiXl:grid-cols-5">
        <div className="semiXl:col-span-3">
          <RecommendedCourses />
        </div>
        <div className="semiXl:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

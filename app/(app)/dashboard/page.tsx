import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import ActivityFeed from "@/features/dashboard/components/ActivityFeed/ActivityFeed";
import ContinueLearning from "@/features/dashboard/components/ContinueLearning/ContinueLearning";
import LearningOverview from "@/features/dashboard/components/LearningOverview/LearningOverview";
import RecommendedCourses from "@/features/dashboard/components/RecommendedCourses/RecommendedCourses";
import StatsGrid from "@/features/dashboard/components/stats/StatsGrid";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { getProgressSummary } from "@/features/progress/api/getProgressSummary";
import { getFirstName } from "@/features/profile/utils/profileFormatters";
import { Bot, ChevronDown } from "lucide-react";

export const metadata = {
  title: "MindForge | Dashboard",
};

export default async function DashboardPage() {
  const [profile, progressSummary] = await Promise.all([
    getCurrentProfile(),
    getProgressSummary(),
  ]);
  const firstName = profile ? getFirstName(profile.fullName) : "there";

  return (
    <div className="space-y-4 lg:space-y-5">
      <PageHeader
        title={
          <TranslatedText
            fallback="Good morning, {name}!"
            translationKey="dashboard.title"
            values={{ name: firstName }}
          />
        }
        subtitle={
          <TranslatedText
            fallback="Ready to continue your learning journey?"
            translationKey="dashboard.subtitle"
          />
        }
        action={{
          href: "/ai-mentor/chat",
          label: (
            <TranslatedText
              fallback="Chat with AI Mentor"
              translationKey="dashboard.chatWithAiMentor"
            />
          ),
          icon: Bot,
          rightIcon: ChevronDown,
        }}
      />
      <StatsGrid profile={profile} summary={progressSummary} />
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="min-w-0 xl:col-span-3">
          <LearningOverview summary={progressSummary} />
        </div>
        <div className="min-w-0 xl:col-span-2">
          <ContinueLearning />
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="min-w-0 xl:col-span-3">
          <RecommendedCourses />
        </div>
        <div className="min-w-0 xl:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

import PageHeader from "@/components/shared/PageHeader";
import ActivityFeed from "@/features/dashboard/components/ActivityFeed/ActivityFeed";
import ContinueLearning from "@/features/dashboard/components/ContinueLearning/ContinueLearning";
import LearningOverview from "@/features/dashboard/components/LearningOverview/LearningOverview";
import RecommendedCourses from "@/features/dashboard/components/RecommendedCourses/RecommendedCourses";
import StatsGrid from "@/features/dashboard/components/stats/StatsGrid";
import { Bot, ChevronDown } from "lucide-react";

export default async function DashboardPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Good morning, Kacper! 👋"
        subtitle="Ready to continue your learning journey?"
        action={{
          label: "Chat with AI Mentor",
          icon: Bot,
          rightIcon: ChevronDown,
        }}
      />
      <StatsGrid />
      <div className="grid gap-4 semiXl:grid-cols-5">
        <div className="semiXl:col-span-3">
          <LearningOverview />
        </div>
        <div className="semiXl:col-span-2">
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

import ContinueLearning from "@/features/dashboard/components/ContinueLearning";
import LearningOverview from "@/features/dashboard/components/LearningOverview";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import WelcomeSection from "@/features/dashboard/components/WelcomeSection";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <WelcomeSection />
      <StatsGrid />
      <div className="block semiXl:flex gap-4">
        <LearningOverview />
        <ContinueLearning />
      </div>
    </div>
  );
}

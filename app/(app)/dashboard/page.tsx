import ActivityFeed from "@/features/dashboard/components/ActivityFeed/ActivityFeed";
import ContinueLearning from "@/features/dashboard/components/ContinueLearning/ContinueLearning";
import LearningOverview from "@/features/dashboard/components/LearningOverview/LearningOverview";
import RecommendedCourses from "@/features/dashboard/components/RecommendedCourses/RecommendedCourses";
import WelcomeSection from "@/features/dashboard/components/WelcomeSection";
import StatsGrid from "@/features/dashboard/components/stats/StatsGrid";
import { supabase } from "@/lib/supabase";


export default async function DashboardPage() {
  const { data, error } = await supabase.from("profiles").select("*");
  
  console.log(data);

  return (
    <div className="space-y-4">
      <WelcomeSection />
      <StatsGrid />
      <div className="block semiXl:flex gap-4">
        <LearningOverview />
        <ContinueLearning />
      </div>
      <div className="block semiXl:flex gap-4">
        <RecommendedCourses />
        <ActivityFeed />
      </div>
    </div>
  );
}

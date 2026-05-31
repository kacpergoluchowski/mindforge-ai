import StatsGrid from "@/features/dashboard/components/StatsGrid";
import WelcomeSection from "@/features/dashboard/components/WelcomeSection";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeSection />
      <StatsGrid />
    </div>
  );
}
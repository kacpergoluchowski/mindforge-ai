import ProgressActivitySection from "@/features/progress/components/ProgressActivitySection";
import ProgressGoalSection from "@/features/progress/components/ProgressGoalSection";
import ProgressHero from "@/features/progress/components/ProgressHero";
import ProgressOverviewSection from "@/features/progress/components/ProgressOverviewSection";
import ProgressStats from "@/features/progress/components/ProgressStats";
import ProgressTopicsSection from "@/features/progress/components/ProgressTopicsSection";

export default function ProgressPage() {
    return (
        <div className="space-y-8">
            <ProgressHero />
            <ProgressStats />
            <ProgressOverviewSection />
            <ProgressTopicsSection />
            <ProgressActivitySection />
            <ProgressGoalSection />
        </div>
    )
}
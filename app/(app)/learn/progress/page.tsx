import PageHeader from "@/components/shared/PageHeader";
import ProgressActivitySection from "@/features/progress/components/ProgressActivitySection/ProgressActivitySection";
import ProgressGoalSection from "@/features/progress/components/ProgressGoalSection/ProgressGoalSection";
import ProgressOverviewSection from "@/features/progress/components/ProgressOverviewSection/ProgressOverviewSection";
import ProgressStats from "@/features/progress/components/ProgressStats/ProgressStats";
import ProgressTopicsSection from "@/features/progress/components/ProgressTopicsSection/ProgressTopicsSection";

export default function ProgressPage() {
    return (
        <div className="space-y-8">
      <PageHeader
        title="Progress"
        subtitle="Track your learning journey and achievements."
      />
            <ProgressStats />
            <ProgressOverviewSection />
            <ProgressTopicsSection />
            <ProgressActivitySection />
            <ProgressGoalSection />
        </div>
    )
}

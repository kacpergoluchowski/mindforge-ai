import AccountSummaryCard from "@/features/profile/components/AccountSummaryCard";
import AchievementsCard from "@/features/profile/components/AchievementsCard";
import ProfileOverviewCard from "@/features/profile/components/ProfileOverviewCard";
import ProfileStats from "@/features/profile/components/ProfileStats";
import RecentActivityCard from "@/features/profile/components/RecentActivityCard";
import SkillsAndTechStack from "@/features/profile/components/SkillsAndTechStack";

export default function ProfilePage() {
  return (
    <main className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          <ProfileOverviewCard />
          <ProfileStats />
          <SkillsAndTechStack />
          <RecentActivityCard />
        </div>

        <div className="flex flex-col gap-6">
          <AccountSummaryCard />
          <AchievementsCard />
        </div>
      </div>
    </main>
  );
}
import AccountSummaryCard from "./AccountSummaryCard";
import AchievementsCard from "./AchievementsCard";

export default function ProfileSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <AccountSummaryCard />
      <AchievementsCard />
    </aside>
  );
}

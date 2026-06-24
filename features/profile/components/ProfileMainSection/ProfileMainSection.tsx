import ProfileOverviewCard from "./ProfileOverviewCard";
import ProfileStats from "./ProfileStats";
import RecentActivityCard from "./RecentActivityCard";
import SkillsAndTechStack from "./SkillsAndTechStack";

export default function ProfileMainSection() {
  return (
    <div className="flex flex-col gap-6">
      <ProfileOverviewCard />
      <ProfileStats />
      <SkillsAndTechStack />
      <RecentActivityCard />
    </div>
  );
}

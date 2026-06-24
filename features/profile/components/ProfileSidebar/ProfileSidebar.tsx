import AccountSummaryCard from "./AccountSummaryCard";
import AchievementsCard from "./AchievementsCard";

import type { CurrentProfile } from "../../types/profile.types";

type ProfileSidebarProps = {
  profile: CurrentProfile;
};

export default function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      <AccountSummaryCard profile={profile} />
      <AchievementsCard achievements={profile.achievements} />
    </aside>
  );
}

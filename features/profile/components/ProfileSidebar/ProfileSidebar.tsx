import AccountSummaryCard from "./AccountSummaryCard";
import AchievementsCard from "./AchievementsCard";

import type { CurrentProfile } from "../../types/profile.types";

type ProfileSidebarProps = {
  profile: CurrentProfile;
};

export default function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <aside className="flex min-w-0 flex-col gap-6 xl:sticky xl:top-24 xl:self-start">
      <AccountSummaryCard profile={profile} />
      <AchievementsCard achievements={profile.achievements} />
    </aside>
  );
}

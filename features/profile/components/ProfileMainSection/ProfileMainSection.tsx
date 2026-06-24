import ProfileOverviewCard from "./ProfileOverviewCard";
import ProfileStats from "./ProfileStats";
import RecentActivityCard from "./RecentActivityCard";
import SkillsAndTechStack from "./SkillsAndTechStack";

import type { CurrentProfile } from "../../types/profile.types";

type ProfileMainSectionProps = {
  profile: CurrentProfile;
};

export default function ProfileMainSection({ profile }: ProfileMainSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <ProfileOverviewCard profile={profile} />
      <ProfileStats profile={profile} />
      <SkillsAndTechStack skills={profile.skills} />
      <RecentActivityCard />
    </div>
  );
}

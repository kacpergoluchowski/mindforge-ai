import ProfileStats from "./ProfileStats";
import RecentActivityCard from "./RecentActivityCard";
import SkillsAndTechStack from "./SkillsAndTechStack";

import type { CurrentProfile } from "../../types/profile.types";

type ProfileMainSectionProps = {
  profile: CurrentProfile;
};

export default function ProfileMainSection({ profile }: ProfileMainSectionProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <ProfileStats profile={profile} />
      <SkillsAndTechStack skills={profile.skills} />
      <RecentActivityCard />
    </div>
  );
}

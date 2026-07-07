import ChallengeBanner from "@/features/challenges/components/ChallengeBanner";
import ChallengeCategories from "@/features/challenges/components/ChallengeCategories";
import ChallengesMainSection from "@/features/challenges/components/ChallengesMainSection/ChallengesMainSection";
import ChallengeStats from "@/features/challenges/components/ChallengeStats/ChallengeStats";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";

export const metadata = {
  title: "Challenges",
};

export default async function ChallengesPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="min-w-0 space-y-7 sm:space-y-8">
      <ChallengeBanner />
      <ChallengeStats />
      <ChallengeCategories />
      <ChallengesMainSection profile={profile} />
    </div>
  );
}

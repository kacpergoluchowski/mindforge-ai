import ProfileMainSection from "@/features/profile/components/ProfileMainSection/ProfileMainSection";
import ProfileHero from "@/features/profile/components/ProfileMainSection/ProfileHero";
import ProfileSidebar from "@/features/profile/components/ProfileSidebar/ProfileSidebar";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");

  return (
    <main className="min-w-0 space-y-6 pb-24 xl:pb-8">
      <ProfileHero profile={profile} />

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <ProfileMainSection profile={profile} />
        <ProfileSidebar profile={profile} />
      </div>
    </main>
  );
}

import ProfileMainSection from "@/features/profile/components/ProfileMainSection/ProfileMainSection";
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
    <main className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <ProfileMainSection profile={profile} />
        <ProfileSidebar profile={profile} />
      </div>
    </main>
  );
}

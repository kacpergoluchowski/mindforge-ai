import ProfileMainSection from "@/features/profile/components/ProfileMainSection/ProfileMainSection";
import ProfileSidebar from "@/features/profile/components/ProfileSidebar/ProfileSidebar";

export default function ProfilePage() {
  return (
    <main className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <ProfileMainSection />
        <ProfileSidebar />
      </div>
    </main>
  );
}

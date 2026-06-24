import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNavbar from "@/components/layout/MobileNavbar";
import Sidebar from "@/components/layout/Sidebar";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { redirect } from "next/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export default async function AppShell({ children }: AppShellProps) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");

  return (
    <div className="min-h-screen bg-[#080e18] text-white pb-20 sm:pb-10">
      <Sidebar profile={profile} />

      <div className="min-h-screen lg:ml-72">
        <MobileHeader profile={profile} />
        <Header />

        <main className="p-5 lg:px-8 lg:pb-0">
          {children}
        </main>
      </div>

      <MobileNavbar />
    </div>
  );
}

import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNavbar from "@/components/layout/MobileNavbar";
import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#080e18] text-white pb-20 sm:pb-10">
      <Sidebar />

      <div className="min-h-screen lg:ml-72">
        <MobileHeader />
        <Header />

        <main className="p-5 lg:px-8 lg:pb-0">
          {children}
        </main>
      </div>

      <MobileNavbar />
    </div>
  );
}
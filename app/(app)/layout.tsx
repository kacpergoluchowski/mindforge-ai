import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNavbar from "@/components/layout/MobileNavbar";
import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#080e18] text-white">
      <Sidebar />

      <div className="min-h-screen lg:ml-72">
        <MobileHeader />
        <Header />

        <main className="px-5 pb-28 pt-4 lg:px-8 lg:pb-0 lg:pt-8">
          {children}
        </main>
      </div>

      <MobileNavbar />
    </div>
  );
}
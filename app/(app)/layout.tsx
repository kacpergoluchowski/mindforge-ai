import Header from "@/components/layout/Header"
import MobileNavbar from "@/components/layout/MobileNavbar"
import Sidebar from "@/components/layout/Sidebar"

type AppShellProps = {
    children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen bg-[#080e18]">
            <Sidebar />
            <div>
                <Header />
                <main> {children} </main>
            </div>
            <MobileNavbar />
        </div>
    )
}
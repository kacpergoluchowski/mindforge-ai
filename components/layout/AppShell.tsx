import Header from "./Header"
import MobileNavbar from "./MobileNavbar"
import Sidebar from "./Sidebar"

type AppShellProps = {
    children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <div>
                <Header />
                <main> {children} </main>
            </div>
            <MobileNavbar />
        </div>
    )
}
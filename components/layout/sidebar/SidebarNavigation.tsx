import { navigationSections } from "../data/navigationItems";
import SidebarNavigationSection from "./SidebarNavigationSection";

export default function SidebarNavigation() {
  return (
    <nav className="mt-10 flex-1 space-y-4 overflow-y-auto pr-2">
      {navigationSections.map((section) => (
        <SidebarNavigationSection
          key={section.title ?? "main"}
          section={section}
        />
      ))}
    </nav>
  );
}
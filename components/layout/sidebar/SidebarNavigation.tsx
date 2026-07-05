import { navigationSections } from "../data/layoutData";
import SidebarNavigationSection from "./SidebarNavigationSection";

export default function SidebarNavigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="mt-10 min-h-0 flex-1 space-y-5 overflow-y-auto pr-1"
    >
      {navigationSections.map((section) => (
        <SidebarNavigationSection
          key={section.title ?? "main"}
          section={section}
        />
      ))}
    </nav>
  );
}

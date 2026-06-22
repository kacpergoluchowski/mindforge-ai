import { NavigationSection } from "../types/layoutTypes.types";
import SidebarNavigationItem from "./SidebarNavigationItem";

export default function SidebarNavigationSection({
  section,
}: {
  section: NavigationSection;
}) {
  return (
    <div className="space-y-2">
      {section.title && (
        <h2 className="px-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {section.title}
        </h2>
      )}

      <ul className="space-y-1">
        {section.items.map((item) => (
          <SidebarNavigationItem
            key={item.href}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}
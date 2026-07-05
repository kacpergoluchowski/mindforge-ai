"use client";

import { NavigationSection } from "../types/layoutTypes.types";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getNavigationSectionKey } from "@/lib/i18n/navigation";

export default function SidebarNavigationSection({
  section,
}: {
  section: NavigationSection;
}) {
  const { t } = useI18n();
  const title = section.title
    ? t(getNavigationSectionKey(section.title) ?? "", section.title)
    : undefined;

  return (
    <section className="space-y-2">
      {title && (
        <h2 className="px-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {title}
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
    </section>
  );
}

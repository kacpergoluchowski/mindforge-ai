"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarNavigationItemProps } from "../types/layoutTypes.types";
import LanguageSettingsModal from "@/features/settings/components/LanguageSettingsModal/LanguageSettingsModal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getNavigationLabelKey } from "@/lib/i18n/navigation";

export default function SidebarNavigationItem({
  item,
}: SidebarNavigationItemProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const Icon = item.icon;
  const isSettingsItem = item.href === "/account/settings";
  const label = t(getNavigationLabelKey(item.href) ?? "", item.label);

  const isActive = pathname === item.href;
  const className = cn(
    "flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left text-sm font-medium text-slate-400 transition",
    "hover:bg-white/5 hover:text-white",
    isActive &&
      "bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.18)]",
  );
  const iconClassName = cn(
    "size-5 text-slate-500 transition",
    isActive && "text-violet-400",
  );

  if (isSettingsItem) {
    return (
      <li>
        <LanguageSettingsModal buttonClassName={className}>
          <Icon className={iconClassName} />
          <span>{label}</span>
        </LanguageSettingsModal>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={className}
      >
        <Icon className={iconClassName} />

        <span>{label}</span>
      </Link>
    </li>
  );
}

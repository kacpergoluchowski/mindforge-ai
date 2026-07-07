"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarNavigationItemProps } from "../types/layoutTypes.types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getNavigationLabelKey } from "@/lib/i18n/navigation";

export default function SidebarNavigationItem({
  item,
}: SidebarNavigationItemProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const Icon = item.icon;
  const label = t(getNavigationLabelKey(item.href) ?? "", item.label);

  const isActive = isNavigationItemActive(pathname, item.href);
  const className = cn(
    "flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-medium text-slate-400 transition",
    "hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70",
    isActive &&
      "bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.18)]",
  );
  const iconClassName = cn(
    "size-5 text-slate-500 transition",
    isActive && "text-violet-400",
  );

  return (
    <li>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={className}
      >
        <Icon aria-hidden="true" className={iconClassName} />

        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

function isNavigationItemActive(pathname: string, href: string) {
  if (pathname === href) {
    return true;
  }

  if (href === "/dashboard") {
    return false;
  }

  return pathname.startsWith(`${href}/`);
}

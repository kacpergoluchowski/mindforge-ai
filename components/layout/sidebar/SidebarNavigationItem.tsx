"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import type { NavigationItem } from "../data/navigationItems";

type SidebarNavigationItemProps = {
  item: NavigationItem;
};

export default function SidebarNavigationItem({
  item,
}: SidebarNavigationItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;

  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition",
          "hover:bg-white/5 hover:text-white",
          isActive &&
            "bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.18)]",
        )}
      >
        <Icon
          className={cn(
            "size-5 text-slate-500 transition",
            isActive && "text-violet-400",
          )}
        />

        <span>{item.label}</span>
      </Link>
    </li>
  );
}

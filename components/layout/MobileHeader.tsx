"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import Logo from "./Logo";
import MobileSidebar from "./MobileSidebar";
import NotificationsDropdown from "./NotificationsDropdown";

import type { GlobalSearchItem } from "./types/layoutTypes.types";
import type { NotificationItem } from "@/features/notifications/types/notification.types";
import type { CurrentProfile } from "@/features/profile/types/profile.types";

type MobileHeaderProps = {
  profile: CurrentProfile;
  searchItems: GlobalSearchItem[];
  notifications: NotificationItem[];
};

export default function MobileHeader({
  profile,
  searchItems,
  notifications,
}: MobileHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-5 py-6 lg:hidden">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white"
        >
          <Menu className="size-4" />
        </button>

        <Logo />

        <div className="flex items-center gap-2">
          <GlobalSearch compact items={searchItems} />
          <NotificationsDropdown compact notifications={notifications} />
        </div>
      </header>

      <MobileSidebar
        profile={profile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}

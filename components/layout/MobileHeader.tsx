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
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#080e18]/85 px-5 py-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setIsSidebarOpen(true)}
          className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
        >
          <Menu aria-hidden="true" className="size-4" />
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

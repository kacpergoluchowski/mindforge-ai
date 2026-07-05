import Link from "next/link";
import { Sparkles } from "lucide-react";

import GlobalSearch from "./GlobalSearch";
import NotificationsDropdown from "./NotificationsDropdown";
import type { GlobalSearchItem } from "./types/layoutTypes.types";
import type { NotificationItem } from "@/features/notifications/types/notification.types";

type HeaderProps = {
  searchItems: GlobalSearchItem[];
  notifications: NotificationItem[];
};

export default function Header({ notifications, searchItems }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 hidden h-20 items-center justify-between gap-6 border-b border-white/10 bg-[#080e18]/75 px-8 backdrop-blur-xl lg:flex">
      <GlobalSearch items={searchItems} />

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/ai-mentor/chat"
          aria-label="Open AI Mentor"
          className="flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
        >
          <Sparkles aria-hidden="true" className="size-5" />
        </Link>

        <NotificationsDropdown notifications={notifications} />
      </div>
    </header>
  );
}

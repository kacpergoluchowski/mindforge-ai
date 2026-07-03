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
    <header className="sticky top-0 z-40 hidden h-20 items-center justify-between border-b border-white/10 px-8 backdrop-blur-xl lg:flex">
      <GlobalSearch items={searchItems} />

      <div className="flex items-center gap-5">
        <button className="text-slate-300 transition hover:text-white">
          <Sparkles className="size-5" />
        </button>

        <NotificationsDropdown notifications={notifications} />
      </div>
    </header>
  );
}

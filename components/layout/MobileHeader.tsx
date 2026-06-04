"use client";

import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import Logo from "./Logo";
import MobileSidebar from "./MobileSidebar";

export default function MobileHeader() {
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

        <button className="relative flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
          <Bell className="size-4" />

          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white">
            3
          </span>
        </button>
      </header>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
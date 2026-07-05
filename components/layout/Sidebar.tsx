"use client";

import Logo from "./Logo";

import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarUserCard from "./sidebar/SidebarUserCard";

import type { CurrentProfile } from "@/features/profile/types/profile.types";

type SidebarProps = {
  profile: CurrentProfile;
};

export default function Sidebar({ profile }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-white/10 bg-[#0b1220]/95 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="shrink-0">
        <Logo />
      </div>

      <SidebarNavigation />

      <SidebarUserCard profile={profile} />
    </aside>
  );
}

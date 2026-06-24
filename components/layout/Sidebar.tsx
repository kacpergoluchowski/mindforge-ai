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
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[#121926] bg-[#0b1220] px-5 py-6 lg:flex lg:flex-col">
      <Logo />
      <SidebarNavigation />
      <SidebarUserCard profile={profile} />
    </aside>
  );
}

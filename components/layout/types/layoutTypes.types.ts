import type { CurrentProfile } from "@/features/profile/types/profile.types";
import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavigationSection = {
  title?: string;
  items: NavigationItem[];
};

export type SidebarNavigationSectionProps = {
  section: NavigationSection;
};

export type SidebarNavigationItemProps = {
  item: NavigationItem;
};

export type MobileSidebarProps = {
  profile: CurrentProfile;
  isOpen: boolean;
  onClose: () => void;
};

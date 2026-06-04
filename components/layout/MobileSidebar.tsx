"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  Code2,
  CreditCard,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navSections = [
  {
    title: "Learn",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Learning Paths", href: "/learn/learning-paths", icon: GraduationCap },
      { label: "Courses", href: "/learn/courses", icon: BookOpen },
      { label: "Challenges", href: "/learn/challenges", icon: ShieldCheck },
      { label: "Progress", href: "/learn/progress", icon: Gauge },
    ],
  },
  {
    title: "AI Mentor",
    items: [
      { label: "Chat with AI", href: "/ai-mentor", icon: Bot },
      { label: "Study Assistant", href: "/ai-mentor/study-assistant", icon: Sparkles },
      { label: "Code Review", href: "/ai-mentor/code-review", icon: Code2 },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/account/profile", icon: User },
      { label: "Settings", href: "/account/settings", icon: Settings },
      { label: "Billing", href: "/account/billing", icon: CreditCard },
    ],
  },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="Close mobile sidebar overlay"
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={clsx(
          "fixed left-0 top-0 z-500 h-dvh w-[86%] max-w-[380px] overflow-y-auto border-r border-white/10 bg-[#08111f] shadow-2xl shadow-black/50 transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-violet-500 text-xl font-semibold text-white">
              K
            </div>

            <div>
              <p className="font-semibold text-white">Kacper</p>
              <p className="text-sm text-slate-400">Premium Plan</p>
            </div>
          </div>
        </div>

        <nav className="space-y-8 px-5 py-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 px-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map(({ label, href, icon: Icon }) => {
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className={clsx(
                        "flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition",
                        isActive
                          ? "bg-violet-500/80 text-white shadow-lg shadow-violet-500/20"
                          : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      <Icon className="size-5" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-4 px-5 pb-6">
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <Sparkles className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Upgrade to Premium</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Unlock all features and boost your learning.
                </p>
              </div>
            </div>
          </div>

          <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-medium text-red-400 transition hover:bg-red-500/10">
            <LogOut className="size-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import LogoutButton from "@/features/auth/components/shared/LogoutButton";
import {
  formatPlan,
  getInitials,
} from "@/features/profile/utils/profileFormatters";
import type { MobileSidebarProps } from "./types/layoutTypes.types";
import { mobileSidebarSections } from "./data/layoutData";
import LanguageSettingsModal from "@/features/settings/components/LanguageSettingsModal/LanguageSettingsModal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  getNavigationLabelKey,
  getNavigationSectionKey,
} from "@/lib/i18n/navigation";

export default function MobileSidebar({
  profile,
  isOpen,
  onClose,
}: MobileSidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <>
      <button
        type="button"
        aria-label={t("common.close", "Close")}
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        aria-label="Mobile navigation"
        className={clsx(
          "fixed left-0 top-0 z-500 h-dvh w-[86%] max-w-[380px] overflow-y-auto border-r border-white/10 bg-[#08111f] shadow-2xl shadow-black/50 transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Logo />

          <button
            type="button"
            aria-label={t("common.close", "Close")}
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-violet-500 text-base font-semibold text-white">
              {getInitials(profile.fullName)}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-white">{profile.fullName}</p>
              <p className="truncate text-sm text-slate-400">
                {formatPlan(profile.plan)}
              </p>
            </div>
          </div>
        </div>

        <nav
          aria-label="Mobile sidebar navigation"
          className="space-y-6 px-5 py-5"
        >
          {mobileSidebarSections.map((section) => (
            <section key={section.title ?? "main"}>
              {section.title ? (
                <p className="mb-3 px-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {t(getNavigationSectionKey(section.title) ?? "", section.title)}
                </p>
              ) : null}

              <div className="space-y-1">
                {section.items.map(({ label, href, icon: Icon }) => {
                  const isActive = isNavigationItemActive(pathname, href);
                  const isSettingsItem = href === "/account/settings";
                  const translatedLabel = t(
                    getNavigationLabelKey(href) ?? "",
                    label
                  );
                  const className = clsx(
                    "flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70",
                    isActive
                      ? "bg-violet-500/20 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.24)]"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  );

                  if (isSettingsItem) {
                    return (
                      <LanguageSettingsModal
                        key={href}
                        buttonClassName={className}
                        onOpen={onClose}
                      >
                        <Icon aria-hidden="true" className="size-5 shrink-0" />
                        <span className="truncate">{translatedLabel}</span>
                      </LanguageSettingsModal>
                    );
                  }

                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onClose}
                      className={className}
                    >
                      <Icon aria-hidden="true" className="size-5 shrink-0" />
                      <span className="truncate">{translatedLabel}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <div className="space-y-4 px-5 pb-6">
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <Sparkles aria-hidden="true" className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {t("billing.upgrade", "Upgrade to Premium")}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {t(
                    "billing.upgradeDescription",
                    "Unlock all features and boost your learning."
                  )}
                </p>
              </div>
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>
    </>
  );
}

function isNavigationItemActive(pathname: string, href: string) {
  if (pathname === href) {
    return true;
  }

  if (href === "/dashboard") {
    return false;
  }

  return pathname.startsWith(`${href}/`);
}

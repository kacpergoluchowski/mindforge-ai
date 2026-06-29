"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import {
  Bell,
  Bot,
  Check,
  Languages,
  Moon,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LanguageSettingsModalProps = {
  buttonClassName: string;
  children: React.ReactNode;
  onOpen?: () => void;
};

type LanguageOption = {
  code: "en" | "pl";
  description: string;
  label: string;
};

const languageOptions = [
  {
    code: "en",
    description: "Use English across the application interface.",
    label: "English",
  },
  {
    code: "pl",
    description: "Use Polish across the application interface.",
    label: "Polski",
  },
] satisfies LanguageOption[];

const aiLanguageOptions = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "pl",
    label: "Polski",
  },
] satisfies Pick<LanguageOption, "code" | "label">[];

export default function LanguageSettingsModal({
  buttonClassName,
  children,
  onOpen,
}: LanguageSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  function openModal() {
    onOpen?.();
    setOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className={buttonClassName}>
        {children}
      </button>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-1000 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424] shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                      <Languages className="size-5" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {t("settings.title", "Preferences")}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {t(
                          "settings.interfaceLanguageDescription",
                          "Adjust how MindForge AI should feel for your account."
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-white/20 hover:text-white"
                    aria-label={t("common.close", "Close settings")}
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="max-h-[calc(90vh-156px)] space-y-5 overflow-y-auto p-6">
                  <PreferenceSection
                    icon={Languages}
                    title={t("settings.interfaceLanguage", "Interface language")}
                    description={t(
                      "settings.interfaceLanguageDescription",
                      "Choose the language used across the app interface."
                    )}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {languageOptions.map((language) => (
                        <PreferenceOption
                          key={language.code}
                          description={language.description}
                          label={language.label}
                          active={locale === language.code}
                          statusLabel={
                            locale === language.code
                              ? t("settings.active", "Current")
                              : t("settings.available", "Available")
                          }
                          onClick={() => setLocale(language.code)}
                        />
                      ))}
                    </div>
                  </PreferenceSection>

                  <PreferenceSection
                    icon={Bot}
                    title={t("settings.aiResponseLanguage", "AI response language")}
                    description={t(
                      "settings.aiResponseLanguageDescription",
                      "Choose the preferred language for future AI Mentor answers."
                    )}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {aiLanguageOptions.map((language) => (
                        <PreferenceOption
                          key={language.code}
                          label={language.label}
                          active={locale === language.code}
                          statusLabel={
                            locale === language.code
                              ? t("settings.active", "Current")
                              : t("settings.available", "Available")
                          }
                          onClick={() => setLocale(language.code)}
                        />
                      ))}
                    </div>
                  </PreferenceSection>

                  <PreferenceSection
                    icon={Moon}
                    title="Theme"
                    description="MindForge AI currently uses a focused dark workspace."
                  >
                    <PreferenceOption
                      description="Dark mode keeps dashboards, lessons and coding workflows comfortable."
                      label="Dark"
                      active
                      statusLabel={t("settings.active", "Current")}
                    />
                  </PreferenceSection>

                  <PreferenceSection
                    icon={Bell}
                    title="Email notifications"
                    description="Notification controls will be added later."
                  >
                    <PreferenceOption
                      description="Course reminders, streak updates and AI summaries are coming soon."
                      label="Coming soon"
                      active={false}
                      statusLabel={t("settings.comingSoon", "Available")}
                    />
                  </PreferenceSection>
                </div>

                <div className="flex justify-end border-t border-white/10 p-6">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600"
                  >
                    {t("common.save", "Save changes")}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

type PreferenceSectionProps = {
  children: React.ReactNode;
  description: string;
  icon: typeof Languages;
  title: string;
};

function PreferenceSection({
  children,
  description,
  icon: Icon,
  title,
}: PreferenceSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

type PreferenceOptionProps = {
  active: boolean;
  description?: string;
  label: string;
  onClick?: () => void;
  statusLabel: string;
};

function PreferenceOption({
  active,
  description,
  label,
  onClick,
  statusLabel,
}: PreferenceOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex min-h-24 w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition",
        active
          ? "border-violet-400/40 bg-violet-500/10"
          : "border-white/10 bg-slate-950/30 hover:border-white/20"
      )}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-white">{label}</span>
          <span
            className={clsx(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              active
                ? "bg-violet-500/15 text-violet-300"
                : "bg-white/5 text-slate-400"
            )}
          >
            {statusLabel}
          </span>
        </div>

        {description ? (
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {description}
          </p>
        ) : null}
      </div>

      <span
        className={clsx(
          "flex size-6 shrink-0 items-center justify-center rounded-full border",
          active
            ? "border-violet-400 bg-violet-500 text-white"
            : "border-white/10 text-transparent"
        )}
      >
        <Check className="size-4" />
      </span>
    </button>
  );
}

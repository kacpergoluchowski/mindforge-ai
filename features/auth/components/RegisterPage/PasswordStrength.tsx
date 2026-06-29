"use client";

import clsx from "clsx";
import { useI18n } from "@/lib/i18n/I18nProvider";

type PasswordStrengthProps = {
  password: string;
};

const segmentCount = 7;

function getPasswordScore(password: string) {
  if (!password) return 1;

  return Math.min(
    [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^a-zA-Z0-9]/.test(password),
    ].filter(Boolean).length + 1,
    segmentCount
  );
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useI18n();
  const score = getPasswordScore(password);
  const label =
    score <= 2
      ? t("auth.register.passwordWeak", "Weak")
      : score <= 4
        ? t("auth.register.passwordMedium", "Medium")
        : t("auth.register.passwordStrong", "Strong");
  const activeStyle =
    score <= 2
      ? "bg-rose-500"
      : score <= 4
        ? "bg-amber-400"
        : "bg-emerald-500";

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-slate-500">
        <span>{t("auth.register.passwordStrength", "Password strength")}</span>
        <span>{label}</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: segmentCount }, (_, index) => (
          <span
            key={index}
            className={clsx(
              "h-1.5 rounded-full",
              index < score ? activeStyle : "bg-slate-700"
            )}
          />
        ))}
      </div>
    </div>
  );
}

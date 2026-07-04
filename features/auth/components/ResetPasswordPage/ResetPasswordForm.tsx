"use client";

import { AlertCircle, ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { createClient } from "@/lib/supabase/client";

import PasswordStrength from "../RegisterPage/PasswordStrength";
import LoginField from "../LoginPage/LoginField";

import type { FormEvent } from "react";

export default function ResetPasswordForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password.length < 8) {
      setError(
        t(
          "auth.register.errors.passwordLength",
          "Password must be at least 8 characters long."
        )
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(t("auth.register.errors.passwordMismatch", "Passwords do not match."));
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccessMessage(
        t("auth.resetPassword.success", "Password updated successfully.")
      );

      window.setTimeout(() => {
        router.replace("/dashboard");
        router.refresh();
      }, 900);
    } catch {
      setError(
        t(
          "auth.resetPassword.error",
          "Could not update password. Please request a new reset link."
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-[2rem] border border-violet-400/35 bg-[linear-gradient(180deg,rgba(35,25,68,0.72),rgba(5,12,25,0.9)_24%)] p-6 shadow-[0_0_80px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-8 lg:p-10">
      <Link
        href="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {t("auth.forgotPassword.backToLogin", "Back to login")}
      </Link>

      <h1 className="text-3xl font-bold text-white">
        {t("auth.resetPassword.title", "Create a new password")}
      </h1>
      <p className="mt-3 leading-7 text-slate-400">
        {t(
          "auth.resetPassword.subtitle",
          "Choose a strong password to secure your MindForge AI account."
        )}
      </p>

      <form onSubmit={handlePasswordUpdate} className="mt-8 space-y-5">
        <PasswordInput
          id="password"
          label={t("auth.register.password", "Password")}
          placeholder={t("auth.register.passwordPlaceholder", "Create a password")}
          autoComplete="new-password"
          onValueChange={setPasswordValue}
        />

        <PasswordInput
          id="confirmPassword"
          label={t("auth.register.confirmPassword", "Confirm password")}
          placeholder={t(
            "auth.register.confirmPasswordPlaceholder",
            "Confirm your password"
          )}
          autoComplete="new-password"
        />

        <PasswordStrength password={passwordValue} />

        {error ? (
          <p
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-6 text-red-200"
          >
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-red-300"
            />
            {error}
          </p>
        ) : null}

        {successMessage ? (
          <p
            aria-live="polite"
            className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200"
          >
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-emerald-300"
            />
            {successMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-500 py-4 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 aria-hidden="true" className="size-5 animate-spin" />
              {t("auth.resetPassword.submitting", "Updating password...")}
            </>
          ) : (
            t("auth.resetPassword.submit", "Update password")
          )}
        </button>
      </form>
    </div>
  );
}

type PasswordInputProps = {
  autoComplete: string;
  id: string;
  label: string;
  onValueChange?: (value: string) => void;
  placeholder: string;
};

function PasswordInput({
  autoComplete,
  id,
  label,
  onValueChange,
  placeholder,
}: PasswordInputProps) {
  return (
    <div onInput={(event) => onValueChange?.((event.target as HTMLInputElement).value)}>
      <LoginField
        id={id}
        label={label}
        type="password"
        placeholder={placeholder}
        icon={Lock}
        autoComplete={autoComplete}
      />
    </div>
  );
}

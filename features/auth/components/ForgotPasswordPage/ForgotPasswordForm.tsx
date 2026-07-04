"use client";

import { AlertCircle, ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { createClient } from "@/lib/supabase/client";

import LoginField from "../LoginPage/LoginField";

import type { FormEvent } from "react";

export default function ForgotPasswordForm() {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccessMessage(
        t(
          "auth.forgotPassword.success",
          "If this email exists, we sent you a password reset link."
        )
      );
    } catch {
      setError(
        t(
          "auth.forgotPassword.error",
          "Could not send reset email. Please try again."
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
        {t("auth.forgotPassword.title", "Reset your password")}
      </h1>
      <p className="mt-3 leading-7 text-slate-400">
        {t(
          "auth.forgotPassword.subtitle",
          "Enter your email and we will send you a secure link to create a new password."
        )}
      </p>

      <form onSubmit={handleResetRequest} className="mt-8 space-y-5">
        <LoginField
          id="email"
          label={t("auth.login.email", "Email address")}
          type="email"
          placeholder={t(
            "auth.login.emailPlaceholder",
            "Enter your email address"
          )}
          icon={Mail}
          autoComplete="email"
        />

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
              {t("auth.forgotPassword.submitting", "Sending link...")}
            </>
          ) : (
            t("auth.forgotPassword.submit", "Send reset link")
          )}
        </button>
      </form>
    </div>
  );
}

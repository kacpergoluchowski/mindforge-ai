"use client";

import {
  AlertCircle,
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/I18nProvider";

import type { FormEvent } from "react";

import SocialAuthButtons from "../shared/SocialAuthButtons";
import LoginField from "./LoginField";
import LoginIntro from "./LoginIntro";

type LoginFormProps = {
  initialError?: string;
};

export default function LoginForm({ initialError = "" }: LoginFormProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError(t("auth.login.error", "Unable to log in. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-violet-400/35 bg-[linear-gradient(180deg,rgba(35,25,68,0.72),rgba(5,12,25,0.9)_24%)] p-6 shadow-[0_0_80px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-8 lg:p-12">
      <div className="lg:hidden">
        <LoginIntro compact />
      </div>

      <div className="hidden lg:block">
        <h2 className="text-3xl font-bold text-white">
          {t("auth.login.title", "Log in to your account")}
        </h2>
        <p className="mt-2 text-lg text-slate-400">
          {t("auth.login.subtitle", "Welcome back! Please enter your details.")}
        </p>
      </div>

      <SocialAuthButtons onError={setError} />

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700/70" />
        <span className="text-sm text-slate-500">{t("common.or", "or")}</span>
        <div className="h-px flex-1 bg-slate-700/70" />
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
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

        <LoginField
          id="password"
          label={t("auth.login.password", "Password")}
          type="password"
          placeholder={t("auth.login.passwordPlaceholder", "Enter your password")}
          icon={Lock}
          autoComplete="current-password"
        />

        <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-3 text-slate-400">
            <input
              name="remember"
              type="checkbox"
              className="size-4 rounded border-slate-700 bg-slate-950 accent-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            {t("auth.login.rememberMe", "Remember me")}
          </label>

          <Link
            href="/forgot-password"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            {t("auth.login.forgotPassword", "Forgot password?")}
          </Link>
        </div>

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

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-500 py-4 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 aria-hidden="true" className="size-5 animate-spin" />
              {t("auth.login.submitting", "Logging in...")}
            </>
          ) : (
            <>
              {t("auth.login.submit", "Log In")}
              <ArrowRight aria-hidden="true" className="size-5" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-400">
          {t("auth.login.noAccount", "Don't have an account?")}{" "}
          <Link
            href="/register"
            className="font-medium text-violet-400 transition hover:text-violet-300"
          >
            {t("auth.login.signUp", "Sign up")}
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 pt-4 text-center text-sm text-slate-500">
          <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
          <span>
            {t("auth.dataPrefix", "Your data is")}{" "}
            <span className="text-violet-400">
              {t("auth.dataSecure", "secure and encrypted")}
            </span>
          </span>
        </div>
      </form>
    </div>
  );
}

"use client";

import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/I18nProvider";

import type { FormEvent } from "react";

import SocialAuthButtons from "../shared/SocialAuthButtons";
import LoginField from "./LoginField";
import LoginIntro from "./LoginIntro";

export default function LoginForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="rounded-lg border border-violet-400/45 bg-[linear-gradient(180deg,rgba(35,25,68,0.72),rgba(5,12,25,0.88)_24%)] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:p-12">
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

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700/70" />
        <span className="text-sm text-slate-500">{t("common.or", "or")}</span>
        <div className="h-px flex-1 bg-slate-700/70" />
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
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

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-3 text-slate-400">
            <input name="remember" type="checkbox" className="size-4 accent-violet-500" />
            {t("auth.login.rememberMe", "Remember me")}
          </label>

          <Link
            href="/forgot-password"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            {t("auth.login.forgotPassword", "Forgot password?")}
          </Link>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white transition hover:from-violet-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading
            ? t("auth.login.submitting", "Logging in...")
            : t("auth.login.submit", "Log In")}
          {!isLoading && <ArrowRight className="size-5" />}
        </button>

        <p className="text-center text-sm text-slate-400">
          {t("auth.login.noAccount", "Don't have an account?")}{" "}
          <Link href="/register" className="font-medium text-violet-400">
            {t("auth.login.signUp", "Sign up")}
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 pt-4 text-center text-sm text-slate-500">
          <ShieldCheck className="size-4 shrink-0" />
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

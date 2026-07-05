"use client";

import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/I18nProvider";

import type { FormEvent } from "react";

import PasswordStrength from "./PasswordStrength";
import RegisterField from "./RegisterField";
import RegisterIntro from "./RegisterIntro";
import SocialAuthButtons from "../shared/SocialAuthButtons";

type RegisterFormValues = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

const usernamePattern = /^[a-zA-Z0-9_]{3,24}$/;

function getFormValues(formData: FormData): RegisterFormValues {
  return {
    fullName: String(formData.get("fullName") ?? "").trim(),
    username: String(formData.get("username") ?? "").trim().toLowerCase(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    termsAccepted: formData.get("terms") === "on",
  };
}

function validateForm(
  values: RegisterFormValues,
  t: (key: string, fallback: string) => string
) {
  if (
    !values.fullName ||
    !values.username ||
    !values.email ||
    !values.password ||
    !values.confirmPassword
  ) {
    return t("auth.register.errors.required", "Please fill in all fields.");
  }

  if (values.password !== values.confirmPassword) {
    return t("auth.register.errors.passwordMismatch", "Passwords do not match.");
  }

  if (!usernamePattern.test(values.username)) {
    return t(
      "auth.register.errors.username",
      "Username must be 3-24 characters and can only contain letters, numbers and underscores."
    );
  }

  if (values.password.length < 8) {
    return t(
      "auth.register.errors.passwordLength",
      "Password must be at least 8 characters long."
    );
  }

  if (!values.termsAccepted) {
    return t(
      "auth.register.errors.terms",
      "Please accept the Terms of Service and Privacy Policy."
    );
  }

  return null;
}

export default function RegisterForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const values = getFormValues(new FormData(form));
    const validationError = validateForm(values, t);

    setError("");
    setSuccessMessage("");

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: {
            full_name: values.fullName,
            username: values.username,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      form.reset();
      setPasswordValue("");
      setSuccessMessage(
        t(
          "auth.register.success",
          "Account created successfully. Check your email if confirmation is required."
        )
      );
    } catch {
      setError(
        t(
          "auth.register.error",
          "Unable to create your account. Please try again."
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-violet-400/35 bg-[linear-gradient(180deg,rgba(35,25,68,0.72),rgba(5,12,25,0.9)_24%)] p-5 shadow-[0_0_80px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="lg:hidden">
        <RegisterIntro compact />
      </div>

      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold text-white">
          {t("auth.register.formTitle", "Create your account")}
        </h2>
        <p className="mt-1.5 text-sm text-slate-400">
          {t(
            "auth.register.formSubtitle",
            "Fill in the details below to get started"
          )}
        </p>
      </div>

      <SocialAuthButtons disabled={isLoading} onError={setError} />

      <div className="my-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700/70" />
        <span className="text-sm text-slate-500">{t("common.or", "or")}</span>
        <div className="h-px flex-1 bg-slate-700/70" />
      </div>

      <form onSubmit={handleRegister} className="space-y-3.5">
        <div className="grid gap-3.5 md:grid-cols-2">
          <RegisterField
            id="fullName"
            name="fullName"
            label={t("auth.register.fullName", "Full name")}
            type="text"
            placeholder={t(
              "auth.register.fullNamePlaceholder",
              "Enter your full name"
            )}
            icon={User}
            autoComplete="name"
          />
          <RegisterField
            id="username"
            name="username"
            label={t("auth.register.username", "Username")}
            type="text"
            placeholder={t(
              "auth.register.usernamePlaceholder",
              "Choose a username"
            )}
            icon={AtSign}
            autoComplete="username"
            maxLength={24}
            minLength={3}
            pattern="[a-zA-Z0-9_]+"
          />
        </div>

        <RegisterField
          id="email"
          name="email"
          label={t("auth.register.email", "Email address")}
          type="email"
          placeholder={t(
            "auth.register.emailPlaceholder",
            "Enter your email address"
          )}
          icon={Mail}
          autoComplete="email"
        />

        <div className="grid gap-3.5 min-[440px]:grid-cols-2">
          <RegisterField
            id="password"
            name="password"
            label={t("auth.register.password", "Password")}
            type="password"
            placeholder={t("auth.register.passwordPlaceholder", "Create a password")}
            icon={Lock}
            autoComplete="new-password"
            minLength={8}
            onValueChange={setPasswordValue}
          />
          <RegisterField
            id="confirmPassword"
            name="confirmPassword"
            label={t("auth.register.confirmPassword", "Confirm password")}
            type="password"
            placeholder={t(
              "auth.register.confirmPasswordPlaceholder",
              "Confirm your password"
            )}
            icon={Lock}
            autoComplete="new-password"
            minLength={8}
          />
        </div>

        <PasswordStrength password={passwordValue} />

        <label className="flex items-start gap-3 text-sm leading-5 text-slate-400">
          <input
            name="terms"
            type="checkbox"
            required
            className="mt-1 size-4 shrink-0 rounded border-slate-700 bg-slate-950 accent-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
          <span>
            {t("auth.register.termsPrefix", "I agree to the")}{" "}
            <Link
              href="/terms"
              className="text-violet-400 transition hover:text-violet-300"
            >
              {t("auth.register.termsOfService", "Terms of Service")}
            </Link>{" "}
            {t("auth.register.termsAnd", "and")}{" "}
            <Link
              href="/privacy"
              className="text-violet-400 transition hover:text-violet-300"
            >
              {t("auth.register.privacyPolicy", "Privacy Policy")}
            </Link>
          </span>
        </label>

        {error ? (
          <p
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm leading-5 text-red-200"
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
            className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm leading-5 text-emerald-200"
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-emerald-300"
            />
            {successMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-500 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 aria-hidden="true" className="size-5 animate-spin" />
              {t("auth.register.submitting", "Creating account...")}
            </>
          ) : (
            t("auth.register.submit", "Create Account")
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
          {t(
            "auth.register.dataNotice",
            "We'll never share your information with anyone."
          )}
        </div>

        <p className="text-center text-sm text-slate-400 sm:hidden">
          {t("auth.register.hasAccount", "Already have an account?")}{" "}
          <Link
            href="/login"
            className="font-medium text-violet-400 transition hover:text-violet-300"
          >
            {t("auth.register.login", "Log In")}
          </Link>
        </p>
      </form>
    </div>
  );
}

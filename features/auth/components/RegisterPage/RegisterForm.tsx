"use client";

import { supabase } from "@/lib/supabase";
import { AtSign, Lock, Mail, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

function getFormValues(formData: FormData): RegisterFormValues {
  return {
    fullName: String(formData.get("fullName") ?? "").trim(),
    username: String(formData.get("username") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    termsAccepted: formData.get("terms") === "on",
  };
}

function validateForm(values: RegisterFormValues) {
  if (
    !values.fullName ||
    !values.username ||
    !values.email ||
    !values.password ||
    !values.confirmPassword
  ) {
    return "Please fill in all fields.";
  }

  if (values.password !== values.confirmPassword) {
    return "Passwords do not match.";
  }

  if (values.password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!values.termsAccepted) {
    return "Please accept the Terms of Service and Privacy Policy.";
  }

  return null;
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const values = getFormValues(new FormData(form));
    const validationError = validateForm(values);

    setError("");
    setSuccessMessage("");

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
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

      form.reset();
      setPasswordValue("");
      setSuccessMessage(
        "Account created successfully. Check your email if confirmation is required."
      );
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-violet-400/45 bg-[linear-gradient(180deg,rgba(35,25,68,0.72),rgba(5,12,25,0.88)_24%)] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="lg:hidden">
        <RegisterIntro compact />
      </div>

      <div className="hidden lg:block">
        <h2 className="text-3xl font-bold text-white">Create your account</h2>
        <p className="mt-2 text-slate-400">
          Fill in the details below to get started
        </p>
      </div>

      <SocialAuthButtons />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700/70" />
        <span className="text-sm text-slate-500">or</span>
        <div className="h-px flex-1 bg-slate-700/70" />
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <RegisterField
            id="fullName"
            name="fullName"
            label="Full name"
            type="text"
            placeholder="Enter your full name"
            icon={User}
            autoComplete="name"
          />
          <RegisterField
            id="username"
            name="username"
            label="Username"
            type="text"
            placeholder="Choose a username"
            icon={AtSign}
            autoComplete="username"
          />
        </div>

        <RegisterField
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          icon={Mail}
          autoComplete="email"
        />

        <div className="grid gap-4 min-[440px]:grid-cols-2">
          <RegisterField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
            autoComplete="new-password"
            minLength={8}
            onValueChange={setPasswordValue}
          />
          <RegisterField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
            icon={Lock}
            autoComplete="new-password"
            minLength={8}
          />
        </div>

        <PasswordStrength password={passwordValue} />

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
          <input
            name="terms"
            type="checkbox"
            required
            className="mt-1 size-4 shrink-0 accent-violet-500"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-violet-400 hover:text-violet-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-violet-400 hover:text-violet-300"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        {successMessage && (
          <p aria-live="polite" className="text-sm text-emerald-400">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white transition hover:from-violet-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>

        <div className="flex items-center justify-center gap-2 text-center text-sm text-slate-500">
          <ShieldCheck className="size-4 shrink-0" />
          We&apos;ll never share your information with anyone.
        </div>

        <p className="pt-2 text-center text-sm text-slate-400 sm:hidden">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-violet-400">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

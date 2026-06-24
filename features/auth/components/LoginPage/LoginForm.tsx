import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

import SocialAuthButtons from "../shared/SocialAuthButtons";
import LoginField from "./LoginField";
import LoginIntro from "./LoginIntro";

export default function LoginForm() {
  return (
    <div className="rounded-lg border border-violet-400/45 bg-[linear-gradient(180deg,rgba(35,25,68,0.72),rgba(5,12,25,0.88)_24%)] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:p-12">
      <div className="lg:hidden">
        <LoginIntro compact />
      </div>

      <div className="hidden lg:block">
        <h2 className="text-3xl font-bold text-white">
          Log in to your account
        </h2>
        <p className="mt-2 text-lg text-slate-400">
          Welcome back! Please enter your details.
        </p>
      </div>

      <SocialAuthButtons />

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700/70" />
        <span className="text-sm text-slate-500">or</span>
        <div className="h-px flex-1 bg-slate-700/70" />
      </div>

      <div className="space-y-6">
        <LoginField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          icon={Mail}
          autoComplete="email"
        />

        <LoginField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-3 text-slate-400">
            <input type="checkbox" className="size-4 accent-violet-500" />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white transition hover:from-violet-500 hover:to-purple-500"
        >
          Log In
          <ArrowRight className="size-5" />
        </button>

        <p className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-violet-400">
            Sign up
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 pt-4 text-center text-sm text-slate-500">
          <ShieldCheck className="size-4 shrink-0" />
          <span>
            Your data is{" "}
            <span className="text-violet-400">secure and encrypted</span>
          </span>
        </div>
      </div>
    </div>
  );
}

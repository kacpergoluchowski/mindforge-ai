"use client";

import { supabase } from "@/lib/supabase";
import { AtSign, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      if (!fullName || !username || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      setIsLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccessMessage("Account created successfully. Check your email if confirmation is required.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-xl lg:p-10">
      <h2 className="text-3xl font-bold text-white">Create your account</h2>

      <p className="mt-2 text-slate-400">
        Fill in the details below to get started
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-white transition hover:border-violet-500/30"
        >
          Continue with GitHub
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-white transition hover:border-violet-500/30"
        >
          Continue with Google
        </button>
      </div>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-slate-500">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white">Full name</label>

            <div className="relative">
              <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">Username</label>

            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">Email address</label>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white">Password</label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-4 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
              />

              <EyeOff className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">
              Confirm password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-4 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
              />

              <EyeOff className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-400">
          <input type="checkbox" />
          I agree to the Terms of Service and Privacy Policy
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {successMessage && (
          <p className="text-sm text-emerald-400">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-violet-600 py-4 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
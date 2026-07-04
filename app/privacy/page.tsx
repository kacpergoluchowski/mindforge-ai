import Link from "next/link";

export const metadata = {
  title: "MindForge | Privacy Policy",
  description: "MindForge AI privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-12 text-slate-300">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/register"
          className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
        >
          Back to registration
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-5 leading-8 text-slate-400">
          This page explains how MindForge AI handles user data. The final legal
          version should be reviewed before public launch.
        </p>

        <section className="mt-10 space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <p>
            MindForge AI stores account data needed for authentication,
            profiles, learning progress and product functionality.
          </p>
          <p>
            Authentication is handled through Supabase. OAuth providers may
            share basic profile information such as email and name.
          </p>
          <p>
            Learning activity, XP, course progress and AI interactions may be
            used to personalize the experience inside the platform.
          </p>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";

export const metadata = {
  title: "MindForge | Terms of Service",
  description: "MindForge AI terms of service.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-12 text-slate-300">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/register"
          className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
        >
          Back to registration
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-white">Terms of Service</h1>
        <p className="mt-5 leading-8 text-slate-400">
          These terms describe the basic rules for using MindForge AI. The final
          legal version should be reviewed before public launch.
        </p>

        <section className="mt-10 space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <p>
            By creating an account, you agree to use MindForge AI responsibly,
            keep your account secure and follow applicable laws.
          </p>
          <p>
            MindForge AI may provide educational content, AI assistance and code
            feedback. AI-generated output should be reviewed before being used
            in production.
          </p>
          <p>
            Paid features, billing rules and cancellation terms will be defined
            before paid plans are launched.
          </p>
        </section>
      </div>
    </main>
  );
}

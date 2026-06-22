import RegisterFeatures from "./RegisterFeatures";
import RegisterForm from "./RegisterForm";

export default function RegisterSection() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          ✨ AI-Powered Learning Platform
        </div>

        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl">
          Create your account and{" "}
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-500 bg-clip-text text-transparent">
            unlock your potential.
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
          Join thousands of developers who are already accelerating their
          careers with AI.
        </p>

        <RegisterFeatures />

        <div className="mt-20 flex items-center gap-3 text-sm text-slate-400">
          <span className="text-violet-300">▢</span>
          Your data is{" "}
          <span className="text-violet-300">secure and encrypted</span>
        </div>
      </div>

      <RegisterForm />
    </section>
  );
}
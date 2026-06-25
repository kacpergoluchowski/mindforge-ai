import { ShieldCheck, Sparkles } from "lucide-react";

import RegisterFeatures from "./RegisterFeatures";

export default function RegisterIntro() {
  return (
    <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
        <Sparkles className="size-4" />
        AI-Powered Learning Platform
      </div>

      <h1 className="max-w-xl text-4xl font-bold leading-tight text-white lg:text-5xl">
        Create your account and{" "}
        <span className="text-violet-400">unlock your potential.</span>
      </h1>

      <p className="mt-4 max-w-lg text-base leading-7 text-slate-400 lg:text-lg lg:leading-8">
        Join thousands of developers who are already accelerating their careers
        with AI.
      </p>

      <RegisterFeatures />
      <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
        <ShieldCheck className="size-4 text-violet-300" />
        <span>
          Your data is
          <span className="text-violet-300"> secure and encrypted</span>
        </span>
      </div>
    </div>
  );
}

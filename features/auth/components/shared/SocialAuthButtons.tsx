"use client";

import { useState } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { createClient } from "@/lib/supabase/client";

import type { Provider } from "@supabase/supabase-js";

type SocialAuthButtonsProps = {
  onError?: (message: string) => void;
};

const providers: Array<{
  name: string;
  provider: Provider;
  mark: string;
  markClassName: string;
}> = [
  {
    name: "GitHub",
    provider: "github",
    mark: "GH",
    markClassName: "text-white",
  },
  {
    name: "Google",
    provider: "google",
    mark: "G",
    markClassName: "text-blue-400",
  },
];

export default function SocialAuthButtons({
  onError,
}: SocialAuthButtonsProps) {
  const { t } = useI18n();
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleOAuth = async (provider: Provider) => {
    setLoadingProvider(provider);
    onError?.("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      onError?.(error.message);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mt-6 grid gap-3 md:grid-cols-2">
      {providers.map(({ name, provider, mark, markClassName }) => (
        <button
          key={provider}
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleOAuth(provider)}
          className="flex items-center justify-center gap-3 rounded-lg border border-slate-700/70 bg-slate-950/30 px-5 py-3.5 text-white transition hover:border-violet-400/50 hover:bg-violet-500/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className={`text-sm font-bold ${markClassName}`}>{mark}</span>
          {loadingProvider === provider
            ? t("auth.connecting", "Connecting...")
            : t("auth.continueWith", "Continue with {provider}").replace(
                "{provider}",
                name
              )}
        </button>
      ))}
    </div>
  );
}

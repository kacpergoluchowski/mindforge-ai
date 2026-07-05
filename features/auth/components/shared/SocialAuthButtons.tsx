"use client";

import { useState } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { createClient } from "@/lib/supabase/client";

import type { Provider } from "@supabase/supabase-js";

type SocialAuthButtonsProps = {
  disabled?: boolean;
  onError?: (message: string) => void;
};

const providers: Array<{
  name: string;
  provider: Provider;
  scopes: string;
  mark: string;
  markClassName: string;
}> = [
  {
    name: "GitHub",
    provider: "github",
    scopes: "read:user user:email",
    mark: "GH",
    markClassName: "text-white",
  }
];

function getOAuthRedirectUrl() {
  return `${window.location.origin}/auth/callback?next=/dashboard`;
}

export default function SocialAuthButtons({
  disabled = false,
  onError,
}: SocialAuthButtonsProps) {
  const { t } = useI18n();
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleOAuth = async (provider: Provider, scopes: string) => {
    setLoadingProvider(provider);
    onError?.("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getOAuthRedirectUrl(),
          scopes,
          skipBrowserRedirect: true,
          queryParams:
            provider === "google"
              ? {
                  access_type: "offline",
                  prompt: "select_account",
                }
              : undefined,
        },
      });

      if (error) {
        onError?.(error.message);
        setLoadingProvider(null);
        return;
      }

      if (!data.url) {
        onError?.(
          t(
            "auth.oauth.missingUrl",
            "Could not start OAuth login. Please try again."
          )
        );
        setLoadingProvider(null);
        return;
      }

      window.location.assign(data.url);
    } catch {
      onError?.(
        t("auth.oauth.error", "Could not start OAuth login. Please try again.")
      );
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-2">
      {providers.map(({ name, provider, scopes, mark, markClassName }) => (
        <button
          key={provider}
          type="button"
          disabled={disabled || loadingProvider !== null}
          aria-busy={loadingProvider === provider}
          onClick={() => handleOAuth(provider, scopes)}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-950/35 px-5 py-3 text-white transition hover:border-violet-400/50 hover:bg-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60"
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

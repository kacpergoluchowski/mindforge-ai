import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

const DEFAULT_REDIRECT_PATH = "/dashboard";

function getSafeRedirectPath(path: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return DEFAULT_REDIRECT_PATH;
  }

  return path;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const providerError = requestUrl.searchParams.get("error");
  const providerErrorDescription = requestUrl.searchParams.get(
    "error_description"
  );
  const next = getSafeRedirectPath(requestUrl.searchParams.get("next"));

  if (providerError) {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("error", "oauth_access_denied");

    if (providerErrorDescription) {
      loginUrl.searchParams.set("message", providerErrorDescription);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("error", "oauth_exchange_failed");
    loginUrl.searchParams.set("message", error.message);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(
    new URL("/login?error=oauth_callback_failed", requestUrl.origin)
  );
}

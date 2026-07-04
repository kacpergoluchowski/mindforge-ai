import LoginPage from "@/features/auth/components/LoginPage/LoginPage";

export const metadata = {
  title: "MindForge | Login",
  description:
    "Log in to MindForge AI and continue your programming learning journey.",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

const oauthErrorFallbacks: Record<string, string> = {
  oauth_access_denied: "OAuth login was cancelled or denied.",
  oauth_exchange_failed: "Could not finish OAuth login. Please try again.",
  oauth_callback_failed: "OAuth login failed. Please try again.",
};

export default async function Page({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const initialError = params.error
    ? params.message ?? oauthErrorFallbacks[params.error] ?? params.error
    : "";

  return <LoginPage initialError={initialError} />;
}

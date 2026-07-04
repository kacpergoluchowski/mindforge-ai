import LoginHeader from "./LoginHeader";
import LoginSection from "./LoginSection";

type LoginPageProps = {
  initialError?: string;
};

export default function LoginPage({ initialError = "" }: LoginPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.22),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.10),transparent_30%)]" />
      <div
        className="absolute inset-0 hidden bg-cover bg-top opacity-80 lg:block"
        style={{ backgroundImage: 'url("/images/register-background.png")' }}
      />
      <div className="absolute inset-0 hidden bg-[#020617]/35 lg:block" />

      <div className="relative z-10">
        <LoginHeader />
        <LoginSection initialError={initialError} />
      </div>
    </main>
  );
}

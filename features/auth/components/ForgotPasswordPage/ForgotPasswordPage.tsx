import LoginHeader from "../LoginPage/LoginHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.22),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.10),transparent_30%)]" />

      <div className="relative z-10">
        <LoginHeader />
        <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[720px] items-center px-5 pb-10">
          <ForgotPasswordForm />
        </section>
      </div>
    </main>
  );
}

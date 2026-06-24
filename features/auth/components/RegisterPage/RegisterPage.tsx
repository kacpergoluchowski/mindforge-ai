import RegisterHeader from "./RegisterHeader";
import RegisterSection from "./RegisterSection";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617]">
      <div
        className="absolute inset-0 hidden bg-cover bg-top lg:block"
        style={{ backgroundImage: 'url("/images/register-background.png")' }}
      />
      <div className="absolute inset-0 hidden bg-[#020617]/15 lg:block" />

      <div className="relative z-10">
        <RegisterHeader />
        <RegisterSection />
      </div>
    </main>
  );
}

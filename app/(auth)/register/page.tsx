import RegisterHeader from "@/features/auth/components/RegisterHeader";
import RegisterSection from "@/features/auth/components/RegisterSection";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712]">
      <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[180px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[160px]" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="relative z-10">
        <RegisterHeader />
        <RegisterSection />
      </div>
    </main>
  );
}
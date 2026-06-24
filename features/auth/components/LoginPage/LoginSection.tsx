import LoginForm from "./LoginForm";
import LoginIntro from "./LoginIntro";

export default function LoginSection() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-6 px-5 pb-10 lg:min-h-[calc(100vh-96px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(600px,1.22fr)] lg:items-start lg:gap-10 lg:px-8">
      <div className="hidden pt-10 lg:block">
        <LoginIntro />
      </div>

      <LoginForm />
    </section>
  );
}

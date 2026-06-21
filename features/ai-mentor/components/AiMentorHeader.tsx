export default function AiMentorHeader() {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white lg:text-3xl xl:text-4xl">
          AI Mentor
        </h1>

        <p className="mt-1 text-sm text-slate-400 lg:text-lg xl:text-xl">
          Your personal AI programming mentor
        </p>
      </div>
    </section>
  );
}
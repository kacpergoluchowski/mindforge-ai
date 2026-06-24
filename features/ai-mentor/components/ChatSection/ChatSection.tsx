import ChatComposer from "./ChatComposer";

export default function ChatSection() {
  return (
    <section className="mt-6">
      <div className="rounded-3xl border border-white/10 bg-slate-900/40">
        <div className="min-h-[580px] p-6">
          <div className="mb-8 flex justify-end">
            <div className="max-w-xl rounded-2xl bg-violet-600 px-5 py-4 text-white">
              Can you explain the difference between var, let and const in
              JavaScript?
            </div>
          </div>
        </div>
        <ChatComposer />
      </div>
    </section>
  );
}

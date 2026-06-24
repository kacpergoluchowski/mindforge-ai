const providers = [
  { name: "GitHub", mark: "GH", markClassName: "text-white" },
  { name: "Google", mark: "G", markClassName: "text-blue-400" },
];

export default function SocialAuthButtons() {
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-2">
      {providers.map(({ name, mark, markClassName }) => (
        <button
          key={name}
          type="button"
          className="flex items-center justify-center gap-3 rounded-lg border border-slate-700/70 bg-slate-950/30 px-5 py-3.5 text-white transition hover:border-violet-400/50 hover:bg-violet-500/5"
        >
          <span className={`text-sm font-bold ${markClassName}`}>{mark}</span>
          Continue with {name}
        </button>
      ))}
    </div>
  );
}

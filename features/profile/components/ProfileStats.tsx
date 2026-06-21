import { profileStats } from "../data/profileData";

export default function ProfileStats() {
  return (
    <section className="grid gap-6 xl:grid-cols-4">
      {profileStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="rounded-3xl border border-white/10 bg-slate-900/40 p-5"
          >
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/5">
              <Icon className="size-6 text-white" />
            </div>

            <h3 className="text-4xl font-bold text-white">{stat.title}</h3>

            <p className="mt-2 text-sm text-slate-400">{stat.subtitle}</p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`${stat.progress} ${stat.color} h-full rounded-full`}
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}

import { heroHighlights } from "../../data/landingPageData";

export default function HeroHighlights() {
  return (
    <div className="mx-auto mt-10 grid max-w-7xl gap-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-4 lg:mt-16">
      {heroHighlights.map(({ title, description, icon: Icon }) => (
        <div key={title} className="border-white/10 p-6 md:border-r md:last:border-r-0">
          <Icon className="size-8 text-violet-400" />
          <h3 className="mt-5 font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
      ))}
    </div>
  );
}

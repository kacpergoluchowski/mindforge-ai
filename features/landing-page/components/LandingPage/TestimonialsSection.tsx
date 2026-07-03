import { testimonials } from "../../data/landingPageData";
import LandingSectionHeader from "./LandingSectionHeader";

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <LandingSectionHeader
          align="center"
          eyebrow="Loved by developers"
          title="See what our learners say"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3 lg:mt-12">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-[#0d1424] p-7"
            >
              <p className="text-4xl font-bold text-violet-400">&ldquo;</p>
              <p className="mt-4 min-h-28 text-sm leading-7 text-slate-300">
                {testimonial.quote}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
                  {testimonial.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

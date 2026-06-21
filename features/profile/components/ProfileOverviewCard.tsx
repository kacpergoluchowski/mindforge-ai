import {
  Calendar,
  MapPin,
  Pencil,
  User,
} from "lucide-react";

export default function ProfileOverviewCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Profile Overview
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex size-32 shrink-0 items-center justify-center rounded-full border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/20 to-blue-500/20">
          <User className="size-14 text-violet-300" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <h3 className="text-3xl font-bold text-white">
              Kacper Gołuchowski
            </h3>

            <span className="w-fit rounded-xl bg-violet-500/15 px-3 py-1 text-sm font-medium text-violet-300">
              Pro Member
            </span>
          </div>

          <p className="mt-2 text-lg text-slate-400">
            Full Stack AI Developer
          </p>

          <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              Kielce, Poland
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              Joined June 2026
            </div>
          </div>

          <p className="mt-6 max-w-2xl leading-7 text-slate-300">
            Passionate about software engineering, AI applications and
            building real-world products with React, Next.js and TypeScript.
          </p>

          <button
            type="button"
            className="
              mt-6 flex items-center gap-2
              rounded-xl border border-white/10
              px-4 py-2
              text-sm font-medium text-white
              transition
              hover:bg-white/5
            "
          >
            <Pencil className="size-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
}
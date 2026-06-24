import { Rocket, TrendingUp, Trophy, Users } from "lucide-react";

const features = [
  {
    title: "Personalized Roadmaps",
    description: "AI-tailored paths for your goals.",
    icon: Rocket,
  },
  {
    title: "Track Progress",
    description: "Monitor your skills and XP.",
    icon: TrendingUp,
  },
  {
    title: "Earn Achievements",
    description: "Unlock badges and prove your skills.",
    icon: Trophy,
  },
  {
    title: "Join Community",
    description: "Connect with developers worldwide.",
    icon: Users,
  },
];

export default function LoginFeatures() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {features.map(({ title, description, icon: Icon }) => (
        <div key={title} className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
            <Icon className="size-6 text-fuchsia-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

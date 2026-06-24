import {
  Rocket,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Roadmaps",
    description:
      "Personalized learning paths tailored to your goals.",
    icon: Rocket,
  },
  {
    title: "Track & Improve",
    description:
      "Monitor your progress and celebrate every milestone.",
    icon: TrendingUp,
  },
  {
    title: "Earn Achievements",
    description:
      "Unlock badges and prove your skills to the world.",
    icon: Trophy,
  },
  {
    title: "Join Community",
    description:
      "Connect with developers and learn together worldwide.",
    icon: Users,
  },
];

export default function RegisterFeatures() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.title} className="flex items-center gap-4">
            <div
              className="
                flex size-14 shrink-0 items-center justify-center
                rounded-lg
                border border-white/10
                bg-white/[0.03]
              "
            >
              <Icon className="size-6 text-fuchsia-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">{feature.title}</h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import TranslatedText from "@/components/shared/TranslatedText";
import { recentActivities } from "../../data/profileData";

export default function RecentActivityCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Recent Activity"
            translationKey="profile.recentActivity"
          />
        </h2>

        <button
          type="button"
          className="shrink-0 text-sm font-medium text-violet-300 transition hover:text-violet-200"
        >
          <TranslatedText fallback="View all" translationKey="common.viewAll" />
        </button>
      </div>

      <div className="space-y-3">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="
                flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
                rounded-2xl
                border border-white/10
                bg-[#0b1220]/60
                p-4
                transition
                hover:border-violet-400/20 hover:bg-white/5
              "
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10">
                  <Icon className="size-5 text-violet-400" />
                </div>

                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-medium text-white">
                    {getActivityTitle(activity.title)}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {getActivitySubtitle(activity.subtitle)}
                  </p>
                </div>
              </div>

              <span className="self-start text-sm text-slate-500 sm:shrink-0 sm:self-auto">
                {getActivityTime(activity.time)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getActivityTitle(title: string) {
  const completedLesson = title.match(/^Completed lesson "(.+)"$/)?.[1];

  if (completedLesson) {
    return (
      <TranslatedText
        fallback={title}
        translationKey="profile.activity.completedLesson"
        values={{ title: completedLesson }}
      />
    );
  }

  const completedCourse = title.match(/^Completed course "(.+)"$/)?.[1];

  if (completedCourse) {
    return (
      <TranslatedText
        fallback={title}
        translationKey="profile.activity.completedCourse"
        values={{ title: completedCourse }}
      />
    );
  }

  if (title === "Asked AI Mentor about TypeScript generics") {
    return (
      <TranslatedText
        fallback={title}
        translationKey="profile.activity.askedAiMentor"
      />
    );
  }

  if (title === "Earned 50 XP") {
    return (
      <TranslatedText
        fallback={title}
        translationKey="profile.activity.earnedXp"
        values={{ xp: 50 }}
      />
    );
  }

  return title;
}

function getActivitySubtitle(subtitle: string) {
  const keys: Record<string, string> = {
    "AI Mentor": "navigation.aiMentor",
    "Daily Learning": "profile.activity.dailyLearning",
    "JavaScript Path": "profile.activity.javascriptPath",
    "React Course": "profile.activity.reactCourse",
  };

  if (!keys[subtitle]) {
    return subtitle;
  }

  return <TranslatedText fallback={subtitle} translationKey={keys[subtitle]} />;
}

function getActivityTime(time: string) {
  if (time === "Yesterday") {
    return <TranslatedText fallback={time} translationKey="progress.time.yesterday" />;
  }

  const hours = time.match(/^(\d+)h ago$/)?.[1];

  if (hours) {
    return (
      <TranslatedText
        fallback={time}
        translationKey="progress.time.hoursAgo"
        values={{ count: hours }}
      />
    );
  }

  const days = time.match(/^(\d+) days ago$/)?.[1];

  if (days) {
    return (
      <TranslatedText
        fallback={time}
        translationKey="progress.time.daysAgo"
        values={{ count: days }}
      />
    );
  }

  return time;
}

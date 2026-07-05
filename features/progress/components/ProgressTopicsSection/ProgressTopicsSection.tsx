import CourseProgress from "./CourseProgress";
import LearningCalendar from "./LearningCalendar";
import TopicProgress from "./TopicProgress";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressTopicsSectionProps = {
  summary: ProgressSummary | null;
};

export default function ProgressTopicsSection({
  summary,
}: ProgressTopicsSectionProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="min-w-0 space-y-5">
        <TopicProgress topics={summary?.topicProgress ?? []} />
        <CourseProgress courses={summary?.courseProgress ?? []} />
      </div>
      <div className="min-w-0">
        <LearningCalendar days={summary?.learningCalendar ?? []} />
      </div>
    </section>
  );
}

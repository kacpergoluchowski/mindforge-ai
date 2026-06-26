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
    <section className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
      <div className="space-y-5">
        <TopicProgress topics={summary?.topicProgress ?? []} />
        <CourseProgress courses={summary?.courseProgress ?? []} />
      </div>
      <LearningCalendar days={summary?.learningCalendar ?? []} />
    </section>
  );
}

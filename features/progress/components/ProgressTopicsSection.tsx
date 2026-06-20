import LearningCalendar from "./LearningCalendar";
import TopicProgress from "./TopicProgress";

export default function ProgressTopicsSection() {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
      <TopicProgress />
      <LearningCalendar />
    </section>
  );
}
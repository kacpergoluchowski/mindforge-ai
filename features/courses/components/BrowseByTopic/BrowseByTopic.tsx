import SectionHeader from "@/components/shared/SectionHeader";
import { courseTopics } from "../../data/coursesData";
import TopicCard from "./TopicCard";

export default function BrowseByTopic() {
  return (
    <section className="space-y-5 pb-8">
      <SectionHeader title="Browse by topic" buttonText="View All" />

      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {courseTopics.map((topic) => (
          <TopicCard key={topic.id} {...topic} />
        ))}
      </div>
    </section>
  );
}

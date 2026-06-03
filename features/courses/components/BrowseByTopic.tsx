import { courseTopics } from "../data/coursesData";
import TopicCard from "./TopicCard";

export default function BrowseByTopic() {
  return (
    <section className="space-y-5 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Browse By Topic</h2>

        <button className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.05]">
          View all
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {courseTopics.map((topic) => (
          <TopicCard key={topic.id} {...topic} />
        ))}
      </div>
    </section>
  );
}

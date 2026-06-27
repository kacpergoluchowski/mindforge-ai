import CurrentContextCard from "./CurrentContextCard";
import MentorProfileCard from "./MentorProfileCard";
import RecentConversationsCard from "./RecentConversationsCard";

export default function MentorSidebar() {
  return (
    <aside className="hidden h-full min-h-0 min-w-0 flex-col gap-2 overflow-hidden border-t border-white/10 p-3 xl:flex xl:border-l xl:border-t-0">
      <MentorProfileCard />
      <CurrentContextCard />
      <RecentConversationsCard />
    </aside>
  );
}

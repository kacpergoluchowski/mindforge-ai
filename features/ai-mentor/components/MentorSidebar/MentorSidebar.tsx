import MentorProfileCard from "./MentorProfileCard";
import RecentConversationsCard from "./RecentConversationsCard";

export default function MentorSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <MentorProfileCard />
      <RecentConversationsCard />
    </aside>
  );
}

import AiMentorHeader from "@/features/ai-mentor/components/AiMentorHeader";
import ChatSection from "@/features/ai-mentor/components/ChatSection";
import MentorProfileCard from "@/features/ai-mentor/components/MentorProfileCard";
import RecentConversationsCard from "@/features/ai-mentor/components/RecentConversationsCard";

export default function AiMentorPage() {
  return (
    <main>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div>
          <AiMentorHeader />
          <ChatSection />
        </div>

        <div className="flex flex-col gap-6">
          <MentorProfileCard />
          <RecentConversationsCard />
        </div>
      </div>
    </main>
  );
}

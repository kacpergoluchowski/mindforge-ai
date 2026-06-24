import PageHeader from "@/components/shared/PageHeader";
import ChatSection from "@/features/ai-mentor/components/ChatSection/ChatSection";
import MentorSidebar from "@/features/ai-mentor/components/MentorSidebar/MentorSidebar";

export default function AiMentorPage() {
  return (
    <main>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div>
          <PageHeader
            title="AI Mentor"
            subtitle="Your personal AI mentor for guidance and support."
          />
          <ChatSection />
        </div>

        <MentorSidebar />
      </div>
    </main>
  );
}

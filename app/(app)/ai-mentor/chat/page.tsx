import { getAiMentorData } from "@/features/ai-mentor/api/getAiMentorData";
import AiMentorChat from "@/features/ai-mentor/components/AiMentorChat/AiMentorChat";

export const metadata = {
  title: "AI Mentor",
};

type AiMentorPageProps = {
  searchParams: Promise<{
    chat?: string;
    type?: string;
  }>;
};

export default async function AiMentorPage({
  searchParams,
}: AiMentorPageProps) {
  const { chat, type } = await searchParams;
  const data = await getAiMentorData(chat, type);

  return <AiMentorChat data={data} />;
}

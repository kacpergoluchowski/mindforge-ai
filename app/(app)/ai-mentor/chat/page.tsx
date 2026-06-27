import { getAiMentorData } from "@/features/ai-mentor/api/getAiMentorData";
import AiMentorChat from "@/features/ai-mentor/components/AiMentorChat/AiMentorChat";

type AiMentorPageProps = {
  searchParams: Promise<{
    chat?: string;
  }>;
};

export default async function AiMentorPage({
  searchParams,
}: AiMentorPageProps) {
  const { chat } = await searchParams;
  const data = await getAiMentorData(chat);

  return <AiMentorChat data={data} />;
}

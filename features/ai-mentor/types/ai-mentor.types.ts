export type RecentConversation = {
  id: number;
  title: string;
  time: string;
};

export type AiChatType = "general" | "lesson" | "challenge" | "roadmap";

export type AiChat = {
  id: string;
  title: string;
  type: AiChatType;
  sourceId: string | null;
  sourceTitle: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AiChatMessage = {
  id: string;
  chatId: string;
  role: "assistant" | "user";
  content: string;
  createdAt: string;
};

export type AiMentorData = {
  chats: AiChat[];
  messages: AiChatMessage[];
  selectedChat: AiChat | null;
};

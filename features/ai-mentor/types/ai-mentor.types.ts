export type RecentConversation = {
  id: number;
  title: string;
  time: string;
};

export type AiChat = {
  id: string;
  title: string;
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

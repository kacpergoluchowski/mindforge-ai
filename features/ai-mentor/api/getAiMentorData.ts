import { cache } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import type {
  AiChat,
  AiChatMessage,
  AiMentorData,
} from "../types/ai-mentor.types";

type AiChatRow = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

type AiChatMessageRow = {
  id: string;
  chat_id: string;
  role: "assistant" | "user";
  content: string;
  created_at: string;
};

export const getAiMentorData = cache(
  async (selectedChatId?: string): Promise<AiMentorData> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: chatsData } = await supabase
      .from("ai_chats")
      .select("id, title, created_at, updated_at")
      .eq("profile_id", user.id)
      .order("updated_at", { ascending: false });

    const chats = ((chatsData ?? []) as AiChatRow[]).map(mapAiChat);
    const selectedChat =
      chats.find((chat) => chat.id === selectedChatId) ?? chats[0] ?? null;

    if (!selectedChat) {
      return {
        chats: [],
        messages: [],
        selectedChat: null,
      };
    }

    const { data: messagesData } = await supabase
      .from("ai_chat_messages")
      .select("id, chat_id, role, content, created_at")
      .eq("profile_id", user.id)
      .eq("chat_id", selectedChat.id)
      .order("created_at", { ascending: true });

    return {
      chats,
      messages: ((messagesData ?? []) as AiChatMessageRow[]).map(
        mapAiChatMessage
      ),
      selectedChat,
    };
  }
);

function mapAiChat(chat: AiChatRow): AiChat {
  return {
    id: chat.id,
    title: chat.title,
    createdAt: chat.created_at,
    updatedAt: chat.updated_at,
  };
}

function mapAiChatMessage(message: AiChatMessageRow): AiChatMessage {
  return {
    id: message.id,
    chatId: message.chat_id,
    role: message.role,
    content: message.content,
    createdAt: message.created_at,
  };
}

import { cache } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import type {
  AiChat,
  AiChatType,
  AiChatMessage,
  AiMentorData,
} from "../types/ai-mentor.types";

type AiChatRow = {
  id: string;
  title: string;
  type?: string | null;
  source_id?: string | null;
  source_title?: string | null;
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
  async (
    selectedChatId?: string,
    selectedChatType?: string
  ): Promise<AiMentorData> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const chatsResult = await supabase
      .from("ai_chats")
      .select("id, title, type, source_id, source_title, created_at, updated_at")
      .eq("profile_id", user.id)
      .order("updated_at", { ascending: false });
    const fallbackChatsResult = chatsResult.error
      ? await supabase
          .from("ai_chats")
          .select("id, title, created_at, updated_at")
          .eq("profile_id", user.id)
          .order("updated_at", { ascending: false })
      : null;

    const chatRows = (chatsResult.data ??
      fallbackChatsResult?.data ??
      []) as AiChatRow[];
    const urlChatType = getChatTypeFromUrl(selectedChatType);
    await persistUrlChatType({
      chatRows,
      profileId: user.id,
      selectedChatId,
      supabase,
      urlChatType,
    });
    const chats = chatRows.map((chat) =>
      mapAiChat(chat, chat.id === selectedChatId ? urlChatType : null)
    );
    const selectedChat = selectedChatId
      ? chats.find((chat) => chat.id === selectedChatId) ?? null
      : null;

    if (!selectedChat) {
      return {
        chats,
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

type PersistUrlChatTypeInput = {
  chatRows: AiChatRow[];
  profileId: string;
  selectedChatId?: string;
  supabase: Awaited<ReturnType<typeof createClient>>;
  urlChatType: AiChatType | null;
};

async function persistUrlChatType({
  chatRows,
  profileId,
  selectedChatId,
  supabase,
  urlChatType,
}: PersistUrlChatTypeInput): Promise<void> {
  if (!selectedChatId || !urlChatType) {
    return;
  }

  const selectedRow = chatRows.find((chat) => chat.id === selectedChatId);

  if (!selectedRow || selectedRow.type === urlChatType) {
    return;
  }

  const { error } = await supabase
    .from("ai_chats")
    .update({
      type: urlChatType,
    })
    .eq("id", selectedChatId)
    .eq("profile_id", profileId);

  if (error) {
    return;
  }

  selectedRow.type = urlChatType;
}

function mapAiChat(
  chat: AiChatRow,
  urlChatType: AiChatType | null = null
): AiChat {
  return {
    id: chat.id,
    title: chat.title,
    type: urlChatType ?? getChatType(chat.type),
    sourceId: chat.source_id ?? null,
    sourceTitle: chat.source_title ?? null,
    createdAt: chat.created_at,
    updatedAt: chat.updated_at,
  };
}

function getChatType(type?: string | null): AiChatType {
  if (
    type === "lesson" ||
    type === "challenge" ||
    type === "roadmap" ||
    type === "general"
  ) {
    return type;
  }

  return "general";
}

function getChatTypeFromUrl(type?: string): AiChatType | null {
  if (type === "lesson" || type === "challenge" || type === "roadmap") {
    return type;
  }

  return null;
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

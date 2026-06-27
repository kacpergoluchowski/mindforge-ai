"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateAiMentorResponse } from "@/features/ai-mentor/api/generateAiMentorResponse";
import { createClient } from "@/lib/supabase/server";

import type { AiChatMessage } from "../types/ai-mentor.types";

type AiChatMessageRow = {
  id: string;
  chat_id: string;
  role: "assistant" | "user";
  content: string;
  created_at: string;
};

type ProfileRow = {
  full_name: string | null;
  username: string | null;
};

const MAX_USER_MESSAGE_LENGTH = 3000;

export async function createAiChat(formData?: FormData) {
  void formData;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: chat, error } = await supabase
    .from("ai_chats")
    .insert({
      profile_id: user.id,
      title: "Welcome to AI Mentor",
    })
    .select("id")
    .single();

  if (error || !chat) {
    throw new Error("Could not create AI chat.");
  }

  await supabase.from("ai_chat_messages").insert({
    chat_id: chat.id,
    profile_id: user.id,
    role: "assistant",
    content:
      "Welcome to AI Mentor. Ask me about your lesson, practice task, code problem or career path.",
  });

  revalidatePath("/ai-mentor/chat");
  redirect(`/ai-mentor/chat?chat=${chat.id}`);
}

export async function sendAiMentorMessage(formData: FormData) {
  const chatId = String(formData.get("chatId") ?? "");
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, MAX_USER_MESSAGE_LENGTH);

  if (!message) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const activeChatId = chatId || (await createChatForMessage(user.id));

  const { data: chat } = await supabase
    .from("ai_chats")
    .select("id")
    .eq("id", activeChatId)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!chat) {
    throw new Error("AI chat not found.");
  }

  const [{ data: historyData }, { data: profileData }] = await Promise.all([
    supabase
      .from("ai_chat_messages")
      .select("id, chat_id, role, content, created_at")
      .eq("profile_id", user.id)
      .eq("chat_id", activeChatId)
      .order("created_at", { ascending: true }),
    supabase
      .from("profiles")
      .select("full_name, username")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  const history = ((historyData ?? []) as AiChatMessageRow[]).map(
    mapAiChatMessage
  );
  const profile = profileData as ProfileRow | null;
  const assistantResponse = await getAiResponse({
    message,
    history,
    userName: profile?.full_name ?? profile?.username,
  });

  await supabase.from("ai_chat_messages").insert([
    {
      chat_id: activeChatId,
      profile_id: user.id,
      role: "user",
      content: message,
    },
    {
      chat_id: activeChatId,
      profile_id: user.id,
      role: "assistant",
      content: assistantResponse,
    },
  ]);

  await supabase
    .from("ai_chats")
    .update({
      title: getChatTitle(message),
      updated_at: new Date().toISOString(),
    })
    .eq("id", activeChatId)
    .eq("profile_id", user.id);

  revalidatePath("/ai-mentor/chat");

  if (!chatId) {
    redirect(`/ai-mentor/chat?chat=${activeChatId}`);
  }
}

async function createChatForMessage(profileId: string): Promise<string> {
  const supabase = await createClient();
  const { data: chat, error } = await supabase
    .from("ai_chats")
    .insert({
      profile_id: profileId,
      title: "Welcome to AI Mentor",
    })
    .select("id")
    .single();

  if (error || !chat) {
    throw new Error("Could not create AI chat.");
  }

  return chat.id as string;
}

function getChatTitle(message: string): string {
  return message.length > 42 ? `${message.slice(0, 42)}...` : message;
}

async function getAiResponse({
  message,
  history,
  userName,
}: {
  message: string;
  history: AiChatMessage[];
  userName?: string | null;
}): Promise<string> {
  try {
    return await generateAiMentorResponse({
      message,
      history,
      userName,
    });
  } catch (error) {
    console.error("AI mentor response failed:", error);

    return "I could not connect to the AI Mentor API right now. Please try again in a moment.";
  }
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

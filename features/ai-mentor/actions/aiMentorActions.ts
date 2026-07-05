"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateAiMentorResponse } from "@/features/ai-mentor/api/generateAiMentorResponse";
import { getAiMentorLearningContext } from "@/features/ai-mentor/api/getAiMentorLearningContext";
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

type CreateChatInput = {
  profileId: string;
  title: string;
  type?: "general" | "lesson" | "challenge" | "roadmap";
  sourceId?: string | null;
  sourceTitle?: string | null;
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

  const chatId = await createChatRecord({
    profileId: user.id,
    title: "New chat",
    type: "general",
  });

  revalidatePath("/ai-mentor/chat");
  redirect(`/ai-mentor/chat?chat=${chatId}`);
}

export async function createAiLessonChat(formData: FormData) {
  const courseId = String(formData.get("courseId") ?? "");
  const lessonId = String(formData.get("lessonId") ?? "");

  if (!courseId || !lessonId) {
    throw new Error("Missing lesson data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: course }, { data: lesson }, { data: profileData }] =
    await Promise.all([
      supabase
        .from("courses")
        .select("id, slug, title, level, category")
        .eq("id", courseId)
        .eq("is_published", true)
        .maybeSingle(),
      supabase
        .from("course_lessons")
        .select("id, slug, title, summary, objective, content")
        .eq("id", lessonId)
        .eq("course_id", courseId)
        .maybeSingle(),
      supabase
        .from("profiles")
        .select("full_name, username")
        .eq("id", user.id)
        .maybeSingle(),
    ]);

  if (!course || !lesson) {
    throw new Error("Lesson not found.");
  }

  const profile = profileData as ProfileRow | null;
  const lessonContext = getLessonContext({
    course: {
      category: course.category,
      level: course.level,
      title: course.title,
    },
    lesson: {
      content: lesson.content,
      objective: lesson.objective,
      summary: lesson.summary,
      title: lesson.title,
    },
  });
  const message = `I'm working on "${lesson.title}" from ${course.title}. Can you explain it in simple terms, show me what to focus on, and give me one small exercise to practice?`;
  const assistantResponse = await getAiResponse({
    message,
    history: [],
    userName: profile?.full_name ?? profile?.username,
    learningContext: lessonContext,
  });

  const chatId = await createChatRecord({
    profileId: user.id,
    title: `Lesson: ${lesson.title}`.slice(0, 60),
    type: "lesson",
    sourceId: lesson.id,
    sourceTitle: lesson.title,
  });

  await supabase.from("ai_chat_messages").insert([
    {
      chat_id: chatId,
      profile_id: user.id,
      role: "user",
      content: message,
    },
    {
      chat_id: chatId,
      profile_id: user.id,
      role: "assistant",
      content: assistantResponse,
    },
  ]);

  revalidatePath("/ai-mentor/chat");
  redirect(`/ai-mentor/chat?chat=${chatId}&type=lesson`);
}

export async function createAiChallengeChat(formData: FormData) {
  const challengeId = String(formData.get("challengeId") ?? "");

  if (!challengeId) {
    throw new Error("Missing challenge data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: challenge }, { data: userChallenge }, { data: profileData }] =
    await Promise.all([
      supabase
        .from("challenges")
        .select(
          "id, slug, title, description, category, difficulty, requirements, checklist, starter_code, solution_notes"
        )
        .eq("id", challengeId)
        .eq("is_published", true)
        .maybeSingle(),
      supabase
        .from("user_challenges")
        .select("solution_text, status, progress_percent")
        .eq("profile_id", user.id)
        .eq("challenge_id", challengeId)
        .maybeSingle(),
      supabase
        .from("profiles")
        .select("full_name, username")
        .eq("id", user.id)
        .maybeSingle(),
    ]);

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  const profile = profileData as ProfileRow | null;
  const message = `I'm working on the "${challenge.title}" challenge. Can you explain the task, point out what I should focus on, and suggest a clear approach?`;
  const assistantResponse = await getAiResponse({
    message,
    history: [],
    userName: profile?.full_name ?? profile?.username,
    learningContext: getChallengeContext({
      challenge: {
        category: challenge.category,
        checklist: challenge.checklist ?? [],
        description: challenge.description,
        difficulty: challenge.difficulty,
        requirements: challenge.requirements ?? [],
        solutionNotes: challenge.solution_notes,
        starterCode: challenge.starter_code,
        title: challenge.title,
      },
      progress: {
        progressPercent: userChallenge?.progress_percent ?? 0,
        solutionText: userChallenge?.solution_text ?? null,
        status: userChallenge?.status ?? "not_started",
      },
    }),
  });

  const chatId = await createChatRecord({
    profileId: user.id,
    title: `Challenge: ${challenge.title}`.slice(0, 60),
    type: "challenge",
    sourceId: challenge.id,
    sourceTitle: challenge.title,
  });

  await supabase.from("ai_chat_messages").insert([
    {
      chat_id: chatId,
      profile_id: user.id,
      role: "user",
      content: message,
    },
    {
      chat_id: chatId,
      profile_id: user.id,
      role: "assistant",
      content: assistantResponse,
    },
  ]);

  revalidatePath("/ai-mentor/chat");
  redirect(`/ai-mentor/chat?chat=${chatId}&type=challenge`);
}

export async function updateAiChatTitle(formData: FormData) {
  const chatId = String(formData.get("chatId") ?? "");
  const title = String(formData.get("title") ?? "").trim();

  if (!chatId || !title) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase
    .from("ai_chats")
    .update({
      title: title.slice(0, 60),
      updated_at: new Date().toISOString(),
    })
    .eq("id", chatId)
    .eq("profile_id", user.id);

  revalidatePath("/ai-mentor/chat");
}

export async function deleteAiChat(formData: FormData) {
  const chatId = String(formData.get("chatId") ?? "");
  const activeChatId = String(formData.get("activeChatId") ?? "");

  if (!chatId) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase
    .from("ai_chats")
    .delete()
    .eq("id", chatId)
    .eq("profile_id", user.id);

  revalidatePath("/ai-mentor/chat");

  if (chatId === activeChatId) {
    redirect("/ai-mentor/chat");
  }
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
    .select("id, title")
    .eq("id", activeChatId)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!chat) {
    throw new Error("AI chat not found.");
  }

  const [
    { data: historyData },
    { data: profileData },
    learningContext,
  ] = await Promise.all([
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
    getAiMentorLearningContext(user.id),
  ]);

  const history = ((historyData ?? []) as AiChatMessageRow[]).map(
    mapAiChatMessage
  );
  const profile = profileData as ProfileRow | null;

  const { error: userMessageError } = await supabase
    .from("ai_chat_messages")
    .insert({
      chat_id: activeChatId,
      profile_id: user.id,
      role: "user",
      content: message,
    });

  if (userMessageError) {
    throw new Error("Could not save your message.");
  }

  const assistantResponse = await getAiResponse({
    message,
    history,
    userName: profile?.full_name ?? profile?.username,
    learningContext,
  });

  const { error: assistantMessageError } = await supabase
    .from("ai_chat_messages")
    .insert({
      chat_id: activeChatId,
      profile_id: user.id,
      role: "assistant",
      content: assistantResponse,
    });

  if (assistantMessageError) {
    throw new Error("Could not save AI response.");
  }

  const nextTitle = shouldUseMessageAsTitle(chat.title)
    ? getChatTitle(message)
    : chat.title;

  await supabase
    .from("ai_chats")
    .update({
      title: nextTitle,
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
  return createChatRecord({
    profileId,
    title: "New chat",
    type: "general",
  });
}

async function createChatRecord({
  profileId,
  title,
  type = "general",
  sourceId = null,
  sourceTitle = null,
}: CreateChatInput): Promise<string> {
  const supabase = await createClient();
  const insertData = {
    profile_id: profileId,
    title,
    type,
    source_id: sourceId,
    source_title: sourceTitle,
  };
  const { data: chat, error } = await supabase
    .from("ai_chats")
    .insert(insertData)
    .select("id")
    .single();

  if (!error && chat) {
    return chat.id as string;
  }

  const fallbackResult = await supabase
    .from("ai_chats")
    .insert({
      profile_id: profileId,
      title,
    })
    .select("id")
    .single();

  if (fallbackResult.error || !fallbackResult.data) {
    throw new Error("Could not create AI chat.");
  }

  return fallbackResult.data.id as string;
}

function getChatTitle(message: string): string {
  const normalizedMessage = message
    .replace(/\s+/g, " ")
    .replace(/[?.!,;:]+$/g, "")
    .trim();
  const firstSentence = normalizedMessage.split(/[?.!]/)[0]?.trim();
  const title = firstSentence || normalizedMessage || "New chat";

  return title.length > 52 ? `${title.slice(0, 52).trim()}...` : title;
}

function shouldUseMessageAsTitle(title: string): boolean {
  return title === "New chat" || title === "Welcome to AI Mentor";
}

function getLessonContext({
  course,
  lesson,
}: {
  course: {
    category: string;
    level: string;
    title: string;
  };
  lesson: {
    content: string;
    objective: string | null;
    summary: string;
    title: string;
  };
}): string {
  return [
    "Current lesson context from MindForge:",
    `Course: ${course.title}`,
    `Category: ${course.category}`,
    `Level: ${course.level}`,
    `Lesson: ${lesson.title}`,
    `Summary: ${lesson.summary}`,
    `Objective: ${lesson.objective ?? "not specified"}`,
    `Lesson excerpt: ${lesson.content.slice(0, 1600)}`,
  ].join("\n");
}

function getChallengeContext({
  challenge,
  progress,
}: {
  challenge: {
    category: string;
    checklist: string[];
    description: string;
    difficulty: string;
    requirements: string[];
    solutionNotes: string | null;
    starterCode: string | null;
    title: string;
  };
  progress: {
    progressPercent: number;
    solutionText: string | null;
    status: string;
  };
}): string {
  return [
    "Current challenge context from MindForge:",
    `Challenge: ${challenge.title}`,
    `Category: ${challenge.category}`,
    `Difficulty: ${challenge.difficulty}`,
    `Description: ${challenge.description}`,
    `User status: ${progress.status}`,
    `User progress: ${progress.progressPercent}%`,
    `Requirements: ${challenge.requirements.join(" | ") || "not specified"}`,
    `Checklist: ${challenge.checklist.join(" | ") || "not specified"}`,
    `Review guide: ${challenge.solutionNotes ?? "not specified"}`,
    `Starter code: ${challenge.starterCode ?? "not provided"}`,
    progress.solutionText
      ? `User current solution excerpt: ${progress.solutionText.slice(0, 1800)}`
      : "User current solution: not submitted yet",
  ].join("\n");
}

async function getAiResponse({
  message,
  history,
  userName,
  learningContext,
}: {
  message: string;
  history: AiChatMessage[];
  userName?: string | null;
  learningContext?: string;
}): Promise<string> {
  try {
    return await generateAiMentorResponse({
      message,
      history,
      userName,
      learningContext,
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

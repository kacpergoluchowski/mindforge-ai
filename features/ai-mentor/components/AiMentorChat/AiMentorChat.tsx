"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  Bot,
  Check,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  Paperclip,
  Pencil,
  Plus,
  Search,
  SendHorizonal,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import {
  createAiChat,
  deleteAiChat,
  sendAiMentorMessage,
  updateAiChatTitle,
} from "../../actions/aiMentorActions";
import type {
  AiChat,
  AiChatType,
  AiChatMessage,
  AiMentorData,
} from "../../types/ai-mentor.types";

type AiMentorChatProps = {
  data: AiMentorData;
};

export default function AiMentorChat({ data }: AiMentorChatProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticAiChatMessage[]
  >([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const visibleMessages = optimisticMessages.length
    ? [...data.messages, ...optimisticMessages]
    : data.messages;
  const chatType = data.selectedChat?.type ?? "general";
  const contextChatActive = chatType !== "general";

  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [visibleMessages.length]);

  return (
    <main className="fixed inset-0 z-50 flex h-dvh overflow-hidden bg-[#080e18] text-white">
      <ChatSidebar
        activeChatId={data.selectedChat?.id ?? null}
        chats={data.chats}
        className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0b1220] p-4 lg:flex"
      />

      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close chats sidebar"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          <ChatSidebar
            activeChatId={data.selectedChat?.id ?? null}
            chats={data.chats}
            className="absolute inset-y-0 left-0 flex w-[min(320px,86vw)] border-r border-white/10 bg-[#0b1220] p-4 shadow-2xl shadow-slate-950/60"
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      ) : null}

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-white/20 hover:text-white lg:hidden"
              aria-label="Back to app"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-white/20 hover:text-white lg:hidden"
              aria-label="Open chats sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <PanelLeft className="size-4" />
            </button>

            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Bot className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h1 className="truncate font-semibold">
                  {data.selectedChat?.title ?? "AI Mentor"}
                </h1>
                {contextChatActive ? <ChatTypeBadge type={chatType} /> : null}
              </div>
              <p className="hidden text-xs text-slate-500 sm:block">
                {contextChatActive
                  ? `Answering with ${chatType} context`
                  : "Your personal learning companion"}
              </p>
            </div>
          </div>

          <button
            type="button"
            title="More options"
            aria-label="More options"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </header>

        <div
          ref={messagesContainerRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6"
        >
          {visibleMessages.length ? (
            <MessageList messages={visibleMessages} />
          ) : (
            <WelcomeState />
          )}
        </div>

        <ChatComposer
          chatId={data.selectedChat?.id ?? ""}
          onRequestComplete={() => setOptimisticMessages([])}
          onOptimisticMessage={(message) => {
            const createdAt = new Date().toISOString();

            setOptimisticMessages([
              {
                id: `temp-user-${createdAt}`,
                chatId: data.selectedChat?.id ?? "",
                role: "user",
                content: message,
                createdAt,
              },
              {
                id: `temp-assistant-${createdAt}`,
                chatId: data.selectedChat?.id ?? "",
                role: "assistant",
                content: "",
                createdAt,
                pending: true,
              },
            ]);
          }}
        />
      </section>
    </main>
  );
}

type OptimisticAiChatMessage = AiChatMessage & {
  pending?: boolean;
};

type ChatTypeBadgeProps = {
  type: AiChatType;
};

function ChatTypeBadge({ type }: ChatTypeBadgeProps) {
  return (
    <span className="hidden shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300 sm:inline-flex">
      {getChatTypeLabel(type)}
    </span>
  );
}

type ChatSidebarProps = {
  activeChatId: string | null;
  chats: AiChat[];
  className: string;
  onClose?: () => void;
};

function ChatSidebar({
  activeChatId,
  chats,
  className,
  onClose,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const visibleChats = getVisibleChats(chats, searchQuery);

  return (
    <aside className={`${className} flex-col`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Sparkles className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">MindForge AI</p>
            <p className="text-xs text-slate-500">AI Mentor</p>
          </div>
        </div>

        <button
          type="button"
          title={onClose ? "Close sidebar" : "Toggle sidebar"}
          aria-label={onClose ? "Close sidebar" : "Toggle sidebar"}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          onClick={onClose}
        >
          {onClose ? <X className="size-4" /> : <PanelLeft className="size-4" />}
        </button>
      </div>

      <Link
        href="/dashboard"
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to app
      </Link>

      <form action={createAiChat}>
        <button
          type="submit"
          className="mt-3 inline-flex w-full items-center gap-2 rounded-xl bg-violet-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600"
        >
          <Plus className="size-4" />
          New chat
        </button>
      </form>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm outline-none placeholder:text-slate-500"
        />
      </div>

      <nav className="mt-6 min-h-0 flex-1 overflow-hidden">
        <ChatGroup
          activeChatId={activeChatId}
          chats={visibleChats}
          hasRealChats={chats.length > 0}
          searchQuery={searchQuery}
          title="Chats"
        />
      </nav>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-sm font-semibold">Kacper</p>
        <p className="mt-1 text-xs text-slate-500">AI Mentor demo mode</p>
      </div>
    </aside>
  );
}

type ChatGroupProps = {
  activeChatId: string | null;
  chats: AiChat[];
  hasRealChats: boolean;
  searchQuery: string;
  title: string;
};

function ChatGroup({
  activeChatId,
  chats,
  hasRealChats,
  searchQuery,
  title,
}: ChatGroupProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const normalizedSearchQuery = searchQuery.trim();

  if (!chats.length) {
    return (
      <div className="mb-6">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-sm text-slate-500">
          {normalizedSearchQuery
            ? "No chats found."
            : "No chats yet. Start with a new message."}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div className="space-y-1">
        {chats.map((chat) => {
          const href = chat.id.startsWith("welcome")
            ? "/ai-mentor/chat"
            : `/ai-mentor/chat?chat=${chat.id}`;

          const isActive =
            chat.id === activeChatId ||
            (!activeChatId && chat.id.startsWith("welcome"));
          const isEditing = editingChatId === chat.id;

          if (isEditing) {
            return (
              <form
                key={chat.id}
                action={updateAiChatTitle}
                className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-2 py-1.5"
                onSubmit={() => setEditingChatId(null)}
              >
                <input type="hidden" name="chatId" value={chat.id} />
                <input
                  name="title"
                  defaultValue={chat.title}
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  title="Save chat title"
                  aria-label="Save chat title"
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Check className="size-4" />
                </button>
              </form>
            );
          }

          return (
            <div
              key={chat.id}
              className={`group flex min-w-0 items-center rounded-xl transition ${
                isActive
                  ? "bg-violet-500/15 text-white"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Link
                href={href}
                className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm"
              >
                <MessageSquare className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{chat.title}</span>
              </Link>

              {hasRealChats && !chat.id.startsWith("welcome") ? (
                <>
                  <span className="mr-2 shrink-0 rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 transition sm:group-hover:hidden">
                    {getChatTypeLabel(chat.type)}
                  </span>

                  <div className="hidden shrink-0 items-center pr-1 sm:group-hover:flex">
                    <button
                      type="button"
                      title="Rename chat"
                      aria-label="Rename chat"
                      className="flex size-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
                      onClick={() => setEditingChatId(chat.id)}
                    >
                      <Pencil className="size-3.5" />
                    </button>

                    <form action={deleteAiChat}>
                      <input type="hidden" name="chatId" value={chat.id} />
                      <input
                        type="hidden"
                        name="activeChatId"
                        value={activeChatId ?? ""}
                      />
                      <button
                        type="submit"
                        title="Delete chat"
                        aria-label="Delete chat"
                        className="flex size-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type MessageListProps = {
  messages: OptimisticAiChatMessage[];
};

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-end gap-8">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id}>{message.content}</UserMessage>
        ) : (
          <AssistantMessage key={message.id} pending={message.pending}>
            {message.content}
          </AssistantMessage>
        )
      )}
    </div>
  );
}

function WelcomeState() {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center text-center">
      <div className="flex size-16 items-center justify-center rounded-3xl border border-violet-400/30 bg-violet-500/15 text-violet-200 shadow-2xl shadow-violet-950/30">
        <Bot className="size-8" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
        Welcome to AI Mentor
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
        Ask about your current lesson, practice task, code problem or career
        path. I can use your MindForge progress to give more useful answers.
      </p>
    </div>
  );
}

type MessageProps = {
  children: React.ReactNode;
};

type AssistantMessageProps = MessageProps & {
  pending?: boolean;
};

function UserMessage({ children }: MessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-3xl bg-violet-600 px-5 py-3 text-sm leading-6 text-white sm:max-w-xl">
        {children}
      </div>
    </div>
  );
}

function AssistantMessage({ children, pending }: AssistantMessageProps) {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
        <Bot className="size-5" />
      </div>

      <div className="min-w-0 flex-1 whitespace-pre-wrap text-sm leading-7 text-slate-200">
        {pending ? <ThinkingMessage /> : children}
      </div>
    </div>
  );
}

function ThinkingMessage() {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-400">
      <span>AI Mentor is thinking</span>
      <span className="flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-violet-300 opacity-40" />
        <span className="size-1.5 rounded-full bg-violet-300 opacity-70" />
        <span className="size-1.5 rounded-full bg-violet-300" />
      </span>
    </div>
  );
}

type ChatComposerProps = {
  chatId: string;
  onOptimisticMessage: (message: string) => void;
  onRequestComplete: () => void;
};

function ChatComposer({
  chatId,
  onOptimisticMessage,
  onRequestComplete,
}: ChatComposerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get("message") ?? "").trim();

    if (!message || isPending) {
      return;
    }

    onOptimisticMessage(message);
    form.reset();

    startTransition(async () => {
      try {
        await sendAiMentorMessage(formData);
        router.refresh();
      } finally {
        onRequestComplete();
      }
    });
  }

  return (
    <div className="shrink-0 px-4 pb-4 sm:px-6 sm:pb-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <input type="hidden" name="chatId" value={chatId} />
        <div className="rounded-3xl border border-white/10 bg-[#111a2d] p-3 shadow-2xl shadow-slate-950/30">
          <textarea
            rows={2}
            name="message"
            aria-label="Message to AI Mentor"
            placeholder="Ask anything about programming, career or learning..."
            disabled={isPending}
            className="min-h-14 w-full resize-none bg-transparent px-2 py-2 text-sm leading-6 text-white outline-none placeholder:text-slate-500"
          />

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              title="Add attachment"
              aria-label="Add attachment"
              className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Paperclip className="size-5" />
            </button>

            <button
              type="submit"
              title="Send message"
              aria-label="Send message"
              disabled={isPending}
              className="flex size-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
            >
              <SendHorizonal className="size-5" />
            </button>
          </div>
        </div>
      </form>

      <p className="mt-2 text-center text-xs text-slate-500">
        AI can make mistakes. Always verify important information.
      </p>
    </div>
  );
}

function getVisibleChats(chats: AiChat[], searchQuery: string): AiChat[] {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  if (!chats.length && !normalizedSearchQuery) {
    return [
      {
        id: "welcome-chat",
        title: "Welcome to AI Mentor",
        type: "general",
        sourceId: null,
        sourceTitle: null,
        createdAt: "",
        updatedAt: "",
      },
    ];
  }

  if (!normalizedSearchQuery) {
    return chats;
  }

  return chats.filter((chat) =>
    [chat.title, getChatTypeLabel(chat.type), chat.sourceTitle ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchQuery)
  );
}

function getChatTypeLabel(type: AiChatType): string {
  const labels: Record<AiChatType, string> = {
    general: "General",
    lesson: "Lesson",
    challenge: "Challenge",
    roadmap: "Roadmap",
  };

  return labels[type];
}

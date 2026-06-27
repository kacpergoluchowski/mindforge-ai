"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  History,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  Paperclip,
  Plus,
  Search,
  SendHorizonal,
  Sparkles,
  X,
} from "lucide-react";

const welcomeChats = ["Welcome to AI Mentor"];

export default function AiMentorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="fixed inset-0 z-50 flex h-dvh overflow-hidden bg-[#080e18] text-white">
      <ChatSidebar className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0b1220] p-4 lg:flex" />

      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close chats sidebar"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          <ChatSidebar
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
              <h1 className="truncate font-semibold">AI Mentor</h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Your personal learning companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white sm:inline-flex"
            >
              <History className="size-4" />
              History
            </button>

            <button
              type="button"
              title="More options"
              aria-label="More options"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden px-4 py-6 sm:px-6">
          <WelcomeState />
        </div>

        <div className="shrink-0 px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-white/10 bg-[#111a2d] p-3 shadow-2xl shadow-slate-950/30">
              <textarea
                rows={2}
                aria-label="Message to AI Mentor"
                placeholder="Ask anything about programming, career or learning..."
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
                  type="button"
                  title="Send message"
                  aria-label="Send message"
                  className="flex size-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
                >
                  <SendHorizonal className="size-5" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-slate-500">
              AI can make mistakes. Always verify important information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

type ChatSidebarProps = {
  className: string;
  onClose?: () => void;
};

function ChatSidebar({ className, onClose }: ChatSidebarProps) {
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

      <button
        type="button"
        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600"
      >
        <Plus className="size-4" />
        New chat
      </button>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search chats..."
          className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm outline-none placeholder:text-slate-500"
        />
      </div>

      <nav className="mt-6 min-h-0 flex-1 overflow-hidden">
        <ChatGroup title="Chats" items={welcomeChats} activeIndex={0} />
      </nav>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-sm font-semibold">Kacper</p>
        <p className="mt-1 text-xs text-slate-500">AI Mentor demo mode</p>
      </div>
    </aside>
  );
}

type ChatGroupProps = {
  activeIndex?: number;
  items: string[];
  title: string;
};

function ChatGroup({ activeIndex, items, title }: ChatGroupProps) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`flex w-full min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
              index === activeIndex
                ? "bg-violet-500/15 text-white"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <MessageSquare className="size-4 shrink-0" />
            <span className="truncate">{item}</span>
          </button>
        ))}
      </div>
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
        path. This screen is ready for the API integration.
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import clsx from "clsx";
import {
  BookOpen,
  Code2,
  Command,
  GraduationCap,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type {
  GlobalSearchItem,
  GlobalSearchItemType,
} from "./types/layoutTypes.types";

type GlobalSearchProps = {
  items: GlobalSearchItem[];
  compact?: boolean;
};

const typeLabels: Record<GlobalSearchItemType, string> = {
  challenge: "Challenge",
  course: "Course",
  learningPath: "Roadmap",
  page: "Page",
  setting: "Setting",
};

const typeIcons: Record<GlobalSearchItemType, LucideIcon> = {
  challenge: ShieldCheck,
  course: BookOpen,
  learningPath: GraduationCap,
  page: LayoutDashboard,
  setting: Settings,
};

export default function GlobalSearch({ items, compact = false }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => getSearchResults(items, query), [items, query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  if (compact) {
    return (
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          className="flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white"
          aria-label="Open search"
        >
          <Search className="size-4" />
        </button>

        {open ? (
          <div className="fixed inset-0 z-1000 bg-slate-950/80 p-4 backdrop-blur-sm lg:hidden">
            <div className="mx-auto mt-16 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424] shadow-2xl">
              <SearchInput
                query={query}
                refObject={inputRef}
                setOpen={setOpen}
                setQuery={setQuery}
                mobile
              />
              <SearchResults
                query={query}
                results={results}
                onSelect={() => setOpen(false)}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <SearchInput
        query={query}
        refObject={inputRef}
        setOpen={setOpen}
        setQuery={setQuery}
      />

      {open ? (
        <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] shadow-2xl shadow-black/30">
          <SearchResults
            query={query}
            results={results}
            onSelect={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

type SearchInputProps = {
  mobile?: boolean;
  query: string;
  refObject: RefObject<HTMLInputElement | null>;
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
};

function SearchInput({
  mobile = false,
  query,
  refObject,
  setOpen,
  setQuery,
}: SearchInputProps) {
  return (
    <div className={clsx("relative", mobile && "border-b border-white/10")}>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

      <input
        ref={refObject}
        type="text"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search pages, courses, roadmaps..."
        className={clsx(
          "h-11 w-full border-white/10 bg-white/[0.04] pl-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/50 focus:bg-white/[0.06]",
          mobile ? "rounded-t-3xl pr-12" : "rounded-xl border pr-16"
        )}
      />

      {mobile ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Close search"
        >
          <X className="size-4" />
        </button>
      ) : (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-500">
          <Command className="size-3" />
          <span>K</span>
        </div>
      )}
    </div>
  );
}

type SearchResultsProps = {
  query: string;
  results: GlobalSearchItem[];
  onSelect: () => void;
};

function SearchResults({ query, results, onSelect }: SearchResultsProps) {
  return (
    <div className="max-h-[420px] overflow-y-auto p-2">
      {results.length ? (
        <div className="space-y-1">
          {results.map((item) => (
            <SearchResultItem
              key={item.id}
              item={item}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="p-5 text-sm text-slate-400">
          No results for{" "}
          <span className="font-medium text-slate-200">
            &quot;{query}&quot;
          </span>
        </div>
      )}
    </div>
  );
}

type SearchResultItemProps = {
  item: GlobalSearchItem;
  onSelect: () => void;
};

function SearchResultItem({ item, onSelect }: SearchResultItemProps) {
  const Icon = typeIcons[item.type] ?? Code2;

  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className="group flex min-w-0 items-start gap-3 rounded-xl p-3 transition hover:bg-white/[0.05]"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <h3 className="truncate text-sm font-semibold text-white">
            {item.title}
          </h3>
          <span className="shrink-0 rounded-full bg-white/[0.04] px-2 py-1 text-[11px] font-medium text-slate-400">
            {typeLabels[item.type]}
          </span>
        </div>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

function getSearchResults(
  items: GlobalSearchItem[],
  query: string
): GlobalSearchItem[] {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return items.slice(0, 8);
  }

  return items
    .map((item) => ({
      item,
      score: getSearchScore(item, normalizedQuery),
    }))
    .filter((result) => result.score > 0)
    .sort((firstResult, secondResult) => secondResult.score - firstResult.score)
    .slice(0, 10)
    .map((result) => result.item);
}

function getSearchScore(item: GlobalSearchItem, query: string): number {
  const title = normalizeSearchValue(item.title);
  const description = normalizeSearchValue(item.description);
  const keywords = normalizeSearchValue(item.keywords.join(" "));

  if (title === query) {
    return 100;
  }

  if (title.startsWith(query)) {
    return 80;
  }

  if (title.includes(query)) {
    return 60;
  }

  if (keywords.includes(query)) {
    return 40;
  }

  if (description.includes(query)) {
    return 20;
  }

  return 0;
}

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase();
}

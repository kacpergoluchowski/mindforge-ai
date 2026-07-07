import Link from "next/link";
import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import { courseCategories } from "../data/coursesData";

type CourseCategoriesProps = {
  activeCategory: string;
};

const categoryTranslationKeys: Record<string, string> = {
  "AI & ML": "courses.categories.aiMl",
  "All Courses": "courses.categories.all",
  Backend: "courses.categories.backend",
  Database: "courses.categories.database",
  Design: "courses.categories.design",
  DevOps: "courses.categories.devOps",
  Frontend: "courses.categories.frontend",
  Fullstack: "courses.categories.fullstack",
  JavaScript: "courses.categories.javascript",
  Mobile: "courses.categories.mobile",
  React: "courses.categories.react",
  TypeScript: "courses.categories.typescript",
};

export default function CourseCategories({
  activeCategory,
}: CourseCategoriesProps) {
  const normalizedActiveCategory = courseCategories.includes(
    activeCategory as (typeof courseCategories)[number]
  )
    ? activeCategory
    : "All Courses";

  return (
    <nav
      aria-label="Course categories"
      className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {courseCategories.map((category) => {
        const isActive = normalizedActiveCategory === category;
        const href =
          category === "All Courses"
            ? "/learn/courses"
            : `/learn/courses?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition sm:px-5",
              isActive
                ? "border-violet-500 bg-violet-500 text-white"
                : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-white"
            )}
          >
            <TranslatedText
              translationKey={categoryTranslationKeys[category] ?? ""}
              fallback={category}
            />
          </Link>
        );
      })}
    </nav>
  );
}

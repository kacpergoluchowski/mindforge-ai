import Link from "next/link";
import clsx from "clsx";

import { courseCategories } from "../data/coursesData";

type CourseCategoriesProps = {
  activeCategory: string;
};

export default function CourseCategories({
  activeCategory,
}: CourseCategoriesProps) {
  return (
    <section className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {courseCategories.map((category) => {
        const isActive = activeCategory === category;
        const href =
          category === "All Courses"
            ? "/learn/courses"
            : `/learn/courses?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            className={clsx(
              "shrink-0 rounded-xl border px-5 py-2.5 text-sm font-medium transition",
              isActive
                ? "border-violet-500 bg-violet-500 text-white"
                : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-white"
            )}
          >
            {category}
          </Link>
        );
      })}
    </section>
  );
}

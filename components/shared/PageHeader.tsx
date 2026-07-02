import Link from "next/link";
import { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: ReactNode;
  subtitle: ReactNode;
  action?: {
    href?: string;
    label: ReactNode;
    icon?: LucideIcon;
    rightIcon?: LucideIcon;
    onClick?: () => void;
  };
};

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  const Icon = action?.icon;
  const RightIcon = action?.rightIcon;

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white lg:text-3xl xl:text-4xl">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-400 lg:text-lg xl:text-xl">
          {subtitle}
        </p>
      </div>

      {action?.href ? (
        <Link
          href={action.href}
          className="
            flex items-center justify-center gap-3
            rounded-2xl
            bg-violet-500
            px-6 py-3 lg:py-4
            font-medium text-white
            transition
            hover:bg-violet-600
          "
        >
          {Icon && <Icon className="size-5" />}

          <span>{action.label}</span>

          {RightIcon && <RightIcon className="size-4" />}
        </Link>
      ) : action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="
            flex items-center justify-center gap-3
            rounded-2xl
            bg-violet-500
            px-6 py-3 lg:py-4
            font-medium text-white
            transition
            hover:bg-violet-600
          "
        >
          {Icon && <Icon className="size-5" />}

          <span>{action.label}</span>

          {RightIcon && <RightIcon className="size-4" />}
        </button>
      ) : null}
    </section>
  );
}

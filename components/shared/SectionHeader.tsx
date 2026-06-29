import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  buttonText?: ReactNode;
};

export default function SectionHeader({
  title,
  buttonText,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      {buttonText && (
        <button
          type="button"
          className="
            shrink-0
            rounded-xl
            border border-white/10
            bg-white/[0.02]
            px-4 py-2
            text-sm text-slate-300
            transition
            hover:bg-white/[0.05]
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

import { EyeOff } from "lucide-react";

import type { LucideIcon } from "lucide-react";

type LoginFieldProps = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  icon: LucideIcon;
  autoComplete: string;
};

export default function LoginField({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  autoComplete,
}: LoginFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-white">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-16 w-full rounded-lg border border-slate-700/70 bg-slate-950/25 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10"
        />

        {type === "password" && (
          <EyeOff className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
        )}
      </div>
    </div>
  );
}

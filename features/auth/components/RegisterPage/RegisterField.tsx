"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import type { LucideIcon } from "lucide-react";

type RegisterFieldProps = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  icon: LucideIcon;
  autoComplete: string;
  maxLength?: number;
  minLength?: number;
  onValueChange?: (value: string) => void;
  pattern?: string;
};

export default function RegisterField({
  id,
  name,
  label,
  type,
  placeholder,
  icon: Icon,
  autoComplete,
  maxLength,
  minLength,
  onValueChange,
  pattern,
}: RegisterFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>

      <div className="relative">
        <Icon
          aria-hidden="true"
          className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"
        />

        <input
          id={id}
          name={name}
          type={inputType}
          required
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          onInput={(event) => onValueChange?.(event.currentTarget.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-slate-700/70 bg-slate-950/35 pl-11 pr-11 text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
        />

        {isPassword && (
          <button
            type="button"
            title={isPasswordVisible ? "Hide password" : "Show password"}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-slate-500 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          >
            {isPasswordVisible ? (
              <EyeOff aria-hidden="true" className="size-5" />
            ) : (
              <Eye aria-hidden="true" className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

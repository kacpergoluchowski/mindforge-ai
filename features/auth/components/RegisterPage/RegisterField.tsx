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
  minLength?: number;
  onValueChange?: (value: string) => void;
};

export default function RegisterField({
  id,
  name,
  label,
  type,
  placeholder,
  icon: Icon,
  autoComplete,
  minLength,
  onValueChange,
}: RegisterFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-white">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

        <input
          id={id}
          name={name}
          type={inputType}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          onInput={(event) => onValueChange?.(event.currentTarget.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-lg border border-slate-700/70 bg-slate-950/25 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10"
        />

        {isPassword && (
          <button
            type="button"
            title={isPasswordVisible ? "Hide password" : "Show password"}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
          >
            {isPasswordVisible ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { translations } from ".";
import type { Locale } from ".";

type TranslationValue = string | TranslationDictionary;
type TranslationDictionary = {
  [key: string]: TranslationValue;
};

type I18nContextValue = {
  locale: Locale | "en";
  setLocale: (locale: Locale | "en") => void;
  t: (key: string, fallback: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const storageKey = "mindforge-locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale | "en">(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    return window.localStorage.getItem(storageKey) === "pl" ? "pl" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        setLocaleState(nextLocale);
        window.localStorage.setItem(storageKey, nextLocale);
        document.documentElement.lang = nextLocale;
      },
      t: (key, fallback) => {
        if (locale === "en") {
          return fallback;
        }

        const value = getTranslationValue(translations[locale], key);

        return typeof value === "string" ? value : fallback;
      },
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider.");
  }

  return context;
}

function getTranslationValue(
  dictionary: TranslationValue,
  key: string
): TranslationValue | undefined {
  return key.split(".").reduce<TranslationValue | undefined>((current, part) => {
    if (!current || typeof current === "string") {
      return undefined;
    }

    return current[part];
  }, dictionary);
}

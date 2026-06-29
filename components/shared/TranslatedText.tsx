"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

type TranslatedTextProps = {
  fallback: string;
  translationKey: string;
  values?: Record<string, string | number>;
};

export default function TranslatedText({
  fallback,
  translationKey,
  values,
}: TranslatedTextProps) {
  const { t } = useI18n();
  const text = t(translationKey, fallback);

  if (!values) {
    return text;
  }

  return Object.entries(values).reduce(
    (currentText, [key, value]) =>
      currentText.replaceAll(`{${key}}`, String(value)),
    text
  );
}

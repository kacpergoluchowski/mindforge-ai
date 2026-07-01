"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

type LocalizedDateProps = {
  date: string;
  options?: Intl.DateTimeFormatOptions;
};

export default function LocalizedDate({ date, options }: LocalizedDateProps) {
  const { locale } = useI18n();
  const formattedDate = new Intl.DateTimeFormat(
    locale === "pl" ? "pl-PL" : "en",
    options
  ).format(new Date(date));

  return formattedDate;
}

import { pl } from "./locales/pl";

export const translations = {
  pl,
} as const;

export type Locale = keyof typeof translations;
export type Translations = (typeof translations)[Locale];

export { pl };

'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import en from '@/locales/en.json';
import vi from '@/locales/vi.json';
import ko from '@/locales/ko.json';
import ja from '@/locales/ja.json';

export type Locale = 'en' | 'vi' | 'ko' | 'ja';

type Messages = { [key: string]: string | Messages };

const translations: Record<Locale, Messages> = { en, vi, ko, ja };

type I18nContextType = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: 'ja',
  t: (key: string) => key,
  setLocale: () => {}
});

export function translate(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: string | Messages | undefined = translations[locale];
  for (const k of keys) {
    if (typeof result === 'object') {
      result = result[k];
    } else {
      result = undefined;
    }
  }
  return typeof result === 'string' ? result : key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ja');
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translate(locale, key)
    }),
    [locale]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}

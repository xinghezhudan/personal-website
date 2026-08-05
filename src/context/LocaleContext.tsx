import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Locale } from '../types'

interface LocaleContextValue { locale: Locale; toggleLocale: () => void; text: <T extends { zh: string; en: string }>(value: T) => string }
const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh')
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en' }, [locale])
  const value = useMemo(() => ({ locale, toggleLocale: () => setLocale((current) => current === 'zh' ? 'en' : 'zh'), text: <T extends { zh: string; en: string }>(item: T) => item[locale] }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() { const context = useContext(LocaleContext); if (!context) throw new Error('useLocale must be used within LocaleProvider'); return context }

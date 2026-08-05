export type Locale = 'zh' | 'en'

export interface LocalizedText {
  zh: string
  en: string
}

export interface PortfolioProject {
  id: string
  number: string
  title: LocalizedText
  category: LocalizedText
  description: LocalizedText
  tags: string[]
  image: string
  imagePosition: string
  tint: string
}

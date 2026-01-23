import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// Theme types
export type ThemeType = 'scifi' | 'pastel' | 'steampunk'
export type LanguageType = 'en' | 'cs' | 'de' | 'fr' | 'es'
export type CurrencyType = 'EUR' | 'USD' | 'CZK' | 'GBP'
export type ColorBlindnessType = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'

// Theme color palettes
export const themeColors = {
  scifi: {
    name: 'Wild Sci-Fi',
    primary: '#e879a9',
    secondary: '#7ec8d8',
    accent: '#a78bcc',
    background: '#08080f',
    surface: 'rgba(255, 255, 255, 0.03)',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.6)',
    gradient: 'linear-gradient(135deg, #e879a9, #f4a574, #f0d878, #7dd3a8, #7ec8d8, #7ba3d8, #a78bcc)',
    glow: 'rgba(126, 200, 216, 0.3)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  pastel: {
    name: 'Pastel Soft',
    primary: '#f8b4c8',
    secondary: '#b8e0e8',
    accent: '#d4c4e8',
    background: '#1a1a24',
    surface: 'rgba(255, 255, 255, 0.05)',
    text: '#f0f0f5',
    textMuted: 'rgba(240, 240, 245, 0.6)',
    gradient: 'linear-gradient(135deg, #f8b4c8, #fcd5b8, #fcf0b8, #b8e8c8, #b8e0e8, #b8c8e8, #d4c4e8)',
    glow: 'rgba(184, 224, 232, 0.25)',
    border: 'rgba(255, 255, 255, 0.08)',
  },
  steampunk: {
    name: 'Steampunk Hill',
    primary: '#cd7f32',
    secondary: '#b87333',
    accent: '#8b4513',
    background: '#0f0d0a',
    surface: 'rgba(139, 69, 19, 0.1)',
    text: '#e8dcc8',
    textMuted: 'rgba(232, 220, 200, 0.6)',
    gradient: 'linear-gradient(135deg, #cd7f32, #b87333, #a0522d, #8b4513, #654321, #4a3728)',
    glow: 'rgba(205, 127, 50, 0.3)',
    border: 'rgba(205, 127, 50, 0.2)',
  },
}

// Currency conversion rates (approximate)
export const currencyRates: Record<CurrencyType, number> = {
  EUR: 1,
  USD: 1.08,
  CZK: 25.5,
  GBP: 0.86,
}

export const currencySymbols: Record<CurrencyType, string> = {
  EUR: '€',
  USD: '$',
  CZK: 'Kč',
  GBP: '£',
}

// Language translations
export const translations: Record<LanguageType, Record<string, string>> = {
  en: {
    heroTitle: 'DON HOMMER',
    heroSubtitle: 'Visionary Creative Leader',
    heroTagline: 'Where Passion Meets Powerful Machinery',
    storyTitle: 'The Story',
    storySubtitle: 'From impossible beginnings to unlimited possibilities',
    techTitle: 'New Age Technologies',
    servicesTitle: 'Web Services & AI',
    pricingTitle: 'Investment',
    pricingSubtitle: 'Premium solutions for visionary leaders',
    basicPackage: 'Basic Web Package',
    downPayment: 'Down Payment',
    contactUs: 'Contact Us',
    orderNow: 'Order Now',
    limitedSlots: 'Limited slots available',
  },
  cs: {
    heroTitle: 'DON HOMMER',
    heroSubtitle: 'Vizionářský Kreativní Lídr',
    heroTagline: 'Kde se Vášeň Setkává s Mocnými Stroji',
    storyTitle: 'Příběh',
    storySubtitle: 'Od nemožných začátků k neomezeným možnostem',
    techTitle: 'Technologie Nové Éry',
    servicesTitle: 'Webové Služby & AI',
    pricingTitle: 'Investice',
    pricingSubtitle: 'Prémiová řešení pro vizionářské lídry',
    basicPackage: 'Základní Webový Balíček',
    downPayment: 'Záloha',
    contactUs: 'Kontaktujte Nás',
    orderNow: 'Objednat',
    limitedSlots: 'Omezený počet míst',
  },
  de: {
    heroTitle: 'DON HOMMER',
    heroSubtitle: 'Visionärer Kreativer Führer',
    heroTagline: 'Wo Leidenschaft auf Mächtige Maschinen Trifft',
    storyTitle: 'Die Geschichte',
    storySubtitle: 'Von unmöglichen Anfängen zu unbegrenzten Möglichkeiten',
    techTitle: 'Neue Ära Technologien',
    servicesTitle: 'Web-Dienste & KI',
    pricingTitle: 'Investition',
    pricingSubtitle: 'Premium-Lösungen für visionäre Führungskräfte',
    basicPackage: 'Basis-Webpaket',
    downPayment: 'Anzahlung',
    contactUs: 'Kontaktieren Sie Uns',
    orderNow: 'Jetzt Bestellen',
    limitedSlots: 'Begrenzte Plätze verfügbar',
  },
  fr: {
    heroTitle: 'DON HOMMER',
    heroSubtitle: 'Leader Créatif Visionnaire',
    heroTagline: 'Où la Passion Rencontre les Machines Puissantes',
    storyTitle: "L'Histoire",
    storySubtitle: 'Des débuts impossibles aux possibilités illimitées',
    techTitle: 'Technologies Nouvelle Ère',
    servicesTitle: 'Services Web & IA',
    pricingTitle: 'Investissement',
    pricingSubtitle: 'Solutions premium pour leaders visionnaires',
    basicPackage: 'Forfait Web Basique',
    downPayment: 'Acompte',
    contactUs: 'Contactez-Nous',
    orderNow: 'Commander',
    limitedSlots: 'Places limitées disponibles',
  },
  es: {
    heroTitle: 'DON HOMMER',
    heroSubtitle: 'Líder Creativo Visionario',
    heroTagline: 'Donde la Pasión se Encuentra con Máquinas Poderosas',
    storyTitle: 'La Historia',
    storySubtitle: 'De comienzos imposibles a posibilidades ilimitadas',
    techTitle: 'Tecnologías Nueva Era',
    servicesTitle: 'Servicios Web & IA',
    pricingTitle: 'Inversión',
    pricingSubtitle: 'Soluciones premium para líderes visionarios',
    basicPackage: 'Paquete Web Básico',
    downPayment: 'Pago Inicial',
    contactUs: 'Contáctenos',
    orderNow: 'Ordenar Ahora',
    limitedSlots: 'Plazas limitadas disponibles',
  },
}

// Color blindness filter CSS
export const colorBlindnessFilters: Record<ColorBlindnessType, string> = {
  none: 'none',
  protanopia: 'url(#protanopia)',
  deuteranopia: 'url(#deuteranopia)',
  tritanopia: 'url(#tritanopia)',
}

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  language: LanguageType
  setLanguage: (lang: LanguageType) => void
  currency: CurrencyType
  setCurrency: (currency: CurrencyType) => void
  colorBlindness: ColorBlindnessType
  setColorBlindness: (type: ColorBlindnessType) => void
  ttsEnabled: boolean
  setTtsEnabled: (enabled: boolean) => void
  speakText: (text: string) => void
  colors: typeof themeColors.scifi
  t: (key: string) => string
  formatPrice: (priceEur: number) => string
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('scifi')
  const [language, setLanguage] = useState<LanguageType>('en')
  const [currency, setCurrency] = useState<CurrencyType>('EUR')
  const [colorBlindness, setColorBlindness] = useState<ColorBlindnessType>('none')
  const [ttsEnabled, setTtsEnabled] = useState(false)

  const colors = themeColors[theme]

  const t = useCallback((key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }, [language])

  const formatPrice = useCallback((priceEur: number): string => {
    const converted = priceEur * currencyRates[currency]
    const formatted = new Intl.NumberFormat(language, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(converted))
    
    if (currency === 'CZK') {
      return `${formatted} ${currencySymbols[currency]}`
    }
    return `${currencySymbols[currency]}${formatted}`
  }, [currency, language])

  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || typeof window === 'undefined') return
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Try to find a nice female voice
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(v => 
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('victoria') ||
      v.name.toLowerCase().includes('karen') ||
      v.name.toLowerCase().includes('moira') ||
      v.name.includes('Google UK English Female')
    ) || voices.find(v => v.lang.startsWith(language)) || voices[0]
    
    if (femaleVoice) {
      utterance.voice = femaleVoice
    }
    
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.volume = 0.8
    
    window.speechSynthesis.speak(utterance)
  }, [ttsEnabled, language])

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      language,
      setLanguage,
      currency,
      setCurrency,
      colorBlindness,
      setColorBlindness,
      ttsEnabled,
      setTtsEnabled,
      speakText,
      colors,
      t,
      formatPrice,
    }}>
      {/* SVG filters for color blindness */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
      
      <div style={{ filter: colorBlindnessFilters[colorBlindness] }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

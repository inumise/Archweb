import { useState } from 'react'
import { 
  Globe, 
  Eye, 
  Volume2, 
  DollarSign, 
  ChevronDown,
  Sparkles,
  Flower2,
  Cog
} from 'lucide-react'
import { useTheme, ThemeType, LanguageType, CurrencyType, ColorBlindnessType } from '../contexts/ThemeContext'

const languages: { code: LanguageType; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

const currencies: { code: CurrencyType; name: string; symbol: string }[] = [
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
]

const themes: { code: ThemeType; name: string; icon: typeof Sparkles }[] = [
  { code: 'scifi', name: 'Wild Sci-Fi', icon: Sparkles },
  { code: 'pastel', name: 'Pastel Soft', icon: Flower2 },
  { code: 'steampunk', name: 'Steampunk Hill', icon: Cog },
]

const colorBlindnessOptions: { code: ColorBlindnessType; name: string }[] = [
  { code: 'none', name: 'Normal Vision' },
  { code: 'protanopia', name: 'Protanopia (Red-Blind)' },
  { code: 'deuteranopia', name: 'Deuteranopia (Green-Blind)' },
  { code: 'tritanopia', name: 'Tritanopia (Blue-Blind)' },
]

export default function AccessibilityMenu() {
  const { 
    theme, setTheme, 
    language, setLanguage, 
    currency, setCurrency,
    colorBlindness, setColorBlindness,
    ttsEnabled, setTtsEnabled,
    colors
  } = useTheme()

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const currentLang = languages.find(l => l.code === language)
  const currentCurrency = currencies.find(c => c.code === currency)
  const currentTheme = themes.find(t => t.code === theme)
  const ThemeIcon = currentTheme?.icon || Sparkles

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50"
      style={{ 
        background: `linear-gradient(180deg, ${colors.background} 0%, transparent 100%)`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-2 text-sm">
          {/* Left side - Theme & Accessibility */}
          <div className="flex items-center gap-1">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('theme')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                style={{ color: colors.text }}
              >
                <ThemeIcon className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="hidden sm:inline">{currentTheme?.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {openDropdown === 'theme' && (
                <div 
                  className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-xl min-w-[180px]"
                  style={{ 
                    background: colors.background,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  {themes.map(t => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.code}
                        onClick={() => { setTheme(t.code); setOpenDropdown(null) }}
                        className={`w-full flex items-center gap-3 px-4 py-2 transition-all hover:bg-white/10 ${
                          theme === t.code ? 'bg-white/5' : ''
                        }`}
                        style={{ color: colors.text }}
                      >
                        <Icon className="w-4 h-4" style={{ color: colors.primary }} />
                        <span>{t.name}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Color Blindness Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('colorblind')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                style={{ color: colors.text }}
              >
                <Eye className="w-4 h-4" style={{ color: colors.secondary }} />
                <span className="hidden md:inline">Vision</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {openDropdown === 'colorblind' && (
                <div 
                  className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-xl min-w-[220px]"
                  style={{ 
                    background: colors.background,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  {colorBlindnessOptions.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setColorBlindness(opt.code); setOpenDropdown(null) }}
                      className={`w-full flex items-center gap-3 px-4 py-2 transition-all hover:bg-white/10 ${
                        colorBlindness === opt.code ? 'bg-white/5' : ''
                      }`}
                      style={{ color: colors.text }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          background: colorBlindness === opt.code ? colors.primary : 'transparent',
                          border: `1px solid ${colors.primary}`
                        }}
                      />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Text-to-Speech Toggle */}
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10 ${
                ttsEnabled ? 'bg-white/10' : ''
              }`}
              style={{ color: colors.text }}
              title="Text-to-Speech"
            >
              <Volume2 
                className="w-4 h-4" 
                style={{ color: ttsEnabled ? colors.accent : colors.textMuted }} 
              />
              <span className="hidden lg:inline">{ttsEnabled ? 'TTS On' : 'TTS Off'}</span>
            </button>
          </div>

          {/* Center - Brand */}
          <div 
            className="hidden sm:block text-xs font-medium tracking-wider"
            style={{ color: colors.textMuted }}
          >
            DON HOMMER
          </div>

          {/* Right side - Language & Currency */}
          <div className="flex items-center gap-1">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('language')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                style={{ color: colors.text }}
              >
                <Globe className="w-4 h-4" style={{ color: colors.primary }} />
                <span>{currentLang?.flag}</span>
                <span className="hidden sm:inline">{currentLang?.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {openDropdown === 'language' && (
                <div 
                  className="absolute top-full right-0 mt-1 py-1 rounded-lg shadow-xl min-w-[160px]"
                  style={{ 
                    background: colors.background,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setOpenDropdown(null) }}
                      className={`w-full flex items-center gap-3 px-4 py-2 transition-all hover:bg-white/10 ${
                        language === lang.code ? 'bg-white/5' : ''
                      }`}
                      style={{ color: colors.text }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('currency')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                style={{ color: colors.text }}
              >
                <DollarSign className="w-4 h-4" style={{ color: colors.secondary }} />
                <span>{currentCurrency?.symbol}</span>
                <span className="hidden sm:inline">{currentCurrency?.code}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {openDropdown === 'currency' && (
                <div 
                  className="absolute top-full right-0 mt-1 py-1 rounded-lg shadow-xl min-w-[180px]"
                  style={{ 
                    background: colors.background,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  {currencies.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => { setCurrency(curr.code); setOpenDropdown(null) }}
                      className={`w-full flex items-center gap-3 px-4 py-2 transition-all hover:bg-white/10 ${
                        currency === curr.code ? 'bg-white/5' : ''
                      }`}
                      style={{ color: colors.text }}
                    >
                      <span className="w-6 text-center">{curr.symbol}</span>
                      <span>{curr.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  )
}

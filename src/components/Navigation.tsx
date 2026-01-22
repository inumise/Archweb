import { useState } from 'react'
import { 
  Home, 
  Cpu, 
  GitBranch, 
  MessageCircle, 
  ShoppingCart, 
  Building2, 
  Sparkles 
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export type PageType = 'main' | 'tech' | 'mindmap' | 'helper' | 'catalogue' | 'enterprise' | 'sense'

interface NavigationProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

const navItems: { id: PageType; name: string; icon: typeof Home }[] = [
  { id: 'main', name: 'Main', icon: Home },
  { id: 'tech', name: 'Tech', icon: Cpu },
  { id: 'mindmap', name: 'Mind Map', icon: GitBranch },
  { id: 'helper', name: 'Helper', icon: MessageCircle },
  { id: 'catalogue', name: 'Catalogue', icon: ShoppingCart },
  { id: 'enterprise', name: 'Enterprise', icon: Building2 },
  { id: 'sense', name: 'The Sense', icon: Sparkles },
]

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { colors } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<PageType | null>(null)

  return (
    <nav 
      className="fixed top-12 left-0 right-0 z-40"
      style={{ 
        background: `linear-gradient(180deg, ${colors.surface}ee 0%, ${colors.surface}cc 100%)`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-1 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            const isHovered = hoveredItem === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap"
                style={{ 
                  background: isActive 
                    ? `${colors.primary}20` 
                    : isHovered 
                      ? `${colors.primary}10` 
                      : 'transparent',
                  color: isActive ? colors.primary : colors.text,
                  border: `1px solid ${isActive ? colors.primary + '40' : 'transparent'}`,
                  transform: isHovered && !isActive ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <Icon 
                  className="w-4 h-4" 
                  style={{ 
                    color: isActive ? colors.primary : colors.textMuted 
                  }} 
                />
                <span className="text-sm font-medium hidden sm:inline">{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

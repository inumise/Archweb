import { useState, useRef, useEffect } from 'react'
import { Plus, ExternalLink, X, Globe } from 'lucide-react'

interface URLItem {
  id: string
  url: string
  title: string
}

const defaultURLs: URLItem[] = [
  { id: '1', url: 'https://www.apple.com', title: 'Apple' },
  { id: '2', url: 'https://www.google.com', title: 'Google' },
  { id: '3', url: 'https://www.github.com', title: 'GitHub' },
  { id: '4', url: 'https://www.figma.com', title: 'Figma' },
  { id: '5', url: 'https://www.dribbble.com', title: 'Dribbble' },
]

function URLCard({ item, onRemove, index }: { item: URLItem; onRemove: (id: string) => void; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const rainbowColors = ['#ff0080', '#ff8c00', '#ffff00', '#00ff00', '#00ffff', '#0080ff', '#8000ff']
  const borderColor = rainbowColors[index % rainbowColors.length]

  return (
    <div
      ref={cardRef}
      className="relative group transition-all duration-500 ease-out"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-75 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md"
        style={{
          background: `linear-gradient(45deg, ${borderColor}, ${rainbowColors[(index + 2) % rainbowColors.length]})`,
        }}
      />
      
      <div className="relative glass-strong rounded-2xl overflow-hidden" style={{ minHeight: '320px' }}>
        <div className="absolute top-0 left-0 right-0 h-12 glass flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: borderColor }} />
            <span className="text-sm font-medium truncate max-w-[150px]">{item.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-12 h-full">
          <div className="relative h-64 overflow-hidden flex items-center justify-center">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(135deg, ${borderColor}40 0%, ${rainbowColors[(index + 3) % rainbowColors.length]}20 50%, ${borderColor}10 100%)`,
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${borderColor}30, ${rainbowColors[(index + 2) % rainbowColors.length]}20)`,
                  boxShadow: `0 0 40px ${borderColor}30`,
                }}
              >
                <Globe className="w-10 h-10" style={{ color: borderColor }} />
              </div>
              <h3 className="text-xl font-bold mb-2 orbitron" style={{ color: borderColor }}>
                {item.title}
              </h3>
              <p className="text-sm text-white/50 mb-4">
                Click to visit this portal
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${borderColor}, ${rainbowColors[(index + 2) % rainbowColors.length]})`,
                  boxShadow: `0 0 20px ${borderColor}50`,
                }}
              >
                Open Portal
              </a>
            </div>
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 glass">
          <p className="text-xs text-white/60 truncate">{item.url}</p>
        </div>
      </div>
    </div>
  )
}

export default function URLPreview() {
  const [urls, setUrls] = useState<URLItem[]>(defaultURLs)
  const [newUrl, setNewUrl] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addUrl = () => {
    if (!newUrl.trim()) return
    
    let formattedUrl = newUrl.trim()
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl
    }

    try {
      const parsedUrl = new URL(formattedUrl)
      const newItem: URLItem = {
        id: Date.now().toString(),
        url: formattedUrl,
        title: parsedUrl.hostname.replace('www.', ''),
      }

      setUrls(prev => [newItem, ...prev])
      setNewUrl('')
      setIsAdding(false)
    } catch {
      alert('Please enter a valid URL')
    }
  }

  const removeUrl = (id: string) => {
    setUrls(prev => prev.filter(item => item.id !== id))
  }

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAdding])

  return (
    <section className="relative py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold orbitron mb-4">
            <span className="rainbow-text">Live Web Portals</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Add any URL to see live previews. A window into the digital universe.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          {isAdding ? (
            <div className="flex gap-2 items-center glass-strong rounded-full px-4 py-2 w-full max-w-md">
              <input
                ref={inputRef}
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addUrl()}
                placeholder="Enter URL (e.g., example.com)"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 px-2"
              />
              <button
                onClick={addUrl}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Add
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full glass-strong hover:bg-white/10 transition-all duration-300"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Add New Portal</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urls.map((item, index) => (
            <URLCard key={item.id} item={item} onRemove={removeUrl} index={index} />
          ))}
        </div>

        {urls.length === 0 && (
          <div className="text-center py-20">
            <Globe className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <p className="text-white/40">No portals yet. Add your first URL above.</p>
          </div>
        )}
      </div>
    </section>
  )
}

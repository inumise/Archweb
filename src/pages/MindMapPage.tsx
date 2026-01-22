import { useState, useRef, useCallback, useEffect } from 'react'
import { 
  Plus, Trash2, Type, Image, Pencil, 
  MessageSquare, List, Menu, 
  ZoomIn, ZoomOut, Download, Upload, Undo, Redo,
  Square, Layers
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface MindMapNode {
  id: string
  type: 'text' | 'image' | 'drawing' | 'chat' | 'list' | 'menu' | 'button' | 'container'
  x: number
  y: number
  width: number
  height: number
  content: string
  children: string[]
  parentId: string | null
  style: {
    background?: string
    border?: string
    borderRadius?: string
  }
  imageData?: string
  drawingData?: string[]
  listItems?: string[]
}

const nodeTypes = [
  { type: 'text', icon: Type, label: 'Text Box', watermark: 'Text Content' },
  { type: 'image', icon: Image, label: 'Image', watermark: 'Photo Input' },
  { type: 'drawing', icon: Pencil, label: 'Drawing', watermark: 'Freehand Drawing' },
  { type: 'chat', icon: MessageSquare, label: 'AI Chat', watermark: 'Chat Interface' },
  { type: 'list', icon: List, label: 'List', watermark: 'List Items' },
  { type: 'menu', icon: Menu, label: 'Menu', watermark: 'Navigation Menu' },
  { type: 'button', icon: Square, label: 'Button', watermark: 'Interactive Button' },
  { type: 'container', icon: Layers, label: 'Container', watermark: 'Layout Container' },
] as const

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

function MindMapNodeComponent({ 
  node, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onDelete,
  onDragStart,
  colors 
}: { 
  node: MindMapNode
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<MindMapNode>) => void
  onDelete: () => void
  onDragStart: (e: React.MouseEvent) => void
  colors: ReturnType<typeof useTheme>['colors']
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [localContent, setLocalContent] = useState(node.content)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const nodeType = nodeTypes.find(t => t.type === node.type)
  const Icon = nodeType?.icon || Type

  // Drawing functionality
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (node.type !== 'drawing') return
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || node.type !== 'drawing') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.strokeStyle = colors.primary
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      onUpdate({ drawingData: [canvas.toDataURL()] })
    }
  }

  // Image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      onUpdate({ imageData: event.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className="absolute cursor-move group"
      style={{
        left: node.x,
        top: node.y,
        width: node.width,
        minHeight: node.height,
      }}
      onClick={(e) => { e.stopPropagation(); onSelect() }}
      onMouseDown={onDragStart}
    >
      {/* Node container */}
      <div
        className="relative rounded-xl p-4 transition-all duration-200"
        style={{
          background: node.style.background || colors.surface,
          border: `2px solid ${isSelected ? colors.primary : colors.border}`,
          boxShadow: isSelected ? `0 0 20px ${colors.primary}40` : `0 4px 20px ${colors.background}80`,
        }}
      >
        {/* Watermark */}
        <div 
          className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full opacity-60"
          style={{ background: `${colors.primary}20`, color: colors.primary }}
        >
          {nodeType?.watermark}
        </div>

        {/* Icon */}
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
          style={{ background: `${colors.primary}20` }}
        >
          <Icon className="w-4 h-4" style={{ color: colors.primary }} />
        </div>

        {/* Content based on type */}
        {node.type === 'text' && (
          <div>
            {isEditing ? (
              <textarea
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                onBlur={() => { setIsEditing(false); onUpdate({ content: localContent }) }}
                className="w-full bg-transparent outline-none resize-none"
                style={{ color: colors.text }}
                autoFocus
              />
            ) : (
              <p 
                className="cursor-text"
                style={{ color: colors.text }}
                onDoubleClick={() => setIsEditing(true)}
              >
                {node.content || 'Double-click to edit...'}
              </p>
            )}
          </div>
        )}

        {node.type === 'image' && (
          <div>
            {node.imageData ? (
              <img 
                src={node.imageData} 
                alt="Uploaded" 
                className="w-full h-32 object-cover rounded-lg"
              />
            ) : (
              <div 
                className="w-full h-32 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                style={{ background: `${colors.primary}10`, border: `2px dashed ${colors.border}` }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="w-8 h-8 mb-2" style={{ color: colors.textMuted }} />
                <span className="text-sm" style={{ color: colors.textMuted }}>Click to upload</span>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>
        )}

        {node.type === 'drawing' && (
          <canvas
            ref={canvasRef}
            width={node.width - 32}
            height={100}
            className="rounded-lg cursor-crosshair"
            style={{ background: `${colors.background}` }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        )}

        {node.type === 'chat' && (
          <div 
            className="rounded-lg p-3"
            style={{ background: colors.background }}
          >
            <div className="flex items-start gap-2 mb-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: `${colors.primary}20` }}
              >
                <MessageSquare className="w-3 h-3" style={{ color: colors.primary }} />
              </div>
              <div 
                className="flex-1 p-2 rounded-lg text-sm"
                style={{ background: colors.surface, color: colors.text }}
              >
                AI Chat Interface Preview
              </div>
            </div>
            <input 
              className="w-full p-2 rounded-lg text-sm outline-none"
              style={{ background: colors.surface, color: colors.text, border: `1px solid ${colors.border}` }}
              placeholder="Type a message..."
            />
          </div>
        )}

        {node.type === 'list' && (
          <div className="space-y-2">
            {(node.listItems || ['Item 1', 'Item 2', 'Item 3']).map((item, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: colors.background }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: colors.primary }}
                />
                <span className="text-sm" style={{ color: colors.text }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {node.type === 'menu' && (
          <div className="space-y-1">
            {['Home', 'About', 'Services', 'Contact'].map((item, i) => (
              <div 
                key={i}
                className="p-2 rounded-lg text-sm cursor-pointer transition-colors hover:bg-white/10"
                style={{ color: colors.text }}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {node.type === 'button' && (
          <button
            className="w-full py-3 rounded-lg font-medium transition-all hover:scale-105"
            style={{ background: colors.gradient, color: colors.background }}
          >
            {node.content || 'Button'}
          </button>
        )}

        {node.type === 'container' && (
          <div 
            className="min-h-[100px] rounded-lg flex items-center justify-center"
            style={{ background: `${colors.primary}05`, border: `2px dashed ${colors.border}` }}
          >
            <span className="text-sm" style={{ color: colors.textMuted }}>
              Drop elements here
            </span>
          </div>
        )}

        {/* Delete button on hover */}
        <button
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: '#ef4444', color: 'white' }}
          onClick={(e) => { e.stopPropagation(); onDelete() }}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export default function MindMapPage() {
  const { colors } = useTheme()
  const [nodes, setNodes] = useState<MindMapNode[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const [history, setHistory] = useState<MindMapNode[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)

  const addNode = (type: MindMapNode['type']) => {
    const newNode: MindMapNode = {
      id: generateId(),
      type,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: type === 'container' ? 300 : 200,
      height: type === 'container' ? 200 : 150,
      content: '',
      children: [],
      parentId: null,
      style: {},
      listItems: type === 'list' ? ['Item 1', 'Item 2', 'Item 3'] : undefined,
    }
    const newNodes = [...nodes, newNode]
    setNodes(newNodes)
    saveToHistory(newNodes)
    setSelectedNode(newNode.id)
  }

  const updateNode = (id: string, updates: Partial<MindMapNode>) => {
    const newNodes = nodes.map(n => n.id === id ? { ...n, ...updates } : n)
    setNodes(newNodes)
  }

  const deleteNode = (id: string) => {
    const newNodes = nodes.filter(n => n.id !== id)
    setNodes(newNodes)
    saveToHistory(newNodes)
    setSelectedNode(null)
  }

  const saveToHistory = (newNodes: MindMapNode[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newNodes)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setNodes(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setNodes(history[historyIndex + 1])
    }
  }

  const handleDragStart = (nodeId: string, e: React.MouseEvent) => {
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return
    setIsDragging(true)
    setSelectedNode(nodeId)
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    })
  }

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectedNode) return
    const newX = (e.clientX - dragOffset.x) / zoom
    const newY = (e.clientY - dragOffset.y) / zoom
    updateNode(selectedNode, { x: newX, y: newY })
  }, [isDragging, selectedNode, dragOffset, zoom])

  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      saveToHistory(nodes)
    }
  }, [isDragging, nodes])

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', handleDragEnd)
    return () => {
      window.removeEventListener('mousemove', handleDrag)
      window.removeEventListener('mouseup', handleDragEnd)
    }
  }, [handleDrag, handleDragEnd])

  const exportMap = () => {
    const data = JSON.stringify(nodes, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mindmap.json'
    a.click()
  }

  const importMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        setNodes(data)
        saveToHistory(data)
      } catch (err) {
        console.error('Invalid file format')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen pt-28 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ 
              background: colors.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Mind Map Editor
          </h1>
          <p style={{ color: colors.textMuted }}>
            Build your frontend visually - no coding required
          </p>
        </div>

        {/* Toolbar */}
        <div 
          className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl mb-4"
          style={{ background: colors.surface, border: `1px solid ${colors.border}` }}
        >
          {/* Node types */}
          <div className="flex flex-wrap gap-2">
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon
              return (
                <button
                  key={nodeType.type}
                  onClick={() => addNode(nodeType.type as MindMapNode['type'])}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ 
                    background: `${colors.primary}15`,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className="text-sm hidden sm:inline">{nodeType.label}</span>
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={undo}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.textMuted }}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.textMuted }}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </button>
            <div className="w-px h-6 mx-2" style={{ background: colors.border }} />
            <button
              onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.textMuted }}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-sm" style={{ color: colors.textMuted }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.textMuted }}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-px h-6 mx-2" style={{ background: colors.border }} />
            <button
              onClick={exportMap}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.textMuted }}
            >
              <Download className="w-4 h-4" />
            </button>
            <label className="p-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer">
              <Upload className="w-4 h-4" style={{ color: colors.textMuted }} />
              <input type="file" accept=".json" className="hidden" onChange={importMap} />
            </label>
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="relative rounded-xl overflow-hidden"
          style={{ 
            background: colors.background,
            border: `1px solid ${colors.border}`,
            height: 'calc(100vh - 320px)',
            minHeight: '500px'
          }}
          onClick={() => setSelectedNode(null)}
        >
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(${colors.border} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              transform: `scale(${zoom})`,
              transformOrigin: 'top left'
            }}
          />

          {/* Nodes */}
          <div 
            style={{ 
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'top left'
            }}
          >
            {nodes.map(node => (
              <MindMapNodeComponent
                key={node.id}
                node={node}
                isSelected={selectedNode === node.id}
                onSelect={() => setSelectedNode(node.id)}
                onUpdate={(updates) => updateNode(node.id, updates)}
                onDelete={() => deleteNode(node.id)}
                onDragStart={(e) => handleDragStart(node.id, e)}
                colors={colors}
              />
            ))}
          </div>

          {/* Empty state */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: `${colors.primary}20` }}
              >
                <Plus className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                Start Building
              </h3>
              <p className="text-sm text-center max-w-xs" style={{ color: colors.textMuted }}>
                Click the buttons above to add elements and start designing your frontend visually
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div 
          className="mt-4 p-4 rounded-xl"
          style={{ background: `${colors.primary}10`, border: `1px solid ${colors.primary}30` }}
        >
          <p className="text-sm" style={{ color: colors.text }}>
            <strong>How to use:</strong> Click elements in the toolbar to add them to the canvas. 
            Drag to reposition, double-click text to edit, and click the X to delete. 
            Export your design as JSON to share with our team.
          </p>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

const pastelColors = [
  '#e879a9', '#f4a574', '#f0d878', '#7dd3a8', 
  '#7ec8d8', '#7ba3d8', '#a78bcc', '#c9a0c9'
]

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  color: string
  size: number
  pulseOffset: number
  layer: number
}

function EuphoricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const nodeCount = 60
      nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
        const layer = Math.floor(i / 20)
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
          size: 2 + Math.random() * 2,
          pulseOffset: Math.random() * Math.PI * 2,
          layer
        }
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const connectionDistance = 180
    const maxConnections = 4

    const animate = () => {
      timeRef.current += 0.008
      
      ctx.fillStyle = 'rgba(10, 10, 18, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodesRef.current.forEach(node => {
        const waveX = Math.sin(timeRef.current * 0.3 + node.pulseOffset) * 40
        const waveY = Math.cos(timeRef.current * 0.25 + node.pulseOffset * 1.3) * 30
        
        node.baseX += node.vx
        node.baseY += node.vy
        
        if (node.baseX < -50) node.baseX = canvas.width + 50
        if (node.baseX > canvas.width + 50) node.baseX = -50
        if (node.baseY < -50) node.baseY = canvas.height + 50
        if (node.baseY > canvas.height + 50) node.baseY = -50
        
        node.x = node.baseX + waveX
        node.y = node.baseY + waveY
      })

      for (let layer = 0; layer < 3; layer++) {
        const layerNodes = nodesRef.current.filter(n => n.layer === layer)
        const layerOpacity = 0.15 + layer * 0.1
        
        layerNodes.forEach(node => {
          let connections = 0
          layerNodes.forEach(other => {
            if (node === other || connections >= maxConnections) return
            
            const dx = other.x - node.x
            const dy = other.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < connectionDistance) {
              connections++
              const opacity = (1 - distance / connectionDistance) * layerOpacity
              
              const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y)
              gradient.addColorStop(0, node.color)
              gradient.addColorStop(1, other.color)
              
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              
              const midX = (node.x + other.x) / 2
              const midY = (node.y + other.y) / 2
              const curveOffset = Math.sin(timeRef.current + node.pulseOffset) * 15
              
              ctx.quadraticCurveTo(midX + curveOffset, midY - curveOffset, other.x, other.y)
              
              ctx.strokeStyle = gradient
              ctx.lineWidth = 0.5
              ctx.globalAlpha = opacity
              ctx.stroke()
            }
          })
        })
        
        layerNodes.forEach(node => {
          const pulse = Math.sin(timeRef.current * 2 + node.pulseOffset) * 0.3 + 0.7
          const size = node.size * pulse
          
          ctx.beginPath()
          ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2)
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3)
          glowGradient.addColorStop(0, node.color + '40')
          glowGradient.addColorStop(1, 'transparent')
          ctx.fillStyle = glowGradient
          ctx.globalAlpha = layerOpacity * 0.8
          ctx.fill()
          
          ctx.beginPath()
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
          ctx.fillStyle = node.color
          ctx.globalAlpha = layerOpacity + 0.2
          ctx.fill()
        })
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #08080f 0%, #0a0812 50%, #080a10 100%)' }}
    />
  )
}

function FlowingWaves() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full opacity-[0.03]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e879a9" />
            <stop offset="50%" stopColor="#7ec8d8" />
            <stop offset="100%" stopColor="#a78bcc" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M0,${200 + i * 150} Q${250 + i * 50},${150 + i * 100} 500,${200 + i * 150} T1000,${200 + i * 150} T1500,${200 + i * 150} T2000,${200 + i * 150}`}
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="1"
            style={{
              animation: `flowWave ${20 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </svg>
      
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${300 + i * 100}px`,
            height: `${300 + i * 100}px`,
            background: `radial-gradient(circle, ${pastelColors[i]}15 0%, transparent 70%)`,
            left: `${(i * 20) - 10}%`,
            top: `${(i * 15)}%`,
            animation: `gentleDrift ${30 + i * 10}s ease-in-out infinite`,
            animationDelay: `${i * 3}s`,
            filter: 'blur(40px)'
          }}
        />
      ))}
    </div>
  )
}

function SubtleGrid() {
  return (
    <div 
      className="fixed inset-0 -z-8 pointer-events-none opacity-[0.02]"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(167, 139, 204, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <EuphoricBackground />
      <FlowingWaves />
      <SubtleGrid />
      <style>{`
        @keyframes flowWave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-50px) translateY(20px); }
        }
        @keyframes gentleDrift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          33% { transform: translate(30px, -20px) scale(1.05); opacity: 0.7; }
          66% { transform: translate(-20px, 30px) scale(0.95); opacity: 0.6; }
        }
      `}</style>
    </>
  )
}

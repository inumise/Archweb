import { useEffect, useRef, useState } from 'react'

const rainbowColors = [
  '#e879a9', '#f4a574', '#f0d878', '#7dd3a8', 
  '#7ec8d8', '#7ba3d8', '#a78bcc', '#c9a0c9'
]

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  color: string
  size: number
}

interface Shape {
  x: number
  y: number
  z: number
  rotationX: number
  rotationY: number
  rotationZ: number
  rotationSpeedX: number
  rotationSpeedY: number
  rotationSpeedZ: number
  scale: number
  color: string
  type: 'cube' | 'pyramid' | 'octahedron' | 'diamond'
  floatOffset: number
  floatSpeed: number
}

function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const shapesRef = useRef<Shape[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particleCount = 200
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 2,
      color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
      size: Math.random() * 3 + 1
    }))

    const shapeCount = 25
    shapesRef.current = Array.from({ length: shapeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 800 + 200,
      rotationX: Math.random() * Math.PI * 2,
      rotationY: Math.random() * Math.PI * 2,
      rotationZ: Math.random() * Math.PI * 2,
      rotationSpeedX: (Math.random() - 0.5) * 0.02,
      rotationSpeedY: (Math.random() - 0.5) * 0.02,
      rotationSpeedZ: (Math.random() - 0.5) * 0.01,
      scale: Math.random() * 40 + 20,
      color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
      type: ['cube', 'pyramid', 'octahedron', 'diamond'][Math.floor(Math.random() * 4)] as Shape['type'],
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: Math.random() * 0.02 + 0.01
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const project = (x: number, y: number, z: number) => {
      const fov = 500
      const scale = fov / (fov + z)
      return {
        x: (x - canvas.width / 2) * scale + canvas.width / 2,
        y: (y - canvas.height / 2) * scale + canvas.height / 2,
        scale
      }
    }

    const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
      let x1 = x, y1 = y, z1 = z
      
      let cosA = Math.cos(rx), sinA = Math.sin(rx)
      let y2 = y1 * cosA - z1 * sinA
      let z2 = y1 * sinA + z1 * cosA
      y1 = y2; z1 = z2
      
      cosA = Math.cos(ry); sinA = Math.sin(ry)
      let x2 = x1 * cosA + z1 * sinA
      z2 = -x1 * sinA + z1 * cosA
      x1 = x2; z1 = z2
      
      cosA = Math.cos(rz); sinA = Math.sin(rz)
      x2 = x1 * cosA - y1 * sinA
      y2 = x1 * sinA + y1 * cosA
      
      return { x: x2, y: y2, z: z1 }
    }

    const drawShape = (shape: Shape) => {
      const floatY = Math.sin(timeRef.current * shape.floatSpeed + shape.floatOffset) * 30
      const baseX = shape.x + (mouseRef.current.x - canvas.width / 2) * 0.02
      const baseY = shape.y + floatY + (mouseRef.current.y - canvas.height / 2) * 0.02

      let vertices: { x: number; y: number; z: number }[] = []
      let edges: [number, number][] = []

      const s = shape.scale

      switch (shape.type) {
        case 'cube':
          vertices = [
            { x: -s, y: -s, z: -s }, { x: s, y: -s, z: -s },
            { x: s, y: s, z: -s }, { x: -s, y: s, z: -s },
            { x: -s, y: -s, z: s }, { x: s, y: -s, z: s },
            { x: s, y: s, z: s }, { x: -s, y: s, z: s }
          ]
          edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
          break
        case 'pyramid':
          vertices = [
            { x: 0, y: -s, z: 0 },
            { x: -s, y: s, z: -s }, { x: s, y: s, z: -s },
            { x: s, y: s, z: s }, { x: -s, y: s, z: s }
          ]
          edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,4],[4,1]]
          break
        case 'octahedron':
          vertices = [
            { x: 0, y: -s, z: 0 }, { x: 0, y: s, z: 0 },
            { x: -s, y: 0, z: 0 }, { x: s, y: 0, z: 0 },
            { x: 0, y: 0, z: -s }, { x: 0, y: 0, z: s }
          ]
          edges = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]]
          break
        case 'diamond':
          vertices = [
            { x: 0, y: -s * 1.5, z: 0 }, { x: 0, y: s * 0.5, z: 0 },
            { x: -s * 0.7, y: 0, z: -s * 0.7 }, { x: s * 0.7, y: 0, z: -s * 0.7 },
            { x: s * 0.7, y: 0, z: s * 0.7 }, { x: -s * 0.7, y: 0, z: s * 0.7 }
          ]
          edges = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,3],[3,4],[4,5],[5,2]]
          break
      }

      const rotatedVertices = vertices.map(v => 
        rotatePoint(v.x, v.y, v.z, shape.rotationX, shape.rotationY, shape.rotationZ)
      )

      const projectedVertices = rotatedVertices.map(v => 
        project(baseX + v.x, baseY + v.y, shape.z + v.z)
      )

      const avgScale = projectedVertices.reduce((sum, v) => sum + v.scale, 0) / projectedVertices.length
      const alpha = Math.min(1, avgScale * 1.5)

      ctx.strokeStyle = shape.color
      ctx.lineWidth = Math.max(1, avgScale * 2)
      ctx.globalAlpha = alpha * 0.7

      ctx.shadowColor = shape.color
      ctx.shadowBlur = 15

      edges.forEach(([i, j]) => {
        ctx.beginPath()
        ctx.moveTo(projectedVertices[i].x, projectedVertices[i].y)
        ctx.lineTo(projectedVertices[j].x, projectedVertices[j].y)
        ctx.stroke()
      })

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    const animate = () => {
      timeRef.current += 0.016
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        const projected = project(particle.x, particle.y, particle.z)
        const size = particle.size * projected.scale

        ctx.beginPath()
        ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = projected.scale
        ctx.fill()
        ctx.globalAlpha = 1
      })

      shapesRef.current.sort((a, b) => b.z - a.z)

      shapesRef.current.forEach(shape => {
        shape.rotationX += shape.rotationSpeedX
        shape.rotationY += shape.rotationSpeedY
        shape.rotationZ += shape.rotationSpeedZ
        drawShape(shape)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #0a0a12 0%, #0d0a18 50%, #0a0d14 100%)' }}
    />
  )
}

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl animate-pulse"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            background: `radial-gradient(circle, ${rainbowColors[i]}40 0%, transparent 70%)`,
            left: `${10 + (i * 12)}%`,
            top: `${10 + (i * 10)}%`,
            animation: `float ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}

function GridOverlay() {
  return (
    <div 
      className="fixed inset-0 -z-8 pointer-events-none opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        perspective: '1000px',
        transform: 'rotateX(60deg)',
        transformOrigin: 'center top',
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
      <CanvasBackground />
      <FloatingOrbs />
      <GridOverlay />
    </>
  )
}

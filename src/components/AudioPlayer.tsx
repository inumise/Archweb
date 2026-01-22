import { useState, useEffect, useRef, useCallback } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'

// Sahara-inspired scale frequencies - A minor pentatonic with Middle Eastern flavor
// These frequencies trigger dopamine through universally pleasing intervals
const SCALE_FREQUENCIES = [
  110.00,  // A2 - deep foundation
  130.81,  // C3
  146.83,  // D3
  164.81,  // E3
  196.00,  // G3
  220.00,  // A3
  261.63,  // C4
  293.66,  // D4
  329.63,  // E4
  392.00,  // G4
  440.00,  // A4
  523.25,  // C5
  587.33,  // D5
  659.25,  // E5
  783.99,  // G5
  880.00,  // A5 - ethereal high
]

// Harp arpeggio patterns - designed for emotional impact
const HARP_PATTERNS = [
  [0, 4, 7, 10, 12, 10, 7, 4],      // Rising hope
  [2, 5, 9, 12, 14, 12, 9, 5],      // Ascending journey
  [0, 3, 7, 10, 14, 10, 7, 3],      // Power and grace
  [1, 5, 8, 11, 13, 11, 8, 5],      // Desert wind
  [0, 7, 10, 12, 15, 12, 10, 7],    // Vast horizons
]

// Binaural beat frequencies for brain entrainment
const BINAURAL = {
  alpha: 10,    // 10Hz - relaxation, creativity, openness
  theta: 6,     // 6Hz - deep meditation, insight
  beta: 15,     // 15Hz - focus, alertness
}

interface AudioPlayerProps {
  isControlled?: boolean
  onClose?: () => void
}

export default function AudioPlayer({ isControlled = false, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPrompt, setShowPrompt] = useState(!isControlled)
  const [intensity, setIntensity] = useState(0)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const compressorRef = useRef<DynamicsCompressorNode | null>(null)
  const pannerRef = useRef<StereoPannerNode | null>(null)
  const convolverRef = useRef<ConvolverNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainsRef = useRef<GainNode[]>([])
  const harpTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const padTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const spatialAnimationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const intensityIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Create spacious reverb impulse - Sahara vastness
  const createReverbImpulse = useCallback((context: AudioContext, duration: number, decay: number) => {
    const sampleRate = context.sampleRate
    const length = sampleRate * duration
    const impulse = context.createBuffer(2, length, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        // Create rich, diffuse reverb tail
        const envelope = Math.pow(1 - i / length, decay)
        const noise = (Math.random() * 2 - 1)
        // Add subtle modulation for more organic feel
        const modulation = 1 + 0.1 * Math.sin(i / sampleRate * 2 * Math.PI * 0.5)
        channelData[i] = noise * envelope * modulation
      }
    }
    return impulse
  }, [])

  // Create a harp-like plucked string sound with rich harmonics
  const playHarpNote = useCallback((frequency: number, time: number, duration: number, velocity: number = 1) => {
    if (!audioContextRef.current || !pannerRef.current) return
    
    const ctx = audioContextRef.current
    const now = ctx.currentTime + time
    
    // Fundamental oscillator
    const osc1 = ctx.createOscillator()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(frequency, now)
    
    // 2nd harmonic - adds brightness
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(frequency * 2, now)
    
    // 3rd harmonic - adds character
    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.setValueAtTime(frequency * 3, now)
    
    // 4th harmonic - shimmer
    const osc4 = ctx.createOscillator()
    osc4.type = 'sine'
    osc4.frequency.setValueAtTime(frequency * 4, now)
    
    // Main envelope - plucked string decay
    const env1 = ctx.createGain()
    env1.gain.setValueAtTime(0, now)
    env1.gain.linearRampToValueAtTime(0.12 * velocity, now + 0.008)
    env1.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    
    // Harmonic envelopes - decay faster for realism
    const env2 = ctx.createGain()
    env2.gain.setValueAtTime(0, now)
    env2.gain.linearRampToValueAtTime(0.04 * velocity, now + 0.005)
    env2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6)
    
    const env3 = ctx.createGain()
    env3.gain.setValueAtTime(0, now)
    env3.gain.linearRampToValueAtTime(0.02 * velocity, now + 0.003)
    env3.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4)
    
    const env4 = ctx.createGain()
    env4.gain.setValueAtTime(0, now)
    env4.gain.linearRampToValueAtTime(0.01 * velocity, now + 0.002)
    env4.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.25)
    
    // Lowpass filter - warmth and natural decay
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(4000, now)
    filter.frequency.exponentialRampToValueAtTime(800, now + duration * 0.5)
    filter.Q.value = 0.7
    
    // Highpass to remove mud
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 80
    
    // Connect oscillators to envelopes
    osc1.connect(env1)
    osc2.connect(env2)
    osc3.connect(env3)
    osc4.connect(env4)
    
    // Mix and filter
    const mixer = ctx.createGain()
    mixer.gain.value = 1
    env1.connect(mixer)
    env2.connect(mixer)
    env3.connect(mixer)
    env4.connect(mixer)
    
    mixer.connect(filter)
    filter.connect(highpass)
    highpass.connect(pannerRef.current)
    
    // Start and schedule stop
    osc1.start(now)
    osc2.start(now)
    osc3.start(now)
    osc4.start(now)
    
    const stopTime = now + duration + 0.1
    osc1.stop(stopTime)
    osc2.stop(stopTime)
    osc3.stop(stopTime)
    osc4.stop(stopTime)
  }, [])

  // Play emotional harp arpeggio
  const playHarpArpeggio = useCallback(() => {
    if (!isPlaying) return
    
    const pattern = HARP_PATTERNS[Math.floor(Math.random() * HARP_PATTERNS.length)]
    const noteDelay = 0.12 + Math.random() * 0.08 // Slightly varied timing
    const noteDuration = 2.5 + Math.random() * 1.5
    const baseVelocity = 0.7 + Math.random() * 0.3
    
    pattern.forEach((noteIndex, i) => {
      if (noteIndex < SCALE_FREQUENCIES.length) {
        const frequency = SCALE_FREQUENCIES[noteIndex]
        // Velocity curve - louder in middle for emotional arc
        const velocityCurve = Math.sin((i / pattern.length) * Math.PI)
        const velocity = baseVelocity * (0.6 + velocityCurve * 0.4)
        playHarpNote(frequency, i * noteDelay, noteDuration, velocity)
      }
    })
    
    // Schedule next arpeggio with natural variation
    const nextDelay = 5000 + Math.random() * 7000
    harpTimeoutRef.current = setTimeout(playHarpArpeggio, nextDelay)
  }, [isPlaying, playHarpNote])

  // Create evolving ambient pad
  const createEvolvingPad = useCallback((baseFreq: number, duration: number) => {
    if (!audioContextRef.current || !convolverRef.current) return
    
    const ctx = audioContextRef.current
    const now = ctx.currentTime
    
    // Multiple detuned oscillators for rich pad sound
    const oscs: OscillatorNode[] = []
    const gains: GainNode[] = []
    
    const detunes = [-12, -5, 0, 5, 12] // Slight detuning for chorus effect
    
    detunes.forEach((detune, i) => {
      const osc = ctx.createOscillator()
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = baseFreq
      osc.detune.value = detune
      
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.015, now + duration * 0.3)
      gain.gain.linearRampToValueAtTime(0.012, now + duration * 0.7)
      gain.gain.linearRampToValueAtTime(0, now + duration)
      
      osc.connect(gain)
      gain.connect(convolverRef.current!)
      
      osc.start(now)
      osc.stop(now + duration + 0.5)
      
      oscs.push(osc)
      gains.push(gain)
    })
    
    oscillatorsRef.current.push(...oscs)
    gainsRef.current.push(...gains)
  }, [])

  // Schedule evolving pads
  const schedulePads = useCallback(() => {
    if (!isPlaying) return
    
    // Choose a root note from the scale
    const rootIndex = Math.floor(Math.random() * 6) // Lower notes for pads
    const rootFreq = SCALE_FREQUENCIES[rootIndex]
    
    // Create pad with the root
    createEvolvingPad(rootFreq, 12 + Math.random() * 8)
    
    // Sometimes add a fifth above for richness
    if (Math.random() > 0.5) {
      setTimeout(() => {
        createEvolvingPad(rootFreq * 1.5, 10 + Math.random() * 6)
      }, 2000 + Math.random() * 3000)
    }
    
    // Schedule next pad
    padTimeoutRef.current = setTimeout(schedulePads, 8000 + Math.random() * 6000)
  }, [isPlaying, createEvolvingPad])

  // Create deep bass drone for power and physical impact
  const createBassDrone = useCallback(() => {
    if (!audioContextRef.current || !pannerRef.current) return
    
    const ctx = audioContextRef.current
    
    // Sub-bass - felt more than heard, creates physical impact
    const subBass = ctx.createOscillator()
    subBass.type = 'sine'
    subBass.frequency.value = 36.71 // D1 - very deep
    
    const subGain = ctx.createGain()
    subGain.gain.value = 0.08
    
    // Main bass drone
    const bass1 = ctx.createOscillator()
    bass1.type = 'sine'
    bass1.frequency.value = 55 // A1
    
    const bass1Gain = ctx.createGain()
    bass1Gain.gain.value = 0.06
    
    // Octave above for warmth
    const bass2 = ctx.createOscillator()
    bass2.type = 'triangle'
    bass2.frequency.value = 110 // A2
    
    const bass2Gain = ctx.createGain()
    bass2Gain.gain.value = 0.03
    
    // LFO for subtle movement
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.05 // Very slow
    
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 2 // Subtle pitch variation
    
    lfo.connect(lfoGain)
    lfoGain.connect(bass1.frequency)
    lfoGain.connect(bass2.frequency)
    
    // Lowpass filter for warmth
    const bassFilter = ctx.createBiquadFilter()
    bassFilter.type = 'lowpass'
    bassFilter.frequency.value = 150
    bassFilter.Q.value = 0.5
    
    // Connect
    subBass.connect(subGain)
    bass1.connect(bass1Gain)
    bass2.connect(bass2Gain)
    
    subGain.connect(bassFilter)
    bass1Gain.connect(bassFilter)
    bass2Gain.connect(bassFilter)
    
    bassFilter.connect(pannerRef.current)
    
    // Start
    subBass.start()
    bass1.start()
    bass2.start()
    lfo.start()
    
    oscillatorsRef.current.push(subBass, bass1, bass2, lfo)
    gainsRef.current.push(subGain, bass1Gain, bass2Gain)
  }, [])

  // Create binaural beats for brain entrainment (alpha waves for openness)
  const createBinauralBeats = useCallback(() => {
    if (!audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Base frequency
    const baseFreq = 200
    
    // Left ear oscillator
    const oscLeft = ctx.createOscillator()
    oscLeft.type = 'sine'
    oscLeft.frequency.value = baseFreq
    
    // Right ear oscillator - slightly different frequency creates binaural beat
    const oscRight = ctx.createOscillator()
    oscRight.type = 'sine'
    oscRight.frequency.value = baseFreq + BINAURAL.alpha // 10Hz difference = alpha waves
    
    // Create stereo panner for each
    const panLeft = ctx.createStereoPanner()
    panLeft.pan.value = -1
    
    const panRight = ctx.createStereoPanner()
    panRight.pan.value = 1
    
    // Very subtle volume - should be barely perceptible
    const gainLeft = ctx.createGain()
    gainLeft.gain.value = 0.015
    
    const gainRight = ctx.createGain()
    gainRight.gain.value = 0.015
    
    // Connect
    oscLeft.connect(gainLeft)
    gainLeft.connect(panLeft)
    panLeft.connect(masterGainRef.current!)
    
    oscRight.connect(gainRight)
    gainRight.connect(panRight)
    panRight.connect(masterGainRef.current!)
    
    // Start
    oscLeft.start()
    oscRight.start()
    
    oscillatorsRef.current.push(oscLeft, oscRight)
    gainsRef.current.push(gainLeft, gainRight)
  }, [])

  // Create high ethereal tones for hope and future
  const createEtherealTones = useCallback(() => {
    if (!audioContextRef.current || !convolverRef.current) return
    
    const ctx = audioContextRef.current
    
    // High shimmering tone
    const high1 = ctx.createOscillator()
    high1.type = 'sine'
    high1.frequency.value = 880 // A5
    
    const high2 = ctx.createOscillator()
    high2.type = 'sine'
    high2.frequency.value = 1318.51 // E6
    
    // Very slow LFO for gentle movement
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08
    
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 3
    
    lfo.connect(lfoGain)
    lfoGain.connect(high1.frequency)
    lfoGain.connect(high2.frequency)
    
    // Subtle gains
    const gain1 = ctx.createGain()
    gain1.gain.value = 0.008
    
    const gain2 = ctx.createGain()
    gain2.gain.value = 0.005
    
    // Highpass to keep it airy
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 600
    
    // Connect through reverb for spaciousness
    high1.connect(gain1)
    high2.connect(gain2)
    gain1.connect(highpass)
    gain2.connect(highpass)
    highpass.connect(convolverRef.current)
    
    // Start
    high1.start()
    high2.start()
    lfo.start()
    
    oscillatorsRef.current.push(high1, high2, lfo)
    gainsRef.current.push(gain1, gain2)
  }, [])

  // 5D spatial audio animation - immersive spinning sound field
  const updateSpatialAudio = useCallback(() => {
    if (!audioContextRef.current || !isPlaying) return
    
    const time = (Date.now() - startTimeRef.current) / 1000
    
    // Complex multi-layered panning for true 5D effect
    const pan1 = Math.sin(time * 0.15) * 0.5          // Slow wide sweep
    const pan2 = Math.cos(time * 0.23) * 0.3          // Medium counter-sweep
    const pan3 = Math.sin(time * 0.07) * 0.2          // Very slow drift
    const combinedPan = Math.tanh(pan1 + pan2 + pan3) // Soft limiting
    
    if (pannerRef.current) {
      pannerRef.current.pan.setValueAtTime(combinedPan, audioContextRef.current.currentTime)
    }
    
    // Subtle master volume breathing for organic feel
    if (masterGainRef.current) {
      const breath1 = Math.sin(time * 0.1) * 0.05
      const breath2 = Math.sin(time * 0.067) * 0.03
      const volumeMod = 1 + breath1 + breath2
      masterGainRef.current.gain.setValueAtTime(0.7 * volumeMod, audioContextRef.current.currentTime)
    }
    
    spatialAnimationRef.current = requestAnimationFrame(updateSpatialAudio)
  }, [isPlaying])

  // Initialize complete audio system
  const initAudio = useCallback(async () => {
    if (audioContextRef.current) return
    
    try {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const ctx = audioContextRef.current
      
      // Master compressor for glue and punch
      compressorRef.current = ctx.createDynamicsCompressor()
      compressorRef.current.threshold.value = -24
      compressorRef.current.knee.value = 12
      compressorRef.current.ratio.value = 4
      compressorRef.current.attack.value = 0.003
      compressorRef.current.release.value = 0.25
      
      // Master gain
      masterGainRef.current = ctx.createGain()
      masterGainRef.current.gain.value = 0.7
      
      // Stereo panner for 5D spatial effect
      pannerRef.current = ctx.createStereoPanner()
      pannerRef.current.pan.value = 0
      
      // Convolver for lush reverb (Sahara vastness)
      convolverRef.current = ctx.createConvolver()
      convolverRef.current.buffer = createReverbImpulse(ctx, 5, 1.8)
      
      // Dry/wet mix
      const dryGain = ctx.createGain()
      dryGain.gain.value = 0.35
      
      const wetGain = ctx.createGain()
      wetGain.gain.value = 0.65
      
      // Signal flow:
      // Sources -> panner -> dry -> compressor -> master -> destination
      // Sources -> panner -> convolver -> wet -> compressor -> master -> destination
      pannerRef.current.connect(dryGain)
      pannerRef.current.connect(convolverRef.current)
      convolverRef.current.connect(wetGain)
      dryGain.connect(compressorRef.current)
      wetGain.connect(compressorRef.current)
      compressorRef.current.connect(masterGainRef.current)
      masterGainRef.current.connect(ctx.destination)
      
    } catch (error) {
      console.error('Audio initialization error:', error)
    }
  }, [createReverbImpulse])

  // Start the complete audio experience
  const startPlaying = useCallback(async () => {
    await initAudio()
    
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume()
    }
    
    startTimeRef.current = Date.now()
    
    // Create all audio layers
    createBassDrone()
    createBinauralBeats()
    createEtherealTones()
    
    // Start scheduled elements
    setTimeout(playHarpArpeggio, 1500)
    setTimeout(schedulePads, 3000)
    
    // Start spatial audio animation
    spatialAnimationRef.current = requestAnimationFrame(updateSpatialAudio)
    
    // Intensity animation for visual feedback
    intensityIntervalRef.current = setInterval(() => {
      setIntensity(Math.random() * 0.3 + 0.7)
    }, 100)
    
    setIsPlaying(true)
  }, [initAudio, createBassDrone, createBinauralBeats, createEtherealTones, playHarpArpeggio, schedulePads, updateSpatialAudio])

  // Stop all audio
  const stopPlaying = useCallback(() => {
    // Stop all oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop()
        osc.disconnect()
      } catch {
        // May already be stopped
      }
    })
    oscillatorsRef.current = []
    
    // Disconnect all gains
    gainsRef.current.forEach(gain => {
      try {
        gain.disconnect()
      } catch {
        // May already be disconnected
      }
    })
    gainsRef.current = []
    
    // Clear timeouts
    if (harpTimeoutRef.current) {
      clearTimeout(harpTimeoutRef.current)
      harpTimeoutRef.current = null
    }
    if (padTimeoutRef.current) {
      clearTimeout(padTimeoutRef.current)
      padTimeoutRef.current = null
    }
    if (intensityIntervalRef.current) {
      clearInterval(intensityIntervalRef.current)
      intensityIntervalRef.current = null
    }
    
    // Stop spatial animation
    cancelAnimationFrame(spatialAnimationRef.current)
    
    setIsPlaying(false)
    setIntensity(0)
  }, [])

  // Toggle play/pause
  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      stopPlaying()
    } else {
      await startPlaying()
    }
    setShowPrompt(false)
  }, [isPlaying, startPlaying, stopPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlaying()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopPlaying])

  // If controlled, render compact panel instead of floating button
  if (isControlled) {
    return (
      <div
        className="fixed bottom-6 left-6 z-50"
        style={{
          width: '320px',
          maxWidth: 'calc(100vw - 48px)',
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(232, 121, 169, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{
            background: 'rgba(20, 20, 30, 0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, rgba(232, 121, 169, 0.25), rgba(126, 200, 216, 0.25))' }}
            >
              <Music className="w-5 h-5 text-white" />
              {isPlaying && (
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232, 121, 169, 0.3), rgba(126, 200, 216, 0.3))',
                    animation: 'promptPulse 2s ease-in-out infinite'
                  }}
                />
              )}
            </div>
            <div>
              <p className="font-medium text-white">Sahara Soundscape</p>
              <p className="text-xs text-white/50">5D Spatial Audio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-white/10"
          >
            <span className="text-white/50 text-xl">&times;</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-white/70 text-sm mb-4">
            Immersive ambient with harp arpeggios, deep bass power, and binaural brain entrainment
          </p>
          
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110"
            style={{
              background: isPlaying 
                ? 'linear-gradient(135deg, rgba(232, 121, 169, 0.4), rgba(126, 200, 216, 0.4))'
                : 'linear-gradient(135deg, rgba(232, 121, 169, 0.2), rgba(126, 200, 216, 0.2))',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: isPlaying ? `0 0 30px rgba(232, 121, 169, ${0.3 + intensity * 0.3})` : 'none'
            }}
          >
            {isPlaying ? (
              <Volume2 
                className="w-8 h-8 text-white" 
                style={{ filter: `drop-shadow(0 0 ${intensity * 10}px rgba(126, 200, 216, 0.8))` }}
              />
            ) : (
              <VolumeX className="w-8 h-8 text-white/60" />
            )}
          </button>
          
          <p className="text-white/40 text-xs">
            {isPlaying ? 'Playing - Click to pause' : 'Click to play'}
          </p>
          
          <p className="text-white/30 text-xs mt-3">
            Best with headphones
          </p>
        </div>

        {/* CSS animations */}
        <style>{`
          @keyframes promptPulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      {/* Floating audio control button with reactive visualization */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
      >
        <div className="relative">
          {/* Reactive glow based on audio intensity */}
          <div 
            className={`absolute -inset-3 rounded-full blur-lg transition-all duration-150 ${
              isPlaying ? 'opacity-70' : 'opacity-0 group-hover:opacity-40'
            }`}
            style={{
              background: `linear-gradient(135deg, #e879a9, #7ec8d8, #a78bcc)`,
              transform: `scale(${isPlaying ? 1 + intensity * 0.3 : 1})`
            }}
          />
          
          {/* Button */}
          <div className="relative glass-strong rounded-full p-4 thin-rainbow-border transition-transform duration-300 group-hover:scale-110">
            {isPlaying ? (
              <Volume2 
                className="w-6 h-6 text-white" 
                style={{ 
                  filter: `drop-shadow(0 0 ${intensity * 10}px rgba(126, 200, 216, 0.8))` 
                }}
              />
            ) : (
              <VolumeX className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
            )}
          </div>
          
          {/* 5D spinning rings visualization */}
          {isPlaying && (
            <>
              <div 
                className="absolute inset-0 rounded-full border border-pink-400/30 pointer-events-none"
                style={{
                  animation: 'audioRing1 4s linear infinite',
                  transformOrigin: 'center center'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full border border-cyan-400/20 pointer-events-none"
                style={{
                  animation: 'audioRing2 6s linear infinite reverse',
                  transformOrigin: 'center center'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full border border-purple-400/15 pointer-events-none"
                style={{
                  animation: 'audioRing3 8s linear infinite',
                  transformOrigin: 'center center'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"
                style={{
                  animation: 'audioRing4 10s linear infinite reverse',
                  transformOrigin: 'center center'
                }}
              />
            </>
          )}
        </div>
      </button>

      {/* Immersive initial prompt overlay */}
      {showPrompt && !isPlaying && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="glass-strong rounded-3xl p-10 thin-rainbow-border text-center max-w-lg mx-4 transform transition-all duration-500 hover:scale-105">
            {/* Animated icon */}
            <div 
              className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 121, 169, 0.25), rgba(126, 200, 216, 0.25), rgba(167, 139, 204, 0.25))'
              }}
            >
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 121, 169, 0.3), rgba(126, 200, 216, 0.3))',
                  animation: 'promptPulse 2s ease-in-out infinite'
                }}
              />
              <Music className="w-12 h-12 text-white relative z-10" />
            </div>
            
            <h3 className="text-3xl font-bold orbitron mb-4 rainbow-text">
              Sahara Soundscape
            </h3>
            
            <p className="text-white/70 mb-3 text-lg">
              Immersive 5D Spatial Audio Experience
            </p>
            
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Modern ambient with harp arpeggios, deep bass power,<br />
              ethereal hope, and binaural brain entrainment
            </p>
            
            <div 
              className="inline-block px-8 py-3 rounded-full text-sm font-medium"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 121, 169, 0.3), rgba(126, 200, 216, 0.3))',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <span className="text-white">Click anywhere to begin</span>
            </div>
            
            <p className="text-white/30 text-xs mt-6">
              Best experienced with headphones for full 5D effect
            </p>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes audioRing1 {
          0% { transform: rotate(0deg) scale(1.6); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: rotate(360deg) scale(1.6); opacity: 0.3; }
        }
        @keyframes audioRing2 {
          0% { transform: rotate(0deg) scale(2); opacity: 0.2; }
          50% { opacity: 0.35; }
          100% { transform: rotate(-360deg) scale(2); opacity: 0.2; }
        }
        @keyframes audioRing3 {
          0% { transform: rotate(0deg) scale(2.5); opacity: 0.15; }
          50% { opacity: 0.25; }
          100% { transform: rotate(360deg) scale(2.5); opacity: 0.15; }
        }
        @keyframes audioRing4 {
          0% { transform: rotate(0deg) scale(3); opacity: 0.1; }
          50% { opacity: 0.18; }
          100% { transform: rotate(-360deg) scale(3); opacity: 0.1; }
        }
        @keyframes promptPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </>
  )
}

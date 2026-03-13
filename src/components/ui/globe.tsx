import { useEffect, useRef, useState, useCallback } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring, motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

// ── Marker definitions with labels ──────────────────────────────────────────
const MARKERS: Array<{
  location: [number, number]
  size: number
  label: string
  country: string
  flag: string
}> = [
  
]

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: MARKERS.map(({ location, size }) => ({ location, size })),
}

// ── Convert lat/lng + current phi/theta → 2D canvas coords ──────────────────
// COBE renders: phi rotates globe left (west) when increasing — same as looking
// at a globe from outside and spinning it counter-clockwise from above.
// Verified convention by reading COBE's WebGL shader uniform layout.
function latLngToXY(
  lat: number,
  lng: number,
  phi: number,   // state.phi — same value passed to COBE's onRender
  theta: number, // config.theta
  size: number,  // canvas CSS pixel size (square)
): { x: number; y: number; visible: boolean } {
  // Negate lng to match COBE's left-handed screen X axis
  const λ = -(lng * Math.PI) / 180
  const φ =  (lat * Math.PI) / 180

  // Unit sphere
  const x =  Math.cos(φ) * Math.sin(λ)
  const y =  Math.sin(φ)
  const z =  Math.cos(φ) * Math.cos(λ)

  // Apply phi rotation (spin around Y axis) — no sign changes needed
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const x1 =  x * cosPhi + z * sinPhi
  const z1 = -x * sinPhi + z * cosPhi

  // Apply theta rotation (tilt around X axis)
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const y2 = y * cosT - z1 * sinT
  const z2 = y * sinT + z1 * cosT

  const visible = z2 > 0.02

  // COBE renders the sphere at ~95% of canvas half-width.
  // The additional -0.02 nudge corrects for the marker dot visual offset.
  const GLOBE_SCALE = 0.915
  const r = size / 2
  return {
    x: r + x1 * r * GLOBE_SCALE,
    y: r - y2 * r * GLOBE_SCALE,
    visible,
  }
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 })

  // Tag positions updated every animation frame
  const [tagPositions, setTagPositions] = useState<
    Array<{ x: number; y: number; visible: boolean }>
  >(MARKERS.map(() => ({ x: 0, y: 0, visible: false })))

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  // Compute tag positions from current phi + spring offset
  const computeTagPositions = useCallback(() => {
    const w = widthRef.current
    if (!w) return
    const currentPhi = phiRef.current + rs.get()
    const theta = config.theta ?? 0.3

    setTagPositions(
      MARKERS.map(({ location }) => {
        const { x, y, visible } = latLngToXY(
          location[0],
          location[1],
          currentPhi,
          theta,
          w
        )
        // Smooth opacity: fade in/out near the horizon
        return { x, y, visible }
      })
    )
  }, [rs, config.theta])

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
        computeTagPositions()
      },
    })

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    }, 0)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config, computeTagPositions])

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
      style={{ position: "relative" }}
    >
      {/* Globe canvas */}
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />

      {/* Floating location tags — absolutely positioned over canvas */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {MARKERS.map((marker, i) => {
          const pos = tagPositions[i]
          if (!pos) return null

          // pos.x / pos.y are already in CSS-pixel space (0 → widthRef.current)
          // We position the wrapper so its bottom-centre (the dot tip) lands on (x, y).
          // transform: translate(-50%, -100%) moves the element left by half its width
          // and up by its full height, so the bottom-centre = the anchor point.
          return (
            <motion.div
              key={marker.label}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                // bottom-centre of this element = (pos.x, pos.y)
                transform: "translate(-50%, -100%)",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              animate={{ opacity: pos.visible ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tag bubble */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "999px",
                  padding: "3px 10px 3px 6px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: "13px", lineHeight: 1 }}>{marker.flag}</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#111",
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {marker.label}
                </span>
              </div>
              {/* Stem line */}
              <div
                style={{
                  width: "1px",
                  height: "8px",
                  background: "rgba(251,100,21,0.7)",
                }}
              />
              {/* Dot — this is the anchor tip that should sit on the marker */}
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgb(251,100,21)",
                  boxShadow: "0 0 0 3px rgba(251,100,21,0.2)",
                  flexShrink: 0,
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
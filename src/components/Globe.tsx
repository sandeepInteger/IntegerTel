"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

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
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
    // Noida, India
    { location: [28.5355, 77.3910], size: 0.07 },
  ],
}

const NOIDA_LAT = 28.5355
const NOIDA_LNG = 77.3910

/**
 * Projects lat/lng → normalized {x, y} in [0..1] space matching COBE exactly.
 *
 * COBE coordinate system:
 *   Sphere: x = cos(lat)·sin(lng),  y = sin(lat),  z = cos(lat)·cos(lng)
 *   phi  = Y-axis spin.  Ry(phi): x' =  x·cos + z·sin,  z' = -x·sin + z·cos
 *   theta = X-axis tilt. Rx(theta): y' = y·cos - z·sin,  z' =  y·sin + z·cos
 *   Camera looks toward +z. Back-face cull when z ≤ 0.
 *
 * Returns null when the point is on the hidden hemisphere.
 * x=0 → left edge, x=1 → right edge (matches CSS left %)
 * y=0 → top  edge, y=1 → bottom edge (matches CSS top %)
 */
function projectLatLng(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
): { x: number; y: number } | null {
  const λ = (lng * Math.PI) / 180
  const φ = (lat * Math.PI) / 180

  // Cartesian point on unit sphere
  const x0 =  Math.cos(φ) * Math.sin(λ)
  const y0 =  Math.sin(φ)
  const z0 =  Math.cos(φ) * Math.cos(λ)

  // Ry(-phi) — COBE's actual convention: increasing phi spins the globe
  // such that the surface moves WESTWARD (phi negated in standard Ry matrix).
  // Derived by analysis: to center lng=L, phi must equal +L in radians.
  // This gives: x' = x·cos(phi) - z·sin(phi),  z' = x·sin(phi) + z·cos(phi)
  const cp = Math.cos(phi), sp = Math.sin(phi)
  const x1 =  x0 * cp - z0 * sp
  const y1 =  y0
  const z1 =  x0 * sp + z0 * cp

  // Rx(theta) — camera tilt
  const ct = Math.cos(theta), st = Math.sin(theta)
  const x2 =  x1
  const y2 =  y1 * ct - z1 * st
  const z2 =  y1 * st + z1 * ct

  // Back-face culling
  if (z2 <= 0) return null

  // Map to 0..1 screen space
  // x: center=0.5, right=+x direction
  // y: center=0.5, down=−y direction (CSS y increases downward)
  return {
    x: 0.5 + x2 * 0.5,
    y: 0.5 - y2 * 0.5,
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
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  // Normalized 0..1 — independent of container pixel size, so always accurate
  const [noidaNorm, setNoidaNorm] = useState<{ x: number; y: number } | null>(null)

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
      pointerInteracting.current = clientX
    }
  }

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

        // Project Noida to normalized coords — no pixel math, works at any size
        setNoidaNorm(
          projectLatLng(NOIDA_LAT, NOIDA_LNG, state.phi, config.theta ?? 0.3)
        )
      },
    })

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    }, 0)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    /*
     * BUG THAT WAS HERE: adding style={{position:'relative'}} on this div
     * overrides Tailwind's "absolute" class (inline styles win over utilities).
     * That broke the container layout, made offsetWidth unreliable, and caused
     * the label to anchor to the wrong coordinate origin.
     *
     * FIX: Keep this div exactly as original. Add a SIBLING overlay div
     * that is also absolute+inset-0, sharing the same bounding box.
     */
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      {/* Canvas */}
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
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />

      {/*
       * Overlay — absolute inset-0, sits above canvas.
       * Uses percentage left/top so it's pixel-size-agnostic and always aligned.
       */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        {noidaNorm && (
          <div
            style={{
              position: "absolute",
              left: `${noidaNorm.x * 100}%`,
              top: `${noidaNorm.y * 100}%`,
              // Shift so the bottom-center of the stem sits on the dot
              transform: "translate(-50%, calc(-100% - 12px))",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Pill label */}
            <div
              style={{
                background: "rgba(251, 100, 21, 0.95)",
                backdropFilter: "blur(6px)",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "sans-serif",
                letterSpacing: "0.08em",
                padding: "3px 10px",
                borderRadius: "20px",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 14px rgba(251,100,21,0.5)",
                border: "1px solid rgba(255,255,255,0.3)",
                lineHeight: 1.6,
              }}
            >
              📍 Noida
            </div>
            {/* Connector stem */}
            <div
              style={{
                width: "1.5px",
                height: "12px",
                background: "rgba(251, 100, 21, 0.8)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
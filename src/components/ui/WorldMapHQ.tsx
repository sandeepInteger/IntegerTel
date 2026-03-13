"use client"

import { useState, useRef } from "react"

// ── Types ────────────────────────────────────────────────────────────────────

interface Office {
  id: string
  city: string
  country: string
  flag: string
  type: string
  address: string
  phone: string
  lat: number
  lng: number
  image: string
  accent: string
}

interface Point {
  x: number
  y: number
}

// ── Data ─────────────────────────────────────────────────────────────────────

const OFFICES: Office[] = [
  {
    id: "plano",
    city: "Plano, TX",
    country: "United States",
    flag: "🇺🇸",
    type: "Main Headquarters",
    address: "5700 Tennyson Pkwy, Plano, TX 75024",
    phone: "+1 (469) 329-4411",
    lat: 32.9483,
    lng: -96.7299,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    accent: "#2563eb",
  },
  {
    id: "noida",
    city: "Noida",
    country: "India",
    flag: "🇮🇳",
    type: "Engineering Office",
    address: "Sector 62, Noida, UP 201309",
    phone: "+91 120 456 7890",
    lat: 28.5355,
    lng: 77.391,
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400&q=80",
    accent: "#0891b2",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    country: "India",
    flag: "🇮🇳",
    type: "Development Center",
    address: "HITEC City, Hyderabad 500081",
    phone: "+91 40 6789 0123",
    lat: 17.385,
    lng: 78.4867,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80",
    accent: "#7c3aed",
  },
  {
    id: "tirupati",
    city: "Tirupati",
    country: "India",
    flag: "🇮🇳",
    type: "Regional Office",
    address: "Mangalam Rd, Tirupati, AP 517501",
    phone: "+91 877 234 5678",
    lat: 13.6288,
    lng: 79.4192,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    accent: "#059669",
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Project lat/lng → SVG viewBox 0 0 800 400 */
function project(lat: number, lng: number): Point {
  return {
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  }
}

/** Rough land-mask dot grid for the world map background */
const WORLD_DOTS: Point[] = (() => {
  const dots: Point[] = []
  for (let lat = -80; lat <= 80; lat += 4) {
    for (let lng = -175; lng <= 175; lng += 4.5) {
      const onLand =
        (lat > 15  && lat < 72  && lng > -165 && lng < -50)  || // North America
        (lat > -55 && lat < 15  && lng > -82  && lng < -34)  || // South America
        (lat > 35  && lat < 72  && lng > -12  && lng < 45)   || // Europe
        (lat > -35 && lat < 38  && lng > -18  && lng < 52)   || // Africa
        (lat > 0   && lat < 75  && lng > 45   && lng < 145)  || // Asia
        (lat > -10 && lat < 25  && lng > 95   && lng < 145)  || // SE Asia
        (lat > -45 && lat < -10 && lng > 112  && lng < 155)     // Australia
      if (onLand) dots.push(project(lat, lng))
    }
  }
  return dots
})()

// ── Component ─────────────────────────────────────────────────────────────────

export default function WorldMapHQ() {
  const [selected, setSelected] = useState<string>("plano")
  const [hovered, setHovered]   = useState<string | null>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const handleSelect = (id: string): void => {
    setSelected(id)
    setTimeout(() => {
      const el = document.getElementById(`card-${id}`)
      if (el && cardsRef.current) {
        cardsRef.current.scrollTo({
          left: el.offsetLeft - cardsRef.current.offsetLeft - 24,
          behavior: "smooth",
        })
      }
    }, 50)
  }

  const activeOffice = OFFICES.find((o) => o.id === selected) ?? OFFICES[0]

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "48px 24px 64px",
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "999px",
            padding: "4px 14px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#2563eb",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#2563eb",
              display: "inline-block",
            }}
          />
          Global Presence
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 12px",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Our <span style={{ color: "#2563eb" }}>Offices</span> Worldwide
        </h1>

        <p style={{ fontSize: "16px", color: "#64748b", margin: 0, fontWeight: 400 }}>
          Click any dot on the map to explore our locations
        </p>
      </div>

      {/* ── Map ── */}
      <div
        style={{
          position: "relative",
          maxWidth: "900px",
          margin: "40px auto 0",
          borderRadius: "20px",
          overflow: "hidden",
          background: "white",
          boxShadow: "0 4px 40px rgba(0,0,0,0.07)",
          border: "1px solid #e2e8f0",
        }}
      >
        <svg viewBox="0 0 800 400" style={{ width: "100%", display: "block" }}>
          <rect width="800" height="400" fill="#f1f5f9" />

          {/* Background dots */}
          {WORLD_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="#cbd5e1" opacity="0.7" />
          ))}

          {/* Edge fades */}
          <defs>
            <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#f1f5f9" />
              <stop offset="15%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="85%"  stopColor="transparent" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
          <rect width="800" height="400" fill="url(#fadeTop)" />
          <rect width="800" height="400" fill="url(#fadeBottom)" />

          {/* Office markers */}
          {OFFICES.map((office) => {
            const pt         = project(office.lat, office.lng)
            const isSelected = selected === office.id
            const isHovered  = hovered  === office.id

            return (
              <g
                key={office.id}
                onClick={() => handleSelect(office.id)}
                onMouseEnter={() => setHovered(office.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Selected pulse rings */}
                {isSelected && (
                  <>
                    <circle cx={pt.x} cy={pt.y} r="14" fill={office.accent} opacity="0.12" />
                    <circle cx={pt.x} cy={pt.y} r="9"  fill={office.accent} opacity="0.20" />
                  </>
                )}

                {/* Hover ring */}
                {isHovered && !isSelected && (
                  <circle cx={pt.x} cy={pt.y} r="9" fill={office.accent} opacity="0.15" />
                )}

                {/* Main dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 6 : isHovered ? 5.5 : 5}
                  fill={isSelected || isHovered ? office.accent : "#94a3b8"}
                  style={{ transition: "all 0.2s" }}
                />
                <circle cx={pt.x} cy={pt.y} r="2.5" fill="white" />

                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={pt.x - 36}
                      y={pt.y - 30}
                      width="72"
                      height="20"
                      rx="4"
                      fill="#0f172a"
                      opacity="0.85"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 16}
                      textAnchor="middle"
                      fill="white"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="DM Sans, sans-serif"
                    >
                      {office.city}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Cards ── */}
      <div
        ref={cardsRef}
        style={{
          display: "flex",
          gap: "16px",
          maxWidth: "900px",
          margin: "28px auto 0",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "none",
        }}
      >
        {OFFICES.map((office) => {
          const isActive = selected === office.id
          return (
            <div
              id={`card-${office.id}`}
              key={office.id}
              onClick={() => handleSelect(office.id)}
              style={{
                minWidth: "220px",
                flex: "0 0 220px",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                border: isActive ? `2px solid ${office.accent}` : "2px solid #e2e8f0",
                background: "white",
                boxShadow: isActive
                  ? `0 8px 32px ${office.accent}28, 0 2px 8px rgba(0,0,0,0.06)`
                  : "0 2px 12px rgba(0,0,0,0.05)",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "120px", overflow: "hidden" }}>
                <img
                  src={office.image}
                  alt={office.city}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: isActive ? "none" : "grayscale(30%)",
                    transition: "filter 0.3s",
                  }}
                />
                {isActive && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: office.accent,
                        borderRadius: "999px",
                        padding: "3px 10px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "white",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      Selected
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to bottom, transparent 50%, ${office.accent}22)`,
                      }}
                    />
                  </>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: "14px 16px 16px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: isActive ? office.accent : "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: "4px",
                    transition: "color 0.2s",
                  }}
                >
                  {office.type}
                </div>

                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                    marginBottom: "2px",
                  }}
                >
                  {office.flag} {office.city}
                </div>

                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
                  {office.country}
                </div>

                {/* Expandable details */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isActive ? "80px" : "0px",
                    opacity: isActive ? 1 : 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#475569",
                      lineHeight: 1.5,
                      display: "flex",
                      gap: "6px",
                      alignItems: "flex-start",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ color: office.accent, flexShrink: 0, marginTop: "1px" }}>📍</span>
                    {office.address}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#475569",
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: office.accent }}>📞</span>
                    {office.phone}
                  </div>
                </div>

                {/* Accent bar */}
                <div
                  style={{
                    height: "3px",
                    borderRadius: "999px",
                    background: isActive ? office.accent : "#f1f5f9",
                    marginTop: "14px",
                    transition: "all 0.3s",
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Footer strip ── */}
      <div
        style={{
          maxWidth: "900px",
          margin: "20px auto 0",
          padding: "14px 20px",
          borderRadius: "12px",
          background: `linear-gradient(135deg, ${activeOffice.accent}10, ${activeOffice.accent}05)`,
          border: `1px solid ${activeOffice.accent}30`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: activeOffice.accent,
            flexShrink: 0,
            boxShadow: `0 0 0 3px ${activeOffice.accent}30`,
          }}
        />
        <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
          Viewing{" "}
          <strong style={{ color: activeOffice.accent }}>
            {activeOffice.city}, {activeOffice.country}
          </strong>{" "}
          — {activeOffice.type}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "11px",
            color: activeOffice.accent,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.03em",
          }}
        >
          GET DIRECTIONS →
        </span>
      </div>
    </div>
  )
}
"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface OfficePin {
  lat: number;
  lng: number;
  city: string;
  country: string;
  flag: string;
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  backgroundColor?: string;
  dotColor?: string;
  offices?: OfficePin[];
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  backgroundColor = "transparent",
  dotColor,
  offices = [],
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const resolvedDotColor = dotColor ?? (
    backgroundColor === "transparent" || backgroundColor === "black" ||
    backgroundColor.startsWith("#0") || backgroundColor.startsWith("#1")
      ? "#FFFFFF30"
      : "#1e40af18"
  );

  const svgMap = map.getSVG({
    radius: 0.22,
    color: resolvedDotColor,
    shape: "circle",
    backgroundColor,
  });

  // Project lat/lng → percentage position on the 800×400 viewBox
  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  // Convert viewBox coords to percentage for absolute CSS positioning
  const toPercent = (lat: number, lng: number) => {
    const { x, y } = projectPoint(lat, lng);
    return { left: `${(x / 800) * 100}%`, top: `${(y / 400) * 100}%` };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Decide label anchor direction to avoid overflow
  // US (lng < 0) → label right; India (lng > 60) → label left
  const getLabelSide = (lng: number) => lng < 0 ? "right" : "left";

  return (
    <div className="w-full aspect-[2/1] relative font-sans select-none">
      <h1>hey</h1>
      {/* Dotted base map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      {/* Animated arc lines */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"     stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white"     stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat,   dot.end.lng);
          return (
            <g key={`arc-${i}`}>
              <motion.path
                d={createCurvedPath(s, e)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 * i, ease: "easeOut" }}
              />
            </g>
          );
        })}

        {/* Pulse dots at every arc endpoint */}
        {dots.map((dot, i) =>
          [dot.start, dot.end].map((pt, j) => {
            const { x, y } = projectPoint(pt.lat, pt.lng);
            return (
              <g key={`pulse-${i}-${j}`}>
                <circle cx={x} cy={y} r="2.5" fill={lineColor} />
                <circle cx={x} cy={y} r="2.5" fill={lineColor} opacity="0.5">
                  <animate attributeName="r"       from="2.5" to="9"  dur="1.8s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0"  dur="1.8s" begin="0s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })
        )}
      </svg>

      {/* ── Office label pins ── */}
      {offices.map((office, i) => {
        const pos  = toPercent(office.lat, office.lng);
        const side = getLabelSide(office.lng);

        return (
          <motion.div
            key={office.city}
            className="absolute z-20 flex items-center gap-0"
            style={{
              left:      pos.left,
              top:       pos.top,
              transform: "translate(-50%, -100%)",
            }}
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: "easeOut" }}
          >
            {/* Label pill */}
            <div
              className={`flex items-center gap-1.5 bg-white border border-slate-200 shadow-md rounded-lg px-2.5 py-1.5 whitespace-nowrap
                ${side === "right" ? "order-last ml-1" : "order-first mr-1"}`}
            >
              <span className="text-sm leading-none">{office.flag}</span>
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-extrabold text-slate-800">{office.city}</span>
                <span className="text-[9px] font-semibold text-blue-500 uppercase tracking-wide mt-0.5">{office.country}</span>
              </div>
            </div>

            {/* Connector dot */}
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white shadow-sm z-10" />
              {/* Stem line down to the pin point */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-blue-400/60" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
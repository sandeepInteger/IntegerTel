import { useState } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ── Icons ─────────────────────────────────────────────────────────
const CablingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="3" width="20" height="4" rx="1" />
    <rect x="2" y="10" width="20" height="4" rx="1" />
    <rect x="2" y="17" width="20" height="4" rx="1" />
    <circle cx="18" cy="5" r="0.8" fill="currentColor" />
    <circle cx="18" cy="12" r="0.8" fill="currentColor" />
    <circle cx="18" cy="19" r="0.8" fill="currentColor" />
  </svg>
);
const RackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <path d="M7 6h10M7 10h10M7 14h10M7 18h4" />
    <circle cx="17" cy="18" r="1" fill="currentColor" />
  </svg>
);
const TestingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
    <path d="M3 8l3.5 3.5L13 4" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M4 10h12M10 4l6 6-6 6" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────
const sections = [
  {
    id: "cabling",
    label: "Structured Cabling",
    title: "Structured Cabling",
    icon: CablingIcon,
    color: "from-cyan-500 to-cyan-600",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-700",
    lightBorder: "border-cyan-100",
    bullets: [
      "Fiber & copper cabling",
      "Cable pathways & management",
      "Labeling & documentation",
    ],
    detail: "We install enterprise-grade structured cabling systems designed for high-density data centers — from horizontal and vertical fiber runs to copper patch infrastructure, with meticulous pathway management and full label/documentation packages for long-term maintainability.",
  },
  {
    id: "rack",
    label: "Rack & Equipment",
    title: "Rack & Equipment Installation",
    icon: RackIcon,
    color: "from-slate-600 to-slate-700",
    lightBg: "bg-slate-100",
    lightText: "text-slate-700",
    lightBorder: "border-slate-200",
    bullets: [
      "Rack, cabinet & ladder rack setup",
      "Server, switch & PDU installation",
      "Patch panel wiring & cleanup",
    ],
    detail: "Our installation crews handle full rack and cage builds — from mechanical assembly through equipment mounting, PDU configuration, and patch panel termination. Every build is delivered clean, structured, and ready for handoff.",
  },
  {
    id: "testing",
    label: "Infrastructure Testing",
    title: "Infrastructure Testing",
    icon: TestingIcon,
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    lightBorder: "border-blue-100",
    bullets: [
      "Cable certification",
      "Equipment power-up verification",
      "Connectivity & throughput testing",
    ],
    detail: "Before final handoff, every installation undergoes rigorous testing — certified cable testing reports, systematic equipment power-up checks, and end-to-end connectivity and throughput validation to ensure the data center is production-ready from day one.",
  },
];

const stats = [
  { value: "3",    label: "Disciplines"       },
  { value: "100%", label: "Certified Cabling"  },
  { value: "Day 1", label: "Production Ready" },
];

// ── Bullet ────────────────────────────────────────────────────────
const Bullet = ({ text, color }: { text: string; color: string }) => (
  <motion.li variants={fadeUp} className="flex items-start gap-3 text-sm text-slate-600 leading-snug">
    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br ${color} text-white`}>
      <CheckIcon />
    </span>
    {text}
  </motion.li>
);

// ── Page ──────────────────────────────────────────────────────────
const DataCenterPage = () => {
  const [active, setActive] = useState(0);
  const current = sections[active];

  return (
    <div className="w-full">

      {/* ══ DARK HERO ══ */}
      <div className="relative w-full bg-[#080f1e] overflow-hidden">

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }} />

        {/* Glow — cyan tint for data center */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(ellipse_at_left_center,rgba(6,182,212,0.10),transparent_60%)] pointer-events-none" />

        {/* Animated rack-column lines — vertical this time */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[15, 35, 55, 75].map((left, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
              style={{ left: `${left}%`, top: 0, bottom: 0 }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1.4, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Rings — right */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[480px] h-[480px] rounded-full border border-cyan-900/40" />
          <div className="absolute inset-[80px] rounded-full border border-cyan-800/25" />
          <div className="absolute inset-[160px] rounded-full bg-cyan-900/20" />
        </div>

        {/* Breadcrumb */}
        <div className="border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-2 flex-wrap">
            <span className="text-slate-300 text-sm font-semibold">Our Services</span>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-slate-600">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-slate-500 text-sm">Data Center Installation</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 relative z-10">
          <motion.div
            className="flex flex-col gap-7 max-w-2xl"
            variants={stagger} initial="hidden" animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Hardware
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-white tracking-tight leading-[1.08]">
              Data Center{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Installation
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Full mechanical and network build-outs for modern, high-density data centers —
              from structured cabling and rack builds to certification and day-one production readiness.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex items-center gap-10 pt-1">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-3xl font-extrabold text-white leading-none">{value}</span>
                  <span className="text-slate-500 text-xs font-medium tracking-wide">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
              {["Structured Cabling", "Rack Builds", "Cable Certification", "PDU & Patching", "Infrastructure Testing"].map((t) => (
                <span key={t}
                  className="text-xs font-semibold text-cyan-300 border border-cyan-800/50 bg-cyan-900/30 px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="w-full bg-[#f8faff] relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }} />
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.07),transparent_65%)]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_65%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16">

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {sections.map((s, i) => {
              const Icon = s.icon;
              const isActive = active === i;
              return (
                <button key={s.id} onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200
                    ${isActive
                      ? "bg-white border-cyan-200 text-cyan-700 shadow-md shadow-cyan-100/60"
                      : "bg-white/60 border-slate-200 text-slate-500 hover:border-cyan-100 hover:text-slate-700 hover:bg-white"
                    }`}
                >
                  <span className={isActive ? "text-cyan-500" : "text-slate-400"}><Icon /></span>
                  {s.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 ml-0.5" />}
                </button>
              );
            })}
          </motion.div>

          {/* Active panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6"
            >
              {/* Left */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col gap-6 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${current.color}`} />
                <div className={`absolute top-0 right-0 w-36 h-36 ${current.lightBg} rounded-bl-[70px] opacity-60`} />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${current.lightBg} border ${current.lightBorder} flex items-center justify-center ${current.lightText}`}>
                      <current.icon />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${current.lightBg} ${current.lightBorder} border ${current.lightText}`}>
                      {current.label}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {current.title}
                  </h2>

                  <p className="text-slate-500 text-sm leading-relaxed">{current.detail}</p>

                  <a href="#contact"
                    className={`mt-auto inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r ${current.color} px-5 py-3 rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all duration-200`}>
                    Request this Service
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-[80px] pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-[2px] bg-cyan-500 rounded-full" />
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                      Capabilities & Deliverables
                    </h3>
                  </div>
                  <motion.ul className="flex flex-col gap-3.5"
                    variants={stagger} initial="hidden" animate="visible">
                    {current.bullets.map((b) => (
                      <Bullet key={b} text={b} color={current.color} />
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All capabilities grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-700 text-xs font-bold tracking-widest uppercase">All Capabilities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sections.map((s, i) => {
                const Icon = s.icon;
                const isActive = active === i;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                    onClick={() => { setActive(i); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                    className={`group text-left bg-white border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5
                      ${isActive
                        ? "border-cyan-200 shadow-lg shadow-cyan-100/50"
                        : "border-slate-200 shadow-sm hover:border-cyan-100 hover:shadow-md"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${s.lightBg} border ${s.lightBorder} flex items-center justify-center ${s.lightText}`}>
                      <Icon />
                    </div>
                    <div>
                      <p className={`text-sm font-extrabold leading-snug ${isActive ? s.lightText : "text-slate-800"}`}>
                        {s.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{s.bullets.length} capabilities</p>
                    </div>
                    <ul className="flex flex-col gap-1.5 mt-1">
                      {s.bullets.slice(0, 2).map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className={`w-1 h-1 rounded-full bg-gradient-to-br ${s.color} shrink-0`} />
                          {b}
                        </li>
                      ))}
                      {s.bullets.length > 2 && (
                        <li className={`text-xs font-semibold ${s.lightText} mt-0.5`}>
                          +{s.bullets.length - 2} more
                        </li>
                      )}
                    </ul>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-12 bg-white border border-slate-200 rounded-3xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="text-slate-900 font-extrabold text-lg">Planning a data center build-out?</p>
              <p className="text-slate-400 text-sm">
                From cable infrastructure to full rack builds — we deliver production-ready installations on day one.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="tel:+14699955509"
                className="text-sm font-semibold text-slate-600 border border-slate-200 px-5 py-2.5 rounded-full hover:border-cyan-300 hover:text-cyan-700 transition-all duration-200 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                Call Us
              </a>
              <a href="#contact"
                className="text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 px-6 py-2.5 rounded-full shadow-md shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-200 flex items-center gap-2">
                Request a Proposal
                <ArrowIcon />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default DataCenterPage;
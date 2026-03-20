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
const DroneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="3" />
    <path d="M5 5l2.5 2.5M19 5l-2.5 2.5M5 19l2.5-2.5M19 19l-2.5-2.5" />
    <circle cx="4" cy="4" r="2" /><circle cx="20" cy="4" r="2" />
    <circle cx="4" cy="20" r="2" /><circle cx="20" cy="20" r="2" />
  </svg>
);
const LOSIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.4" />
  </svg>
);
const ReportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
    <path d="M9 9h1" />
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
    id: "aerial",
    label: "Aerial Inspections",
    title: "Aerial Inspections",
    icon: DroneIcon,
    color: "from-sky-500 to-sky-600",
    lightBg: "bg-sky-50",
    lightText: "text-sky-600",
    lightBorder: "border-sky-100",
    bullets: [
      "High-resolution imaging",
      "Antenna & radio condition checks",
      "Structural assessments",
    ],
    detail: "Our FAA Part 107-certified drone pilots conduct detailed aerial inspections using high-resolution cameras, capturing antenna condition, radio unit status, and structural integrity — safely and efficiently without the cost and risk of traditional climbing crews.",
  },
  {
    id: "los",
    label: "Line-of-Sight Mapping",
    title: "Line-of-Sight Mapping",
    icon: LOSIcon,
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    lightBorder: "border-blue-100",
    bullets: [
      "Path validation",
      "Obstruction identification",
    ],
    detail: "Using aerial drone imagery and precision mapping techniques, we validate line-of-sight paths between sites, identify obstructions that impact signal propagation, and deliver geo-referenced deliverables for RF planning teams.",
  },
  {
    id: "reporting",
    label: "Reporting",
    title: "Reporting",
    icon: ReportIcon,
    color: "from-slate-600 to-slate-700",
    lightBg: "bg-slate-100",
    lightText: "text-slate-700",
    lightBorder: "border-slate-200",
    bullets: [
      "Photo documentation",
      "Defect summaries",
      "Corrective action recommendations",
    ],
    detail: "Every audit concludes with a comprehensive report package — organized photo documentation by tower section, clear defect classification with severity ratings, and prioritized corrective action recommendations ready for engineering and maintenance teams.",
  },
];

const stats = [
  { value: "FAA",   label: "Part 107 Certified" },
  { value: "4K",    label: "Resolution Imaging"  },
  { value: "Zero",  label: "Climbing Required"   },
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
const DroneTowerAuditPage = () => {
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

        {/* Sky-blue glow */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(ellipse_at_left_center,rgba(14,165,233,0.11),transparent_60%)] pointer-events-none" />

        {/* Animated drone flight path arcs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice">
            {[
              "M-50 200 Q300 80 650 180 Q900 260 1250 140",
              "M-50 300 Q250 150 600 250 Q850 320 1250 220",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke={i === 0 ? "rgba(56,189,248,0.15)" : "rgba(99,102,241,0.10)"}
                strokeWidth="1.5"
                strokeDasharray="8 6"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.3, duration: 2, ease: "easeInOut" }}
              />
            ))}
          </svg>
          {/* Animated drone dot travelling the path */}
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50"
            style={{ top: "44%", left: "0%" }}
            animate={{ left: ["0%", "30%", "60%", "90%", "105%"], top: ["44%", "22%", "42%", "30%", "34%"] }}
            transition={{ delay: 1, duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
          />
        </div>

        {/* Rings — right */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[480px] h-[480px] rounded-full border border-sky-900/40" />
          <div className="absolute inset-[80px] rounded-full border border-sky-800/25" />
          <div className="absolute inset-[160px] rounded-full bg-sky-900/20" />
        </div>

        {/* Breadcrumb */}
        <div className="border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-2 flex-wrap">
            <span className="text-slate-300 text-sm font-semibold">Our Services</span>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-slate-600">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-slate-500 text-sm">Drone Tower Audits</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 relative z-10">
          <motion.div
            className="flex flex-col gap-7 max-w-2xl"
            variants={stagger} initial="hidden" animate="visible"
          >
            {/* FAA cert badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/25 text-sky-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Field Services
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-sky-400">
                  <path d="M12 2L4 6v5c0 4.97 3.47 9.63 8 10.93C16.53 20.63 20 15.97 20 11V6l-8-4z" />
                </svg>
                FAA Part 107 Certified
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-white tracking-tight leading-[1.08]">
              Drone Tower{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                Audits
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg leading-relaxed">
              FAA Part 107-certified drone inspections for antenna condition, structural integrity,
              and line-of-sight mapping — faster, safer, and more detailed than traditional climb audits.
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
              {["Aerial Imaging", "Structural Checks", "LOS Path Validation", "Defect Reports", "No Climbing Required"].map((t) => (
                <span key={t}
                  className="text-xs font-semibold text-sky-300 border border-sky-800/50 bg-sky-900/30 px-3 py-1.5 rounded-full">
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
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.07),transparent_65%)]" />
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
                      ? "bg-white border-sky-200 text-sky-600 shadow-md shadow-sky-100/60"
                      : "bg-white/60 border-slate-200 text-slate-500 hover:border-sky-100 hover:text-slate-700 hover:bg-white"
                    }`}
                >
                  <span className={isActive ? "text-sky-500" : "text-slate-400"}><Icon /></span>
                  {s.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 ml-0.5" />}
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
                    Find Out More
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-[80px] pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-[2px] bg-sky-500 rounded-full" />
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
              <span className="w-5 h-[2px] bg-sky-500 rounded-full" />
              <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">All Capabilities</span>
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
                        ? "border-sky-200 shadow-lg shadow-sky-100/50"
                        : "border-slate-200 shadow-sm hover:border-sky-100 hover:shadow-md"
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
              <p className="text-slate-900 font-extrabold text-lg">Need a tower audit?</p>
              <p className="text-slate-400 text-sm">
                Our FAA Part 107 pilots deliver faster, safer tower inspections with detailed photo reports and corrective recommendations.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="tel:+14699955509"
                className="text-sm font-semibold text-slate-600 border border-slate-200 px-5 py-2.5 rounded-full hover:border-sky-300 hover:text-sky-600 transition-all duration-200 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                Call Us
              </a>
              <a href="#contact"
                className="text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 px-6 py-2.5 rounded-full shadow-md shadow-sky-500/20 hover:shadow-sky-400/30 transition-all duration-200 flex items-center gap-2">
                Request an Audit
                <ArrowIcon />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default DroneTowerAuditPage;
import { useState } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
{/**const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
}; */}
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ── Icons ─────────────────────────────────────────────────────────
const RFIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
  </svg>
);
const DriveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);
const WalkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const PostIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);
const IntegrationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="7" width="6" height="10" rx="1" /><rect x="16" y="7" width="6" height="10" rx="1" />
    <path d="M8 12h8M14 9l3 3-3 3" />
  </svg>
);
const EMEIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
    <path d="M3 8l3.5 3.5L13 4" />
  </svg>
);

// ── Service sections ──────────────────────────────────────────────
const sections = [
  {
    id: "rf",
    label: "RF Design",
    title: "RF Design & Optimization",
    icon: RFIcon,
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    lightBorder: "border-blue-100",
    ringColor: "ring-blue-200",
    bullets: [
      "RF planning, modeling & design",
      "Capacity analysis & interference mitigation",
      "Neighbor planning & parameter reviews",
    ],
    detail: "Our RF design team uses industry-leading planning tools to model, simulate, and optimize coverage across all frequency bands — ensuring your network is built right the first time.",
  },
  {
    id: "drive",
    label: "Drive Testing",
    title: "Drive Testing",
    icon: DriveIcon,
    color: "from-indigo-500 to-indigo-600",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
    lightBorder: "border-indigo-100",
    ringColor: "ring-indigo-200",
    bullets: [
      "Route-based drive testing",
      "Autonomous vehicle drive testing",
      "Multicarrier benchmarking",
      "Dense-market mobility performance audits",
    ],
    detail: "From standard route testing to AV-mounted automated systems, our drive testing captures granular KPI data across any geography — actionable insight for network planners.",
  },
  {
    id: "walk",
    label: "Walk Testing",
    title: "RF Walk Testing",
    icon: WalkIcon,
    color: "from-cyan-500 to-cyan-600",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-600",
    lightBorder: "border-cyan-100",
    ringColor: "ring-cyan-200",
    bullets: [
      "Stadiums, airports, campuses & indoor venues",
      "HB Flex / GFlex scanner measurements",
      "Coverage, quality & capacity heatmaps",
    ],
    detail: "We deploy specialized indoor scanning equipment to map real-world coverage performance across complex venue environments — delivering precise, visual heatmap deliverables.",
  },
  {
    id: "post",
    label: "Post Processing",
    title: "Post Processing",
    icon: PostIcon,
    color: "from-sky-500 to-sky-600",
    lightBg: "bg-sky-50",
    lightText: "text-sky-600",
    lightBorder: "border-sky-100",
    ringColor: "ring-sky-200",
    bullets: [
      "KPI extraction",
      "Layer-by-layer issue classification",
      "Engineering recommendations & optimization plans",
    ],
    detail: "Raw drive data is only as useful as the analysis behind it. Our post-processing team extracts actionable KPIs and delivers structured engineering reports with prioritized recommendations.",
  },
  {
    id: "integration",
    label: "Integration",
    title: "Integration & Commissioning",
    icon: IntegrationIcon,
    color: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    lightBorder: "border-blue-100",
    ringColor: "ring-blue-200",
    bullets: [
      "Node integration",
      "Software loads & parameter deployment",
      "Feature activation & validation",
    ],
    detail: "Our integration engineers handle end-to-end site commissioning — from initial node bring-up through parameter loading, feature activation, and final acceptance testing.",
  },
  {
    id: "eme",
    label: "EME Analysis",
    title: "EME Analysis",
    icon: EMEIcon,
    color: "from-violet-500 to-violet-600",
    lightBg: "bg-violet-50",
    lightText: "text-violet-600",
    lightBorder: "border-violet-100",
    ringColor: "ring-violet-200",
    bullets: [
      "Electromagnetic exposure assessments",
      "Compliance documentation",
    ],
    detail: "We deliver thorough electromagnetic exposure assessments for regulatory compliance, helping carriers meet safety standards with clear documentation for submission.",
  },
  {
    id: "additional",
    label: "Additional",
    title: "Additional Services",
    icon: PlusIcon,
    color: "from-slate-500 to-slate-600",
    lightBg: "bg-slate-50",
    lightText: "text-slate-600",
    lightBorder: "border-slate-200",
    ringColor: "ring-slate-200",
    bullets: [
      "DAS & small cell deployments",
      "Sign changing & hardware updates",
      "Troubleshooting & audits",
    ],
    detail: "Beyond our core capabilities, our field team handles DAS installations, hardware refresh cycles, and targeted troubleshooting engagements across any network topology.",
  },
];

// ── Bullet item ───────────────────────────────────────────────────
const Bullet = ({ text, color }: { text: string; color: string }) => (
  <motion.li
    variants={fadeUp}
    className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug"
  >
    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br ${color} text-white`}>
      <CheckIcon />
    </span>
    {text}
  </motion.li>
);

// ── Main ──────────────────────────────────────────────────────────
const WirelessServicesPage = () => {
  const [active, setActive] = useState(0);
  const current = sections[active];

  return (
    <div className="w-full">

      {/* ══ DARK HERO BANNER ══ */}
      <div className="relative w-full bg-[#080f1e] overflow-hidden">

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }} />

        {/* Glow */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(ellipse_at_left_center,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />

        {/* Rings — right */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[480px] h-[480px] rounded-full border border-blue-800/35" />
          <div className="absolute inset-[80px] rounded-full border border-blue-700/25" />
          <div className="absolute inset-[160px] rounded-full bg-blue-900/20" />
        </div>

        {/* Breadcrumb */}
        <div className="border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-2 flex-wrap">
            <span className="text-slate-300 text-sm font-semibold">Our Services</span>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-slate-600">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-slate-500 text-sm">Wireless Engineering & Field Services</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 relative z-10">
          <motion.div
            className="flex flex-col gap-6 max-w-2xl"
            variants={stagger} initial="hidden" animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                RF & Network
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-white tracking-tight leading-[1.08]">
              Wireless Engineering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                & Field Services
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg leading-relaxed">
              End-to-end network lifecycle management, from initial RF design to deployment and performance optimization.
            </motion.p>

            {/* Quick stat pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
              {["5G NR & LTE", "Drive & Walk Testing", "EME Compliance", "Integration & Commissioning"].map((t) => (
                <span key={t}
                  className="text-xs font-semibold text-blue-300 border border-blue-800/60 bg-blue-900/30 px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ CONTENT SECTION ══ */}
      <div className="w-full bg-[#f8faff] relative overflow-hidden">

        {/* Bg decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }} />
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07),transparent_65%)]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_65%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16">

          {/* ── TAB NAV ── */}
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
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200
                    ${isActive
                      ? `bg-white border-blue-200 text-blue-600 shadow-md shadow-blue-100/60`
                      : "bg-white/60 border-slate-200 text-slate-500 hover:border-blue-100 hover:text-slate-700 hover:bg-white"
                    }`}
                >
                  <span className={isActive ? "text-blue-500" : "text-slate-400"}>
                    <Icon />
                  </span>
                  {s.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* ── ACTIVE PANEL ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6"
            >
              {/* Left: info card */}
              <div className={`lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col gap-6 shadow-sm relative overflow-hidden`}>
                {/* Accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${current.color}`} />
                {/* Corner tint */}
                <div className={`absolute top-0 right-0 w-36 h-36 ${current.lightBg} rounded-bl-[70px] to-transparent opacity-60`} />

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Icon + label */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${current.lightBg} border ${current.lightBorder} flex items-center justify-center ${current.lightText}`}>
                      <current.icon />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${current.lightBg} ${current.lightBorder} border ${current.lightText}`}>
                      {current.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {current.title}
                  </h2>

                  {/* Detail paragraph */}
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {current.detail}
                  </p>

                  {/* CTA */}
                  <a href="#contact"
                    className={`mt-auto inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r ${current.color} px-5 py-3 rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all duration-200`}>
                    Find Out More
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M4 10h12M10 4l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right: bullets card */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-[2px] bg-blue-500 rounded-full" />
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                      Capabilities & Deliverables
                    </h3>
                  </div>

                  <motion.ul
                    className="flex flex-col gap-3"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    {current.bullets.map((b) => (
                      <Bullet key={b} text={b} color={current.color} />
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── ALL SERVICES GRID (summary cards) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-[2px] bg-blue-500 rounded-full" />
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">All Capabilities</span>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {sections.map((s, i) => {
                const Icon = s.icon;
                const isActive = active === i;
                return (
                  <motion.button
                    key={s.id}
                    variants={fadeUp}
                    onClick={() => { setActive(i); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                    className={`group text-left bg-white border rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5
                      ${isActive
                        ? `border-blue-200 shadow-lg shadow-blue-100/50 ${s.ringColor}`
                        : "border-slate-200 shadow-sm hover:border-blue-100 hover:shadow-md"
                      }`}
                  >
                    {/* Hover top bar */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />

                    <div className={`w-9 h-9 rounded-xl ${s.lightBg} border ${s.lightBorder} flex items-center justify-center ${s.lightText}`}>
                      <Icon />
                    </div>
                    <div>
                      <p className={`text-sm font-extrabold leading-snug ${isActive ? s.lightText : "text-slate-800"}`}>
                        {s.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {s.bullets.length} capabilities
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── BOTTOM CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-12 bg-white border border-slate-200 rounded-3xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="text-slate-900 font-extrabold text-lg">Ready to optimize your wireless network?</p>
              <p className="text-slate-400 text-sm">Our RF engineers are ready to scope your project — from single-site audits to full-market deployments.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="tel:+14699955509"
                className="text-sm font-semibold text-slate-600 border border-slate-200 px-5 py-2.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-200 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                Call Us
              </a>
              <a href="#contact"
                className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-200 flex items-center gap-2">
                Request a Proposal
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M4 10h12M10 4l6 6-6 6" />
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WirelessServicesPage;
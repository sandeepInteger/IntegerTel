import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants, type Transition } from "framer-motion";

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Icons ─────────────────────────────────────────────────────────
const WirelessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
  </svg>
);
const FiberIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);
const DataCenterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="3" width="20" height="4" rx="1" />
    <rect x="2" y="10" width="20" height="4" rx="1" />
    <rect x="2" y="17" width="20" height="4" rx="1" />
    <circle cx="18" cy="5" r="0.8" fill="currentColor" />
    <circle cx="18" cy="12" r="0.8" fill="currentColor" />
    <circle cx="18" cy="19" r="0.8" fill="currentColor" />
  </svg>
);
const TowerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2v20M8 6l4-4 4 4M7 10l5-3 5 3M6 14l6-2 6 2M5 18l7-1 7 1" />
  </svg>
);
const ChipsetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M4 10h12M10 4l6 6-6 6" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────
const stats = [
  { value: "5",    label: "Service Areas"    },
  { value: "200+", label: "Projects Done"    },
  { value: "15+",  label: "Years Experience" },
];

const services = [
  {
    tag: "RF & Network",
    title: "Wireless Services",
    to: "/wirelessPage",
    description: "End-to-end RF design, optimization and testing across all wireless technologies — from legacy 4G LTE to full 5G NR deployment.",
    icon: WirelessIcon,
    bullets: ["5G NR & LTE site deployment", "RF drive testing & optimization", "Network performance analysis", "Interference resolution"],
    accent: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    lightBorder: "border-blue-100",
  },
  {
    tag: "Infrastructure",
    title: "Fiber Engineering & Splicing",
    to: "/fiberPage",
    description: "Complete fiber lifecycle management from permit coordination to final as-built documentation.",
    icon: FiberIcon,
    bullets: ["OSP/ISP fiber installation", "Fusion splicing & OTDR testing", "Conduit & duct bank design", "Permit & ROW coordination"],
    accent: "from-indigo-500 to-indigo-600",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
    lightBorder: "border-indigo-100",
  },
  {
    tag: "Hardware",
    title: "Data Center Infrastructure",
    to: "/dataCenterPage",
    description: "Full mechanical and network build-outs for modern, high-density data centers — from cabling to commissioning.",
    icon: DataCenterIcon,
    bullets: ["Structured cabling systems", "Power & cooling infrastructure", "Rack installation & patching", "DCIM commissioning"],
    accent: "from-cyan-500 to-cyan-600",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-600",
    lightBorder: "border-cyan-100",
  },
  {
    tag: "Field Services",
    title: "Tower Services",
    to: "/droneTowerPage",
    description: "Antenna, radio & grounding upgrades with FAA Part 107-certified drone audits for safe, accurate inspections.",
    icon: TowerIcon,
    bullets: ["Antenna & RRU installations", "Grounding & bonding upgrades", "FAA 107 drone tower audits", "Structural load analysis support"],
    accent: "from-sky-500 to-sky-600",
    lightBg: "bg-sky-50",
    lightText: "text-sky-600",
    lightBorder: "border-sky-100",
  },
  {
    tag: "Testing",
    title: "Chipset & Device Testing",
    to: "/chipsetPage",
    description: "Multi-region drive testing and advanced log analysis for next-gen mobile devices and chipset certification.",
    icon: ChipsetIcon,
    bullets: ["KPI drive testing & analysis", "Qualcomm/MediaTek log parsing", "Device certification support", "Multi-band RF performance"],
    accent: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    lightBorder: "border-blue-100",
  },
];

// ── Service Card ──────────────────────────────────────────────────
const ServiceCard = ({
  service, index, active, onHover,
}: {
  service: typeof services[0];
  index: number;
  active: boolean;
  onHover: (i: number | null) => void;
}) => {
  const Icon = service.icon;
  return (
    <motion.div variants={fadeUp} className="h-full min-h-0">
      <Link
        to={service.to}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        className={`group relative bg-white border rounded-3xl p-7 flex flex-col gap-5 cursor-pointer transition-all duration-300 overflow-hidden h-full text-left no-underline outline-none ring-blue-500/40 focus-visible:ring-2 focus-visible:ring-offset-2
        ${active
          ? "border-blue-200 shadow-xl shadow-blue-100/60 -translate-y-1"
          : "border-slate-200 shadow-sm hover:border-blue-100 hover:shadow-md"}`}
      >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.accent} transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`} />
      {/* Corner tint */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.lightBg} to-transparent rounded-bl-[60px] transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`} />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Icon + tag */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl ${service.lightBg} border ${service.lightBorder} flex items-center justify-center ${service.lightText} transition-transform duration-200 group-hover:scale-110`}>
            <Icon />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${service.lightBg} ${service.lightBorder} ${service.lightText}`}>
            {service.tag}
          </span>
        </div>

        {/* Title + desc */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">{service.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-xs text-slate-500">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br ${service.accent}`} />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={`flex items-center gap-1.5 text-sm font-bold mt-auto transition-colors duration-200 ${active ? service.lightText : "text-slate-400"}`}>
          <span className="text-inherit">Learn more</span>
          <motion.span animate={{ x: active ? 4 : 0 }} transition={{ duration: 0.2 }} aria-hidden>
            <ArrowIcon />
          </motion.span>
        </div>
      </div>
      </Link>
    </motion.div>
  );
};

// ── Main ──────────────────────────────────────────────────────────
const ServicesPage = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="w-full ">

      {/* ══════════════════════════════════════════════════════════
          DARK HERO BANNER
      ══════════════════════════════════════════════════════════ */}
      <div className="relative w-full bg-[#080f1e] overflow-hidden">

        {/* Subtle white grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }} />

        {/* Blue glow — left origin */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(ellipse_at_left_center,rgba(59,130,246,0.10),transparent_60%)] pointer-events-none" />

        {/* Decorative rings — right */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-blue-800/35" />
          <div className="absolute inset-[70px] rounded-full border border-blue-700/25" />
          <div className="absolute inset-[150px] rounded-full bg-blue-900/20" />
        </div>

        {/* Horizontal separator above breadcrumb */}
        <div className="border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-2">
            <span className="text-slate-300 text-sm font-semibold">Our Services</span>
            
          </div>
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 relative z-10">
          <motion.div
            className="flex flex-col gap-7 max-w-2xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Professional Services
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white tracking-tight leading-[1.08]"
            >
              Professional Telecom{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Engineering Solutions
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Providing end-to-end infrastructure and testing services for the next generation of connectivity.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex items-center gap-10 pt-2">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white leading-none">{value}</span>
                  <span className="text-slate-500 text-xs font-medium tracking-wide">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LIGHT CARDS SECTION
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#f8faff] relative overflow-hidden py-16 px-5 sm:px-8">

        {/* Subtle bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }} />
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07),transparent_65%)]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_65%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Section label */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="w-5 h-[2px] bg-blue-500 rounded-full" />
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">What We Offer</span>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                active={activeCard === i}
                onHover={setActiveCard}
              />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-12 bg-white border border-slate-200 rounded-3xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="text-slate-900 font-extrabold text-lg">Need a custom solution?</p>
              <p className="text-slate-400 text-sm">Our engineers will scope and design a solution tailored to your exact network requirements.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="mailto:info@integertel.com"
                className="text-sm font-semibold text-slate-600 border border-slate-200 px-5 py-2.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
                Email Us
              </a>
              <a href="#contact"
                className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-200 flex items-center gap-2">
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

export default ServicesPage;
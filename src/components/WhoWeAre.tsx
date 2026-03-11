import { motion,type Variants } from "framer-motion";

// ── Animation variants ──────────────────────────────────────────
const fadeUp:Variants  = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const popIn:Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = (staggerTime = 0.12) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerTime } },
});

// ── Data ─────────────────────────────────────────────────────────
const certifications = [
  {
    bg: "bg-[#f0f5c8]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4L6 10v10c0 8.4 5.9 16.3 14 18 8.1-1.7 14-9.6 14-18V10L20 4z" fill="#1a1a1a" />
        <path d="M15 20l3.5 3.5L25 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "30+ US States",
  },
  {
    bg: "bg-[#f0f0f0]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="6" y="8" width="28" height="24" rx="3" fill="#1a1a1a" />
        <path d="M13 20h14M13 14h8M13 26h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    name: "3 Global Hubs",
  },
  {
    bg: "bg-[#dbeafe]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" fill="#1a1a1a" />
        <path d="M14 20l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "600+ Experts",
  },
];

const features = [
  {
    iconBg: "bg-[#f0f5c8]",
    title: "600+ Team Members",
    description:
      "A dedicated workforce of engineers and field technicians ready for deployment at a moment's notice.",
  },
  {
    iconBg: "bg-[#f0f0f0]",
    title: "Local Presence",
    description:
      "Strategic teams embedded in key regional markets to ensure rapid response and local expertise.",
  },
  {
    iconBg: "bg-[#dbeafe]",
    title: "Global Operations",
    description:
      "24/7 delivery capabilities leveraging our interconnected hubs in the US, Canada, and India.",
  },
];

const DocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 text-slate-800"
  >
    <rect x="4" y="2" width="13" height="20" rx="2" />
    <path d="M9 2v20" />
    <path d="M13 7h2M13 11h2M13 15h2" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────
const SecurityCompliance = () => {
  return (
    <section className="w-full bg-white py-20 px-6 relative overflow-hidden">

      {/* ── Header block ── */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Eyebrow */}
        <motion.p
          className="text-blue-500 text-sm font-semibold tracking-wide"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Who We Are
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight max-w-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Global Scale, Local Field Force
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          With a 600+ person delivery team across 30+ U.S. states and operations in the US,
          Canada, and India, we bridge the gap between high-level engineering and ground-level execution.
        </motion.p>

        {/* Cert cards — staggered */}
        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certifications.map(({ bg, icon, name }) => (
            <motion.div
              key={name}
              className={`${bg} rounded-2xl flex items-center justify-center gap-3 py-10 px-6`}
              variants={popIn}
            >
              {icon}
              <span className="text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Feature cards — staggered fade-up ── */}
      <div className="max-w-6xl mx-auto mt-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
          variants={staggerContainer(0.13)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map(({ iconBg, title, description }) => (
            <motion.div
              key={title}
              className="flex flex-col items-center text-center gap-5"
              variants={fadeUp}
            >
              <div className={`${iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shrink-0`}>
                <DocIcon />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default SecurityCompliance;
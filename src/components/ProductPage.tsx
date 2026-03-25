import { useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ── Icons ─────────────────────────────────────────────────────────
const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

const AlarmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    <path d="M12 2v1M4.22 5.22l.7.7M19.78 5.22l-.7.7" />
  </svg>
);

const TeamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
    <path d="M3 8l3.5 3.5L13 4" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M4 10h12M10 4l6 6-6 6" />
  </svg>
);

type AudienceSection = { title: string; items: string[] };

type Product = {
  id: string;
  label: string;
  headline: string;
  icon: ComponentType;
  color: string;
  lightBg: string;
  lightText: string;
  lightBorder: string;
  accentHex: string;
  phase: string;
  intro: string;
  audienceSections?: AudienceSection[];
  bodyParagraphs?: string[];
  focusBullets?: string[];
  highlights: string[];
};

// ── Products (authoritative copy) ─────────────────────────────────
const products: Product[] = [
  {
    id: "fsa",
    label: "FSA",
    headline: "Integer FSA – Field Services App",
    icon: MobileIcon,
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    lightBorder: "border-blue-100",
    accentHex: "#2563eb",
    phase: "Mobile application",
    intro: "This mobile application will help the following:",
    audienceSections: [
      {
        title: "NIC / UTRAN",
        items: [
          "Connect with field crew",
          "Realtime tracker",
          "Deliver scripts / packages",
          "Systemwide updates",
        ],
      },
      {
        title: "Field Opps",
        items: [
          "Site information at fingertips",
          "Close-out package automation",
          "Step-by-step instructions",
          "Escalation and reporting",
        ],
      },
      {
        title: "Client",
        items: [
          "Cloud-based repository of sites",
          "Auto applicability of drivers and invoicing",
        ],
      },
    ],
    highlights: ["Field-ready", "Realtime ops", "Client cloud hub"],
  },
  {
    id: "aac",
    label: "AAC",
    headline: "Integer AAC – Automatic Alarm Monitoring and Clearing",
    icon: AlarmIcon,
    color: "from-indigo-500 to-indigo-600",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
    lightBorder: "border-indigo-100",
    accentHex: "#4f46e5",
    phase: "In infancy · Flagship direction",
    intro: "",
    bodyParagraphs: [
      "This product is in its infancy.",
      "It will be a flagship offering where we incorporate machine learning and artificial intelligence into the DNA of the solution.",
    ],
    highlights: ["AI / ML core", "Alarm lifecycle", "Enterprise roadmap"],
  },
  {
    id: "tcube",
    label: "TCube",
    headline: "Integer TCube – Tiger Team Tracking",
    icon: TeamIcon,
    color: "from-cyan-500 to-teal-600",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-700",
    lightBorder: "border-cyan-100",
    accentHex: "#0891b2",
    phase: "Under development",
    intro:
      "Most mobile operators will agree that Tiger Teams charge an arm and a leg—but they are the lifeline when you need a quick fix or when addressing serious service deterioration issues. The product is addressing:",
    focusBullets: [
      "Realtime tracking of the team",
      "Analytics of the spend",
      "Root cause analysis of the issue",
    ],
    highlights: ["Team visibility", "Spend analytics", "Root cause focus"],
  },
];

// ── Sub-components ─────────────────────────────────────────────────
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

const HighlightCard = ({ label, accentHex }: { label: string; accentHex: string }) => (
  <div className="flex flex-col items-center justify-center text-center bg-white border border-slate-100 rounded-2xl px-4 py-5 gap-1 shadow-sm">
    <span className="text-sm font-extrabold tracking-tight text-slate-800 leading-snug">{label}</span>
    <span className="w-8 h-0.5 rounded-full mt-1" style={{ backgroundColor: accentHex }} />
  </div>
);

// ── Page ──────────────────────────────────────────────────────────
const ProductsPage = () => {
  const [active, setActive] = useState(0);
  const current = products[active];
  const ActiveIcon = current.icon;

  return (
    <div className="w-full">
      {/* ══ DARK HERO ══ */}
      <div className="relative w-full bg-[#080f1e] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(ellipse_at_left_center,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[480px] h-[480px] rounded-full border border-blue-800/35" />
          <div className="absolute inset-[80px] rounded-full border border-blue-700/25" />
          <div className="absolute inset-[160px] rounded-full bg-blue-900/20" />
        </div>

        <nav aria-label="Breadcrumb" className="border-b border-white/[0.07]">
          <ol className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center gap-2 flex-wrap text-sm">
            <li>
              <Link
                to="/"
                className="text-slate-400 hover:text-white transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f1e]"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2 text-slate-600" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
            <li>
              <span className="text-slate-500" aria-current="page">
                Our Products
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 relative z-10">
          <motion.div
            className="flex flex-col gap-6 max-w-2xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Integer Products
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-white tracking-tight leading-[1.08]"
            >
              Three products,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                one engineering mindset
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Field Services App (FSA) for crews and clients, Automatic Alarm Monitoring and Clearing (AAC) as our AI-driven flagship path, and TCube for Tiger Team tracking—each aligned to how operators actually run networks.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
              {products.map((p) => (
                <span
                  key={p.id}
                  className="text-xs font-semibold text-blue-300 border border-blue-800/60 bg-blue-900/30 px-3 py-1.5 rounded-full"
                >
                  {p.headline.split("–")[0].trim()}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="w-full bg-[#f8faff] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07),transparent_65%)]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_65%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {products.map((p, i) => {
              const Icon = p.icon;
              const isActive = active === i;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200
                    ${isActive
                      ? "bg-white border-blue-200 text-blue-600 shadow-md shadow-blue-100/60"
                      : "bg-white/60 border-slate-200 text-slate-500 hover:border-blue-100 hover:text-slate-700 hover:bg-white"
                    }`}
                >
                  <span className={isActive ? "text-blue-500" : "text-slate-400"}>
                    <Icon />
                  </span>
                  {p.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col gap-6 shadow-sm relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${current.color}`} />
                  <div className={`absolute top-0 right-0 w-36 h-36 ${current.lightBg} rounded-bl-[70px] opacity-60`} />

                  <div className="relative z-10 flex flex-col gap-5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className={`w-12 h-12 rounded-2xl ${current.lightBg} border ${current.lightBorder} flex items-center justify-center ${current.lightText}`}>
                        <ActiveIcon />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${current.lightBg} ${current.lightBorder} border ${current.lightText}`}>
                        {current.phase}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {current.headline}
                    </h2>

                    {current.intro ? (
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{current.intro}</p>
                    ) : null}

                    {current.bodyParagraphs?.map((para, pi) => (
                      <p key={pi} className="text-slate-500 text-sm leading-relaxed">
                        {para}
                      </p>
                    ))}

                    <Link
                      to="/contact"
                      className={`mt-auto inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r ${current.color} px-5 py-3 rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all duration-200 w-fit`}
                    >
                      Learn more
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {current.highlights.map((h) => (
                      <HighlightCard key={h} label={h} accentHex={current.accentHex} />
                    ))}
                  </div>

                  <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-[2px] bg-blue-500 rounded-full" />
                        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                          {current.audienceSections
                            ? "Who it helps"
                            : current.focusBullets
                              ? "Product focus"
                              : "Overview"}
                        </h3>
                      </div>

                      {current.audienceSections ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {current.audienceSections.map((sec) => (
                            <div
                              key={sec.title}
                              className={`rounded-2xl border ${current.lightBorder} ${current.lightBg} p-5 flex flex-col gap-3`}
                            >
                              <h4 className={`text-sm font-extrabold ${current.lightText}`}>{sec.title}</h4>
                              <ul className="flex flex-col gap-2.5">
                                {sec.items.map((item) => (
                                  <li key={item} className="text-xs text-slate-600 leading-relaxed flex gap-2">
                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br ${current.color}`} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {current.focusBullets ? (
                        <motion.ul className="flex flex-col gap-3" variants={stagger} initial="hidden" animate="visible">
                          {current.focusBullets.map((b) => (
                            <Bullet key={b} text={b} color={current.color} />
                          ))}
                        </motion.ul>
                      ) : null}

                      {current.bodyParagraphs && !current.focusBullets && !current.audienceSections ? (
                        <div className={`rounded-2xl border ${current.lightBorder} ${current.lightBg} p-6`}>
                          <p className={`text-xs font-bold uppercase tracking-widest ${current.lightText} mb-2`}>
                            Vision
                          </p>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Embedding machine learning and artificial intelligence into automatic alarm monitoring and clearing—evolving toward a flagship platform as the product matures.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-[2px] bg-blue-500 rounded-full" />
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">All products</span>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {products.map((p, i) => {
                const Icon = p.icon;
                const isActive = active === i;
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    variants={fadeUp}
                    onClick={() => {
                      setActive(i);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    className={`group relative text-left bg-white border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden
                      ${isActive ? "border-blue-200 shadow-lg shadow-blue-100/50" : "border-slate-200 shadow-sm hover:border-blue-100 hover:shadow-md"}`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${p.color} rounded-t-2xl transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    />
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 ${p.lightBg} rounded-bl-[50px] opacity-0 group-hover:opacity-60 ${isActive ? "opacity-60" : ""} transition-opacity duration-200`}
                    />

                    <div className="relative z-10 flex flex-col gap-3">
                      <div className={`w-10 h-10 rounded-xl ${p.lightBg} border ${p.lightBorder} flex items-center justify-center ${p.lightText}`}>
                        <Icon />
                      </div>
                      <p className={`text-sm font-extrabold leading-snug ${isActive ? p.lightText : "text-slate-800"}`}>{p.headline}</p>
                      <p className="text-xs text-slate-500">{p.phase}</p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-10 bg-white border border-slate-200 rounded-3xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="text-slate-900 font-extrabold text-lg">Questions about FSA, AAC, or TCube?</p>
              <p className="text-slate-400 text-sm">Reach out and our team will follow up with the right technical contact.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:+19725394100"
                className="text-sm font-semibold text-slate-600 border border-slate-200 px-5 py-2.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                Call us
              </a>
              <Link
                to="/contact"
                className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-full shadow-md shadow-blue-500/20 transition-all duration-200 flex items-center gap-2"
              >
                Contact
                <ArrowIcon />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

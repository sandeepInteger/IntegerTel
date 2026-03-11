"use client";
import { useState } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Contact info cards ────────────────────────────────────────────
const contactCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
    label: "Call Us",
    value: "+1 (469) 995-5509",
    sub: "Mon–Fri, 8am–6pm CST",
    href: "tel:+14699955509",
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email Us",
    value: "info@integertel.com",
    sub: "We reply within 24 hours",
    href: "mailto:info@integertel.com",
    color: "from-indigo-500 to-indigo-600",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: "Headquarters",
    value: "Plano, TX 75093",
    sub: "4200 Mapleshade ln, Ste 100",
    href: "https://maps.google.com",
    color: "from-cyan-500 to-cyan-600",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-600",
  },
];

// ── Services dropdown options ─────────────────────────────────────
const services = [
  "Wireless Engineering & Field Services",
  "Fiber Engineering & Splicing",
  "Data Center Installation",
  "Tower Installation & Audit",
  "Chipset & Device Testing",
  "Other / General Inquiry",
];

// ── Input component ───────────────────────────────────────────────
const Field = ({
  label, name, type = "text", placeholder, required = true,
  as = "input", options,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  required?: boolean; as?: "input" | "textarea" | "select"; options?: string[];
}) => {
  const [focused, setFocused] = useState(false);
  const base = "w-full bg-white border rounded-xl px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200";
  const ring = focused ? "border-blue-400 ring-2 ring-blue-100 shadow-sm" : "border-slate-200";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
        {label} {required && <span className="text-blue-500">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={5}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${base} ${ring} py-3 resize-none`}
        />
      ) : as === "select" ? (
        <select
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${base} ${ring} h-11 cursor-pointer`}
        >
          <option value="">Select a service…</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${base} ${ring} h-11`}
        />
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────
const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#f8faff]">

      {/* ── Background elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.10),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.08),transparent_65%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24">

        {/* ── HERO HEADER ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-5 mb-20"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]"
          >
            Let's build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              something great
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-500 text-lg max-w-xl leading-relaxed"
          >
            Whether you need a proposal, have a project in mind, or just want to
            learn what Integer Telecom can do for your network — we're ready.
          </motion.p>
        </motion.div>

        {/* ── CONTACT INFO CARDS ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactCards.map(({ icon, label, value, sub, href, color, lightBg, lightText }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-lg hover:shadow-blue-100/60 hover:border-blue-200 transition-all duration-300 overflow-hidden relative"
            >
              {/* Hover gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-11 h-11 rounded-xl ${lightBg} flex items-center justify-center shrink-0 ${lightText} group-hover:scale-110 transition-transform duration-200`}>
                {icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                <span className={`text-sm font-bold ${lightText}`}>{value}</span>
                <span className="text-xs text-slate-400">{sub}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* ── MAIN CONTENT: FORM + SIDEBAR ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: FORM ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[80px]" />

              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                  Send us a message
                </h2>
                <p className="text-slate-400 text-sm mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center gap-5 py-16"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-200">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                          Thank you for reaching out. A member of our team will contact you shortly.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-blue-600 text-sm font-semibold hover:underline"
                      >
                        Send another message →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="First Name"  name="firstName" placeholder="John" />
                        <Field label="Last Name"   name="lastName"  placeholder="Smith" />
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Email Address" name="email" type="email" placeholder="john@company.com" />
                        <Field label="Phone Number"  name="phone" type="tel"   placeholder="+1 (555) 000-0000" required={false} />
                      </div>

                      {/* Company */}
                      <Field label="Company / Organization" name="company" placeholder="Your company name" required={false} />

                      {/* Service */}
                      <Field label="Service of Interest" name="service" as="select" options={services} />

                      {/* Message */}
                      <Field label="Project Details" name="message" as="textarea" placeholder="Tell us about your project, timeline, location, and any specific requirements…" />

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400">
                        We respect your privacy. Your information is never shared.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: SIDEBAR ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {/* Dark info card */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
              {/* inner grid */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    Why Integer Telecom
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-snug">
                    Trusted by carriers across 30+ US states
                  </h3>
                </div>

                {/* Feature list */}
                {[
                  { icon: "⚡", text: "Fast turnaround — most proposals within 48 hours" },
                  { icon: "🛡️", text: "600+ certified field technicians on standby" },
                  { icon: "🌐", text: "US, Canada & India operations for global reach" },
                  { icon: "📋", text: "End-to-end service from planning to commissioning" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">{icon}</span>
                    <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}

                {/* Divider */}
                <div className="h-px bg-slate-700/60" />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: "30+",  l: "US States"    },
                    { v: "600+", l: "Experts"       },
                    { v: "24/7", l: "Operations"    },
                  ].map(({ v, l }) => (
                    <div key={l} className="flex flex-col gap-0.5">
                      <span className="text-2xl font-extrabold text-white leading-none">{v}</span>
                      <span className="text-slate-500 text-xs">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Office locations card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-5">
                <span className="w-4 h-[2px] bg-blue-500 rounded-full" />
                Our Offices
              </h4>
              <div className="flex flex-col gap-4">
                {[
                  { flag: "🇺🇸", city: "Plano, TX — USA",        addr: "4200 Mapleshade ln, Ste 100" },
                  { flag: "🇮🇳", city: "Noida, UP — India",      addr: "Corporate Park, 3rd Floor" },
                  { flag: "🇮🇳", city: "Tirupati, AP — India",   addr: "IIDT Building, Airport Road" },
                  { flag: "🇮🇳", city: "Hyderabad — India",      addr: "1st Floor, Gachibowli" },
                ].map(({ flag, city, addr }) => (
                  <div key={city} className="flex items-start gap-3 group">
                    <span className="text-xl leading-none mt-0.5">{flag}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{city}</p>
                      <p className="text-xs text-slate-400">{addr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-blue-500/20">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-white font-extrabold text-sm">Average Response Time</p>
                <p className="text-blue-100 text-xs mt-0.5">Our team typically replies within <span className="text-white font-bold">2–4 business hours</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
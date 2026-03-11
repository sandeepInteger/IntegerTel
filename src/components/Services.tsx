import { motion, type Variants, type Transition } from "framer-motion";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const spring: Transition = { duration: 0.6, ease: "easeOut" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const content = [
  {
    title: "Wireless Engineering & Field Services",
    points: [
      "4G/5G Network Design & Optimization",
      "Site Surveys & RF Performance Testing",
      "Small Cell & DAS Implementation",
    
    ],
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xl font-bold">
        Wireless Engineering
      </div>
    ),
  },
  {
    title: "Fiber Engineering & Splicing",
    points: [
      "OSP/ISP Fiber Path Design",
      "Precision Fusion Splicing & Testing",
      "End-to-End Fiber Characterization",
      
    ],
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-white text-xl font-bold">
        Fiber Engineering
      </div>
    ),
  },
  {
    title: "Data Center Installation",
    points: [
      "Rack, Power & Cooling Infrastructure",
      "Server & Network Hardware Deployment",
      "Smart Hands Maintenance Services",
      
    ],
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-white text-xl font-bold">
        Data Center
      </div>
    ),
  },
  {
    title: "Tower Installation & Audit",
    points: [
      "Structural Inspections & Audits",
      "Antenna & Radio Upgrades",
      "Microwave Backhaul Engineering",
      
    ],
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white text-xl font-bold">
        Tower Installation
      </div>
    ),
  },
  {
    title: "Chipset & Device Testing",
    points: [
      "Carrier Acceptance Testing (CAT)",
      "Field Interoperability Testing (FIT)",
      "Platform Certification & Validation",
      
    ],
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white text-xl font-bold">
        Device Testing
      </div>
    ),
  },
];

const Services = () => {
  return (
    <section className="w-full bg-white">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-4 py-20">

        <motion.p
          className="text-blue-500 text-sm font-semibold tracking-wide"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Services
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.08, ...spring }}
        >
          Comprehensive Telecom Engineering
        </motion.h2>

        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.16, ...spring }}
        >
          End-to-end engineering services delivered by a field force of 600+ experts across the US, Canada, and India.
        </motion.p>
      </div>

      {/* StickyScroll — no wrapper, no overflow, no padding */}
      <StickyScroll content={content} />

    </section>
  );
};

export default Services;
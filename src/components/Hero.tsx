import { Globe } from "./ui/globe";




const roleLabels = [
  { label: "Unites States",               className: "top-[8%] left-[38%]"  },
  { label: "India",  className: "top-[25%] left-[42%]"  },
  { label: "Canada",          className: "top-[65%] left-[4%]"  },
 
];

const Hero = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-green-50 flex items-center overflow-hidden relative">

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

        {/* ── LEFT CONTENT ── */}
        <div className="flex flex-col gap-7 flex-1 max-w-lg items-start text-left">
          <div className="absolute top-1/2 left-1/8 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[150px] bg-[radial-gradient(ellipse_at_center,#e8f5a3_0%,#d4ed6a_20%,transparent_70%)] opacity-60 blur-2xl pointer-events-none" />
          {/* Bottom-left blob — matches image */}
          <div className="absolute -bottom-10 -left-10 w-[450px] h-[350px] bg-[radial-gradient(ellipse_at_bottom_left,#93c5d4_0%,#a8d4c8_30%,transparent_70%)] opacity-60 blur-[80px] pointer-events-none" />

          {/* Badge */}
          <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
            <span className="text-base">↗</span>
            Now Scaling in 30+ States
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-5xl font-extrabold leading-[1.07] tracking-tight text-slate-900 m-0">
            Engineering & Enabling the
            <br />
            <span className="text-blue-600">Networks That Power Tomorrow</span>
          </h1>
          
          

          {/* Subtext */}
          <p className="text-[15px] leading-relaxed text-gray-500 max-w-sm m-0">
            Wireless, fiber, chipset, tower, and data center engineering — delivered with precision, 
            <br />
            speed, and trusted field teams across 30+ U.S. states.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-5 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer border-none">
              Request a Proposal
            </button>
            <button className="bg-transparent border-none text-slate-900 hover:text-blue-600 font-semibold text-sm flex items-center gap-1.5 py-3 transition-colors duration-200 cursor-pointer">
              Talk to an Expert
              <span className="text-base">›</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT: GLOBE ── */}
        <div className="flex-1 flex justify-center items-center relative min-h-[340px] w-full max-w-[480px]">

          {/* Floating role labels — hidden on mobile, visible sm+ */}
          {roleLabels.map(({ label, className }) => (
            <div
              key={label}
              className={`absolute ${className} bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 text-[11.5px] font-semibold text-slate-800 whitespace-nowrap shadow-md hidden sm:flex items-center gap-1.5 z-10`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block shrink-0" />
              {label}
            </div>
          ))}

          {/* Globe */}
          <div className="w-full aspect-square max-w-[460px]">
            <Globe />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
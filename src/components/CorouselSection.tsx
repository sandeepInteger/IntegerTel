import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── Replace just the carousel section in your ChooseInteger component ──

const CarouselSection = ({ cards }: { cards: any[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(360);
  const gap = 20;
  const visibleCount = 3;

  const [index, setIndex] = useState(0);
  const maxIndex = cards.length - visibleCount;

  // Measure container and set card width to exactly fill 3 slots
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const containerWidth = trackRef.current.offsetWidth;
        // card = (container - 2 gaps) / 3 cards
        const computed = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
        setCardWidth(computed);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Slide amount = (cardWidth + gap) * index
  const translateX = index * (cardWidth + gap);

  return (
    <div className="relative w-full max-w-6xl mt-16 px-10">

      {/* Left arrow */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Overflow clip track */}
      <div ref={trackRef} className="overflow-hidden w-full">
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: -translateX }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              // Exact measured width — never shrinks or grows
              style={{ minWidth: cardWidth, maxWidth: cardWidth }}
              className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {card.title}
              </h3>
              <p className="text-blue-500 text-sm font-semibold">{card.subtitle}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right arrow */}
      <button
        onClick={next}
        disabled={index >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-blue-500" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
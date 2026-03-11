"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

type ContentItem = {
  title: string;
  description?: string;       // optional single para
  points?: string[];          // optional bullet points
  content?: React.ReactNode;
};

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ContentItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLength = content.length;

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrolled = -rect.top;
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    const progress = Math.max(0, Math.min(1, scrolled / scrollable));
    const index = Math.min(Math.floor(progress * cardLength), cardLength - 1);
    setActiveCard(index);
  });

  const backgroundColors = ["#0f172a", "#000000", "#171717"];

  return (
    <div
      ref={containerRef}
      style={{ height: `${cardLength * 100}vh` }}
      className="relative w-full"
    >
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="max-w-6xl w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {content.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === activeCard ? "w-8 bg-blue-400" : "w-2 bg-slate-600"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-xs text-slate-500 font-medium tracking-widest">
                    {String(activeCard + 1).padStart(2, "0")} /{" "}
                    {String(cardLength).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight tracking-tight">
                  {content[activeCard].title}
                </h2>

                {/* Single paragraph — if description provided */}
                {content[activeCard].description && (
                  <p className="text-slate-400 text-base leading-relaxed max-w-md">
                    {content[activeCard].description}
                  </p>
                )}

                {/* Bullet points — if points array provided */}
                {content[activeCard].points && (
                  <ul className="flex flex-col gap-3">
                    {content[activeCard].points!.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
                        className="flex items-start gap-3 text-slate-300 text-base leading-relaxed"
                      >
                        {/* Blue dot */}
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — visual */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 0.93, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "h-72 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl",
                  contentClassName
                )}
              >
                {content[activeCard].content ?? null}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
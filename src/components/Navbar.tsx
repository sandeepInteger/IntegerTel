"use client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",     href: "/" },
  {
    label: "Services",
    href: "#",
    dropdown: [
      { label: "Wireless Engineering",  href: "#", icon: "📡" },
      { label: "Fiber Engineering",     href: "#", icon: "🔌" },
      { label: "Data Centers",          href: "#", icon: "🖥️" },
      { label: "Tower Installation",    href: "#", icon: "🗼" },
      { label: "Chipset & Testing",     href: "#", icon: "🔬" },
    ],
  },
  { label: "About",    href: "#" },
  { label: "Projects", href: "#" },
  { label: "Career",   href: "#" },
  { label: "Contact",  href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Add shadow + bg on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm shadow-slate-200/60 border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[70px]">

            {/* ── Logo ── */}
            <Link to="#" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <path
                    d="M12 2L4 6v5c0 4.97 3.47 9.63 8 10.93C16.53 20.63 20 15.97 20 11V6l-8-4z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="leading-none">
                <span className="text-slate-900 font-extrabold text-[15px] tracking-tight block">
                  Integer Telecom
                </span>
                <span className="text-blue-500 text-[10px] font-semibold tracking-widest uppercase">
                  Services Inc.
                </span>
              </div>
            </Link>

            {/* ── Desktop links ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  // Services dropdown
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-150">
                      {link.label}
                      <motion.svg
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-slate-400"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden py-2"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                            >
                              <span className="text-base">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="tel:+1234567890"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors duration-150 font-medium"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                +1 (972) 539-4100  
              </Link>
              <Link
                to="#contact"
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-blue-400/30 active:scale-95 transition-all duration-200"
              >
                Get a Quote
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-slate-100 transition-colors duration-150"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1.5px] bg-slate-700 rounded-full origin-center transition-all"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-5 h-[1.5px] bg-slate-700 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1.5px] bg-slate-700 rounded-full origin-center transition-all"
              />
            </button>

          </div>
        </div>

        {/* ── Top accent line ── */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl shadow-slate-900/20 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                      <path d="M12 2L4 6v5c0 4.97 3.47 9.63 8 10.93C16.53 20.63 20 15.97 20 11V6l-8-4z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-slate-900 font-extrabold text-sm">Integer Telecom</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      onClick={() => !link.dropdown && setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                    {/* Mobile sub-links */}
                    {link.dropdown && (
                      <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5 border-l-2 border-blue-100 pl-3">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-2 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                          >
                            <span>{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Drawer footer CTA */}
              <div className="px-5 py-5 border-t border-slate-100 flex flex-col gap-3">
                <Link
                  to="tel:+1234567890"
                  className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium py-2.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:text-blue-600 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  Call Us
                </Link>
                <Link
                  to="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-full text-center shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-200"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
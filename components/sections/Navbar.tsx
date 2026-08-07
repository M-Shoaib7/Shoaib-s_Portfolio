"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          padding: "0 24px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(5,8,22,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(145,94,255,0.15)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          style={{ textDecoration: "none" }}
          whileHover={{ scale: 1.05 }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg, #915EFF, #00D8FF)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              color: "white",
              boxShadow: "0 0 20px rgba(145,94,255,0.4)",
            }}
          >
            MS
          </div>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none",
                border: "none",
                padding: "8px 14px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: active === link.href.slice(1) ? "#915EFF" : "#ADB7BE",
                cursor: "pointer",
                borderRadius: 8,
                transition: "all 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "#F3F4F6"; }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color =
                  active === link.href.slice(1) ? "#915EFF" : "#ADB7BE";
              }}
            >
              {link.label}
              {active === link.href.slice(1) && (
                <motion.div
                  layoutId="activeNav"
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#915EFF",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right: CV + Mobile */}
        <div className="flex items-center gap-3">
          <a
            href="/resume"
            className="hidden md:flex items-center gap-2 btn-violet"
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              color: "white",
            }}
          >
            <Download size={15} />
            Download CV
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "rgba(145,94,255,0.1)",
              border: "1px solid rgba(145,94,255,0.3)",
              borderRadius: 8,
              padding: 8,
              color: "#915EFF",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 8999,
              background: "rgba(5,8,22,0.98)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: active === link.href.slice(1) ? "#915EFF" : "#F3F4F6",
                  cursor: "pointer",
                  padding: "12px 32px",
                  borderRadius: 12,
                  transition: "all 0.3s",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="/resume"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="btn-violet"
              style={{
                marginTop: 24,
                padding: "12px 32px",
                borderRadius: 12,
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Download size={18} />
              Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import { GitBranch, Link, MessageCircle, ExternalLink, ArrowUp } from "lucide-react";
import StarField from "@/components/ui/StarField";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: <GitBranch size={20} />, href: "https://github.com/muhammadshoaib", label: "GitHub", color: "#F3F4F6" },
  { icon: <Link size={20} />, href: "https://linkedin.com/in/muhammadshoaib", label: "LinkedIn", color: "#0A66C2" },
  { icon: <ExternalLink size={20} />, href: "https://fiverr.com/muhammadshoaib", label: "Fiverr", color: "#1DBF73" },
  { icon: <ExternalLink size={20} />, href: "https://upwork.com/freelancers/shoaib", label: "Upwork", color: "#6FDA44" },
  { icon: <MessageCircle size={20} />, href: "https://wa.me/923001234567", label: "WhatsApp", color: "#25D366" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      background: "#050816",
      borderTop: "1px solid rgba(145,94,255,0.1)",
      position: "relative",
      overflow: "hidden",
    }}>
      <StarField count={60} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 200,
        background: "radial-gradient(ellipse, rgba(145,94,255,0.08), transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px", position: "relative", zIndex: 1 }}>
        {/* Top: logo + name */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: "inline-block", marginBottom: 16 }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px",
              background: "linear-gradient(135deg, #915EFF, #00D8FF)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: "white",
              boxShadow: "0 0 30px rgba(145,94,255,0.4)",
            }}>
              MS
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800, color: "#F3F4F6",
              marginBottom: 8,
            }}
          >
            Muhammad Shoaib
          </motion.h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: "#ADB7BE", marginBottom: 6,
          }}>
            Full Stack Developer &amp; UI/UX Designer
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, color: "#915EFF",
          }}>
            Karachi, Pakistan 🇵🇰
          </p>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 24px", marginBottom: 32 }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none", border: "none",
                fontFamily: "'Inter', sans-serif", fontSize: 14,
                color: "#ADB7BE", cursor: "pointer",
                transition: "color 0.3s",
                padding: "4px 0",
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "#915EFF"; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = "#ADB7BE"; }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}>
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              title={s.label}
              whileHover={{ scale: 1.2, y: -4 }}
              style={{
                width: 46, height: 46, borderRadius: 12,
                background: "rgba(28,28,46,0.8)",
                border: "1px solid rgba(145,94,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ADB7BE", textDecoration: "none", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = s.color;
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${s.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#ADB7BE";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(145,94,255,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(145,94,255,0.3), transparent)",
          marginBottom: 24,
        }} />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#ADB7BE" }}>
            © 2024 Muhammad Shoaib. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#ADB7BE" }}>
            Built with ❤️ using Next.js &amp; Tailwind CSS
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(145,94,255,0.1)",
              border: "1px solid rgba(145,94,255,0.3)",
              borderRadius: 8, padding: "6px 14px",
              fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: "#915EFF", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.3s",
            }}
          >
            <ArrowUp size={14} /> Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

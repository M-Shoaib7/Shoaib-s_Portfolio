"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, GitBranch, Link, MessageCircle, ArrowRight, ExternalLink } from "lucide-react";
import StarField from "@/components/ui/StarField";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(145,94,255,0.3), transparent)" }} />
    </div>
  ),
});

const TYPING_TEXTS = [
  "Full Stack Developer", "UI/UX Designer", "Next.js Expert",
  "React Developer", "Problem Solver", "Digital Creator",
];

function useTypingEffect(texts: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setTextIdx(t => (t + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);
  return displayed;
}

function useGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good Morning!";
  if (h >= 12 && h < 17) return "Good Afternoon!";
  if (h >= 17 && h < 21) return "Good Evening!";
  return "Good Night!";
}

const socials = [
  { icon: <GitBranch size={18} />, label: "GitHub", href: "https://github.com/M-Shoaib7", color: "#F3F4F6" },
  { icon: <Link size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/m-shoaib7/", color: "#0A66C2" },
  { icon: <ExternalLink size={18} />, label: "Fiverr", href: "https://fiverr.com/muhammadshoaib", color: "#1DBF73" },
  { icon: <ExternalLink size={18} />, label: "Upwork", href: "https://upwork.com/freelancers/shoaib", color: "#6FDA44" },
  { icon: <MessageCircle size={18} />, label: "WhatsApp", href: "https://wa.me/923249250789", color: "#25D366" },
];

const statCards = [
  { value: "5+", label: "Years Experience", color: "#915EFF" },
  { value: "50+", label: "Projects Completed", color: "#00D8FF" },
  { value: "20+", label: "Happy Clients", color: "#FF6B9D" },
];

export default function Hero() {
  const typing = useTypingEffect(TYPING_TEXTS);
  const greeting = useGreeting();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orb1X = useTransform(mouseX, [0, 1], [-30, 30]);
  const orb1Y = useTransform(mouseY, [0, 1], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, 1], [20, -20]);
  const orb2Y = useTransform(mouseY, [0, 1], [15, -15]);
  const springOrb1X = useSpring(orb1X, { stiffness: 50, damping: 20 });
  const springOrb1Y = useSpring(orb1Y, { stiffness: 50, damping: 20 });
  const springOrb2X = useSpring(orb2X, { stiffness: 40, damping: 20 });
  const springOrb2Y = useSpring(orb2Y, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={containerRef} style={{ minHeight: "100vh", background: "#050816", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 70 }}>
      <StarField count={300} />

      {/* Orbs */}
      <motion.div style={{ position: "absolute", top: "10%", right: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(145,94,255,0.15) 0%, transparent 70%)", filter: "blur(60px)", x: springOrb1X, y: springOrb1Y, pointerEvents: "none" }} />
      <motion.div style={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,216,255,0.10) 0%, transparent 70%)", filter: "blur(60px)", x: springOrb2X, y: springOrb2Y, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Responsive grid — 2-col desktop, 1-col mobile via CSS class */}
      <div className="hero-grid">
        {/* LEFT CONTENT */}
        <div style={{ position: "relative", zIndex: 10 }}>
          {/* Greeting */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.0, duration: 0.6 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(11px,1.3vw,14px)", color: "#ADB7BE", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#915EFF" }}>←</span> {greeting} — Hi, I&apos;m
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 0.8 }}>
            <h1 className="hero-name glitch-text" data-text="Muhammad" style={{ color: "#F3F4F6", display: "block" }}>Muhammad</h1>
            <h1 className="hero-name" style={{ color: "#915EFF", display: "block", textShadow: "0 0 40px rgba(145,94,255,0.5)" }}>Shoaib</h1>
          </motion.div>

          {/* Typing effect */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.3 }}
            style={{ fontSize: "clamp(13px,1.8vw,20px)", fontFamily: "'Inter',sans-serif", color: "#ADB7BE", marginTop: 12, marginBottom: 16, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span>I am a </span>
            <span style={{ color: "#915EFF", fontWeight: 600 }}>{typing}</span>
            <span className="typewriter-cursor" />
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }}
            style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.3vw,16px)", lineHeight: 1.8, marginBottom: 24, maxWidth: 520 }}>
            I craft pixel-perfect digital experiences that combine beautiful design with powerful functionality.
            Based in Karachi, Pakistan — working worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.7 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <motion.button onClick={scrollToProjects} className="btn-violet" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "12px 22px", borderRadius: 12, fontSize: "clamp(13px,1.4vw,15px)", fontFamily: "'Inter',sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", minHeight: 48 }}>
              View My Work <ArrowRight size={15} />
            </motion.button>
            <motion.button onClick={scrollToContact} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "12px 22px", borderRadius: 12, fontSize: "clamp(13px,1.4vw,15px)", fontFamily: "'Inter',sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: "transparent", border: "1px solid #915EFF", color: "#915EFF", minHeight: 48 }}>
              <MessageCircle size={15} /> Let&apos;s Talk
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.9 }}
            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {socials.map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                whileHover={{ scale: 1.2, y: -3 }}
                style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(28,28,46,0.8)", border: "1px solid rgba(145,94,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ADB7BE", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(145,94,255,0.6)"; el.style.color = s.color; el.style.boxShadow = "0 0 15px rgba(145,94,255,0.3)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(145,94,255,0.2)"; el.style.color = "#ADB7BE"; el.style.boxShadow = "none"; }}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats — mobile only, shown via .hero-stats-mobile CSS class */}
          <div className="hero-stats-mobile" style={{ display: "none" }}>
            {statCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.0 + i * 0.1 }}
                style={{ background: "rgba(28,28,46,0.8)", backdropFilter: "blur(12px)", border: `1px solid ${card.color}40`, borderRadius: 14, padding: "12px 16px", flex: 1, minWidth: 90, textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: card.color }}>{card.value}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "#ADB7BE" }}>{card.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: 3D canvas + floating stat cards — desktop only */}
        <div className="hero-right hero-stats-desktop">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.2, duration: 1 }}
            style={{ position: "absolute", inset: 0 }}>
            <HeroCanvas />
          </motion.div>
          {statCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.0 + i * 0.15 }}
              className={`hero-stat-card-${i}`}
              style={{ background: "rgba(28,28,46,0.8)", backdropFilter: "blur(12px)", border: `1px solid ${card.color}40`, borderRadius: 16, padding: "14px 20px", boxShadow: `0 0 20px ${card.color}20`, zIndex: 20, minWidth: 130 }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE" }}>{card.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}
        style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#ADB7BE", fontSize: 10, fontFamily: "'Inter',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", zIndex: 10 }}>
        <div style={{ width: 22, height: 36, border: "2px solid rgba(145,94,255,0.4)", borderRadius: 11, display: "flex", justifyContent: "center", padding: "3px 0" }}>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ width: 3, height: 7, background: "#915EFF", borderRadius: 2 }} />
        </div>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowDown size={13} color="#915EFF" /></motion.div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}

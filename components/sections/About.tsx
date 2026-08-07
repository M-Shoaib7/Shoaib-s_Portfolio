"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Globe, Briefcase, MessageSquare, Download } from "lucide-react";

const whatIDo = [
  { icon: "🌐", title: "Web Development", desc: "Building fast, responsive, and scalable web applications using modern technologies", color: "#915EFF" },
  { icon: "🎨", title: "UI/UX Design", desc: "Crafting beautiful, intuitive interfaces that users love to interact with", color: "#FF6B9D" },
  { icon: "📱", title: "Mobile Development", desc: "Creating cross-platform mobile experiences with React Native", color: "#00D8FF" },
  { icon: "⚡", title: "Performance Optimization", desc: "Making applications lightning-fast with best practices and optimization techniques", color: "#FFD700" },
];

const details = [
  { icon: <Mail size={15} />, label: "Email", value: "mshoaib249250@gmail.com" },
  { icon: <MapPin size={15} />, label: "Location", value: "Karachi, Pakistan" },
  { icon: <Globe size={15} />, label: "Available", value: "Worldwide (Remote)" },
  { icon: <Briefcase size={15} />, label: "Status", value: "Open to Work", highlight: true },
  { icon: <MessageSquare size={15} />, label: "Languages", value: "Urdu, English" },
];

const techBadges = [
  { label: "React", color: "#61DAFB", pos: { top: "5%", right: "-10%" } },
  { label: "Next.js", color: "#915EFF", pos: { top: "28%", right: "-12%" } },
  { label: "Figma", color: "#FF6B9D", pos: { bottom: "28%", left: "-12%" } },
  { label: "Node.js", color: "#6FDA44", pos: { bottom: "5%", left: "-8%" } },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="section-pad" style={{ background: "#050816", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(145,94,255,0.06), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} custom={0} variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 16 }}>
          <span className="section-label">INTRODUCTION</span>
        </motion.div>
        <motion.h2 initial="hidden" animate={inView ? "visible" : "hidden"} custom={1} variants={fadeUp}
          className="section-heading" style={{ textAlign: "center", color: "#F3F4F6", marginBottom: "clamp(32px,5vw,64px)" }}>
          About <span className="gradient-text-violet">Me</span>
        </motion.h2>

        {/* Responsive 2-col grid → 1-col on mobile */}
        <div className="about-grid">
          {/* LEFT: Photo */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
            style={{ position: "relative" }}>
            <div className="about-photo-frame" style={{ width: "100%", aspectRatio: "4/5", borderRadius: 24, background: "linear-gradient(135deg, rgba(145,94,255,0.2), rgba(0,216,255,0.1))", border: "1px solid rgba(145,94,255,0.3)", boxShadow: "0 0 40px rgba(145,94,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", maxWidth: 400, margin: "0 auto" }}>
              <div style={{ width: 140, height: 140, borderRadius: "50%", background: "linear-gradient(135deg, #915EFF, #00D8FF)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontSize: 48, fontWeight: 800, color: "white", boxShadow: "0 0 60px rgba(145,94,255,0.5)" }}>MS</div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(145,94,255,0.1))" }} />
              {[...Array(6)].map((_, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${(i+1)*16.66}%`, height: 1, background: "rgba(145,94,255,0.06)" }} />)}
              {[...Array(4)].map((_, i) => <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i+1)*25}%`, width: 1, background: "rgba(145,94,255,0.06)" }} />)}
            </div>

            {/* Floating tech badges */}
            {techBadges.map((badge, i) => (
              <motion.div key={badge.label} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
                style={{ position: "absolute", ...badge.pos, background: "rgba(28,28,46,0.9)", border: `1px solid ${badge.color}50`, borderRadius: 10, padding: "7px 12px", fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: badge.color, backdropFilter: "blur(12px)", boxShadow: `0 0 15px ${badge.color}20`, whiteSpace: "nowrap", zIndex: 10 }}>
                {badge.label}
              </motion.div>
            ))}

            {/* Experience badge */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              style={{ position: "absolute", bottom: -16, right: 8, background: "rgba(28,28,46,0.95)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 50, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(12px)", boxShadow: "0 0 20px rgba(255,215,0,0.2)", zIndex: 20 }}>
              <span style={{ color: "#FFD700", fontSize: 16 }}>⭐</span>
              <div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: "#FFD700" }}>5+ Years</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "#ADB7BE" }}>Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <div style={{ paddingTop: 8 }}>
            {["I'm Muhammad Shoaib, a passionate Full Stack Developer and UI/UX Designer based in Karachi, Pakistan. With over 5 years of experience in crafting digital solutions, I specialize in building exceptional websites, applications, and digital experiences that live on the internet.",
              "I have a deep passion for creating products that are not only visually stunning but also highly functional and user-friendly. From concept to deployment, I handle the full spectrum of web development — bringing your vision to life with clean code and beautiful design.",
              "When I'm not coding, I'm constantly learning new technologies, exploring design trends, and working on personal projects that push the boundaries of what's possible on the web."].map((para, i) => (
              <motion.p key={i} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 2} variants={fadeUp}
                style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.3vw,15px)", lineHeight: 1.9, marginBottom: 14 }}>
                {para}
              </motion.p>
            ))}

            {/* What I Do */}
            <motion.h3 initial="hidden" animate={inView ? "visible" : "hidden"} custom={5} variants={fadeUp}
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, color: "#F3F4F6", marginTop: 28, marginBottom: 14 }}>
              What I Do
            </motion.h3>
            <div className="about-what-grid">
              {whatIDo.map((item, i) => (
                <motion.div key={item.title} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 6} variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: `0 0 20px ${item.color}25` }}
                  style={{ background: "rgba(28,28,46,0.6)", border: `1px solid ${item.color}30`, borderRadius: 14, padding: 14, transition: "all 0.3s" }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 700, color: "#F3F4F6", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#ADB7BE", lineHeight: 1.6 }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Personal details */}
            <div className="about-details-grid">
              {details.map(d => (
                <div key={d.label} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#915EFF", flexShrink: 0, marginTop: 1 }}>{d.icon}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(11px,1.2vw,13px)", color: "#ADB7BE" }}>
                    <span style={{ color: "#F3F4F6", fontWeight: 500 }}>{d.label}: </span>
                    <span style={d.highlight ? { color: "#22c55e" } : {}}>{d.value}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <motion.a href="/resume" className="btn-violet" initial="hidden" animate={inView ? "visible" : "hidden"} custom={11} variants={fadeUp}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none", color: "white", minHeight: 48 }}>
              <Download size={15} /> Download CV
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

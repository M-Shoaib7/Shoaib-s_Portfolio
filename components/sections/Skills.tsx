"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { shoaibData } from "@/lib/data";

const categories = [
  { title: "Frontend", icon: "🖥️", color: "#915EFF", skills: shoaibData.skills.frontend },
  { title: "Backend", icon: "⚙️", color: "#00D8FF", skills: shoaibData.skills.backend },
  { title: "Design & Tools", icon: "🎨", color: "#FF6B9D", skills: shoaibData.skills.design },
  { title: "DevOps & Others", icon: "🚀", color: "#FFD700", skills: shoaibData.skills.devops },
];

const techIcons = [
  { name: "React", color: "#61DAFB" }, { name: "Next.js", color: "#915EFF" },
  { name: "TypeScript", color: "#3178C6" }, { name: "Node.js", color: "#6FDA44" },
  { name: "Python", color: "#FFD43B" }, { name: "MongoDB", color: "#47A248" },
  { name: "Figma", color: "#FF6B9D" }, { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" }, { name: "Git", color: "#F05032" },
  { name: "GraphQL", color: "#E10098" }, { name: "PostgreSQL", color: "#4169E1" },
  { name: "Redux", color: "#764ABC" }, { name: "Tailwind", color: "#38BDF8" },
  { name: "Firebase", color: "#FFCA28" }, { name: "Vue.js", color: "#4FC08D" },
];

function SkillBar({ skill, percent, index }: { skill: string; percent: number; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(12px,1.3vw,14px)", fontWeight: 500, color: "#F3F4F6" }}>{skill}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#915EFF" }}>{percent}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(145,94,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${percent}%` } : {}}
          transition={{ delay: index * 0.1, duration: 1.2, ease: "easeOut" }}
          style={{ height: "100%", background: "linear-gradient(90deg, #915EFF, #00D8FF)", borderRadius: 3, boxShadow: "0 0 10px rgba(145,94,255,0.5)" }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="skills" ref={ref} className="section-pad" style={{ background: "#050816", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,216,255,0.05), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,64px)" }}>
          <span className="section-label">WHAT I KNOW</span>
          <h2 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            My Skills & <span className="gradient-text-violet">Expertise</span>
          </h2>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.4vw,16px)", marginTop: 16, maxWidth: 560, margin: "16px auto 0" }}>
            Technologies I&apos;ve mastered over 5+ years of professional development
          </p>
        </motion.div>

        {/* Category Cards — 4 col → 2 col → 1 col via CSS */}
        <div className="skills-categories-grid">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 0 30px ${cat.color}25` }}
              style={{ background: "rgba(28,28,46,0.7)", border: `1px solid ${cat.color}25`, borderRadius: 20, padding: "22px 18px", backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{cat.icon}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 700, color: cat.color, marginBottom: 14 }}>{cat.title}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(9px,1vw,11px)", color: "#ADB7BE", background: `${cat.color}10`, border: `1px solid ${cat.color}20`, borderRadius: 6, padding: "3px 7px" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars — 2 col → 1 col via CSS */}
        <div className="skills-bars-grid">
          {shoaibData.proficiency.map((item, i) => (
            <SkillBar key={item.skill} skill={item.skill} percent={item.percent} index={i} />
          ))}
        </div>

        {/* Tech Icons Cloud */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, color: "#F3F4F6", marginBottom: 28 }}>
            Tech Stack
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techIcons.map((tech, i) => (
              <motion.div key={tech.name}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 + (i % 4), delay: i * 0.2 }}
                whileHover={{ scale: 1.15 }}
                title={tech.name}
                style={{ width: 58, height: 58, borderRadius: 14, background: "rgba(28,28,46,0.8)", border: `1px solid ${tech.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${tech.color}80`; el.style.boxShadow = `0 0 20px ${tech.color}30`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${tech.color}30`; el.style.boxShadow = "none"; }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${tech.color}20`, border: `2px solid ${tech.color}` }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, color: "#ADB7BE", textAlign: "center", lineHeight: 1.2 }}>
                  {tech.name.length > 7 ? tech.name.slice(0, 7) : tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

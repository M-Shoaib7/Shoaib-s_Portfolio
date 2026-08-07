"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { shoaibData } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

function TimelineCard({ color, period, title, sub, type, bullets, gpa, honor, distinction, icon }: {
  color: string; period: string; title: string; sub: string;
  type?: string; bullets?: string[]; gpa?: string; honor?: string; distinction?: boolean;
  icon: "work" | "edu";
}) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 20, padding: "3px 11px", marginBottom: 9, display: "inline-block" }}>{period}</div>
      <motion.div whileHover={{ y: -4, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${color}20` }}
        style={{ background: "rgba(28,28,46,0.8)", border: `1px solid ${color}20`, borderRadius: 16, padding: "18px 20px", backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, ${color}80)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
            {icon === "work" ? <Briefcase size={13} /> : <GraduationCap size={13} />}
          </div>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(13px,1.4vw,15px)", fontWeight: 700, color: "#F3F4F6" }}>{title}</h3>
        </div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color, fontWeight: 600, marginBottom: 3, paddingLeft: 36 }}>{sub}</div>
        {type && (
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#ADB7BE", marginBottom: 10, paddingLeft: 36, display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={10} /> {type}
          </div>
        )}
        {gpa && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#FFD700", marginBottom: 6, paddingLeft: 36 }}>GPA: {gpa}{distinction ? " · Distinction" : ""}</div>}
        {honor && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#FFD700", marginBottom: 6, paddingLeft: 36 }}>{honor}</div>}
        {bullets && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(11px,1.1vw,12px)", color: "#ADB7BE", lineHeight: 1.7, display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 3 }}>
                <span style={{ color, marginTop: 4, flexShrink: 0 }}>▸</span>{b}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const leftItems = shoaibData.experience;
  const rightItems = shoaibData.education;
  const maxRows = Math.max(leftItems.length, rightItems.length);

  return (
    <section id="experience" ref={ref} className="section-pad" style={{ background: "linear-gradient(180deg, #050816 0%, #080b1a 50%, #050816 100%)", position: "relative" }}>
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,216,255,0.05), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,72px)" }}>
          <span className="section-label">MY JOURNEY</span>
          <h2 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            Experience & <span className="gradient-text-violet">Education</span>
          </h2>
        </motion.div>

        {/* ===== DESKTOP TIMELINE (3-col, hidden on mobile via CSS) ===== */}
        <div className="timeline-outer">
          {/* Column labels */}
          <div style={{ display: "contents" }}>
            <div style={{ textAlign: "right", paddingRight: 28, paddingBottom: 28, gridColumn: 1 }}>
              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: "#915EFF", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 7 }}>
                <Briefcase size={16} /> Work Experience
              </motion.div>
            </div>
            <div style={{ gridColumn: 2 }} />
            <div style={{ paddingLeft: 28, paddingBottom: 28, gridColumn: 3 }}>
              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: "#00D8FF", display: "flex", alignItems: "center", gap: 7 }}>
                <GraduationCap size={16} /> Education
              </motion.div>
            </div>
          </div>

          {Array.from({ length: maxRows }).map((_, row) => {
            const exp = leftItems[row];
            const edu = rightItems[row];
            return (
              <div key={row} style={{ display: "contents" }}>
                {/* Left */}
                <div style={{ paddingRight: 28, paddingBottom: 28, gridColumn: 1 }}>
                  {exp && (
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: row * 0.15 + 0.2 }} style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#915EFF", background: "rgba(145,94,255,0.1)", border: "1px solid rgba(145,94,255,0.25)", borderRadius: 20, padding: "3px 11px", marginBottom: 9, display: "inline-block" }}>{exp.period}</div>
                      <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(145,94,255,0.2)" }}
                        style={{ background: "rgba(28,28,46,0.8)", border: "1px solid rgba(145,94,255,0.2)", borderRadius: 16, padding: "18px 20px", backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#F3F4F6", marginBottom: 3 }}>{exp.role}</h3>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#915EFF", fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#ADB7BE", marginBottom: 10, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-start" }}>
                          <MapPin size={10} /> {exp.type}
                        </div>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {exp.bullets.map((b, i) => (
                            <li key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#ADB7BE", lineHeight: 1.7, display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 3 }}>
                              <span style={{ color: "#915EFF", marginTop: 4, flexShrink: 0 }}>▸</span>{b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* Center */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", gridColumn: 2 }}>
                  <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ delay: row * 0.1, duration: 0.6 }}
                    style={{ position: "absolute", top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #915EFF, #00D8FF)", transformOrigin: "top" }} />
                  <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: row * 0.15 + 0.3, type: "spring" }}
                    style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #915EFF, #00D8FF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", zIndex: 2, flexShrink: 0, boxShadow: "0 0 20px rgba(145,94,255,0.5)", marginTop: 6 }}>
                    {exp ? <Briefcase size={13} /> : <GraduationCap size={13} />}
                  </motion.div>
                </div>

                {/* Right */}
                <div style={{ paddingLeft: 28, paddingBottom: 28, gridColumn: 3 }}>
                  {edu && (
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: row * 0.15 + 0.2 }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#00D8FF", background: "rgba(0,216,255,0.1)", border: "1px solid rgba(0,216,255,0.25)", borderRadius: 20, padding: "3px 11px", marginBottom: 9, display: "inline-block" }}>{edu.period}</div>
                      <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,216,255,0.2)" }}
                        style={{ background: "rgba(28,28,46,0.8)", border: "1px solid rgba(0,216,255,0.2)", borderRadius: 16, padding: "18px 20px", backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#F3F4F6", marginBottom: 3 }}>{edu.degree}</h3>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#00D8FF", fontWeight: 600, marginBottom: 3 }}>{edu.institution}</div>
                        {edu.location && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#ADB7BE", marginBottom: 7, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} />{edu.location}</div>}
                        {edu.gpa && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#FFD700" }}>GPA: {edu.gpa}{edu.distinction ? " · Distinction" : ""}</div>}
                        {edu.honor && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#FFD700" }}>{edu.honor}</div>}
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== MOBILE TIMELINE (single column, hidden on desktop via CSS) ===== */}
        <div className="timeline-mobile" style={{ display: "none" }}>
          {/* Work Experience */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 0" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #915EFF, #7B4FD9)", display: "flex", alignItems: "center", justifyContent: "center" }}><Briefcase size={15} color="white" /></div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#915EFF" }}>Work Experience</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, borderLeft: "2px solid rgba(145,94,255,0.3)", paddingLeft: 16 }}>
              {leftItems.map((exp, i) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1 }}>
                  <TimelineCard color="#915EFF" period={exp.period} title={exp.role} sub={exp.company} type={exp.type} bullets={exp.bullets} icon="work" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 0" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00D8FF, #0099CC)", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={15} color="white" /></div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#00D8FF" }}>Education</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, borderLeft: "2px solid rgba(0,216,255,0.3)", paddingLeft: 16 }}>
              {rightItems.map((edu, i) => (
                <motion.div key={edu.id} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1 + 0.3 }}>
                  <TimelineCard color="#00D8FF" period={edu.period} title={edu.degree} sub={edu.institution} gpa={edu.gpa} honor={edu.honor} distinction={edu.distinction} icon="edu" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

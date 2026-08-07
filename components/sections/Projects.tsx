"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { shoaibData } from "@/lib/data";
import { X, ExternalLink, GitBranch, Check, ChevronRight } from "lucide-react";

const filters = ["All", "Web App", "E-Commerce", "SaaS"];

function ProjectMockup({ color, number }: { color: string; number: string }) {
  return (
    <div style={{ width: "100%", aspectRatio: "16/9", background: `linear-gradient(135deg, ${color}15, rgba(28,28,46,0.8))`, borderRadius: "12px 12px 0 0", position: "relative", overflow: "hidden", borderBottom: `1px solid ${color}30` }}>
      <div style={{ height: 26, background: "rgba(5,8,22,0.8)", borderBottom: `1px solid ${color}20`, display: "flex", alignItems: "center", padding: "0 10px", gap: 5 }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, height: 14, background: "rgba(145,94,255,0.1)", borderRadius: 3, marginLeft: 7 }} />
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ height: 14, width: "60%", background: `${color}30`, borderRadius: 3 }} />
        <div style={{ height: 7, width: "90%", background: "rgba(255,255,255,0.06)", borderRadius: 3 }} />
        <div style={{ height: 7, width: "75%", background: "rgba(255,255,255,0.04)", borderRadius: 3 }} />
        <div style={{ display: "flex", gap: 7, marginTop: 5 }}>
          {[1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 50, background: `${color}10`, border: `1px solid ${color}20`, borderRadius: 7 }} />)}
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ height: 24, width: 70, background: color, borderRadius: 5, opacity: 0.7 }} />
          <div style={{ height: 24, width: 70, background: `${color}20`, border: `1px solid ${color}30`, borderRadius: 5 }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 34, right: 14, fontFamily: "'Sora',sans-serif", fontSize: 44, fontWeight: 800, color: `${color}15`, lineHeight: 1 }}>{number}</div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof shoaibData.projects[0]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,8,22,0.95)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="project-modal-inner"
        style={{ background: "#1C1C2E", border: `1px solid ${project.color}30`, borderRadius: 20, maxWidth: 720, width: "100%", maxHeight: "92vh", overflow: "auto", boxShadow: `0 0 60px ${project.color}20, 0 30px 60px rgba(0,0,0,0.5)` }}>
        <ProjectMockup color={project.color} number={project.number} />
        <div style={{ padding: "clamp(16px,3vw,28px) clamp(16px,3vw,32px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: project.color, background: `${project.color}20`, border: `1px solid ${project.color}30`, borderRadius: 5, padding: "2px 8px", display: "inline-block", marginBottom: 6 }}>{project.category}</span>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(18px,3vw,24px)", fontWeight: 800, color: "#F3F4F6" }}>{project.title}</h2>
              <p style={{ color: "#ADB7BE", fontSize: 13, marginTop: 3 }}>{project.subtitle}</p>
            </div>
            <button onClick={onClose} style={{ background: "rgba(145,94,255,0.1)", border: "1px solid rgba(145,94,255,0.3)", borderRadius: 8, padding: 8, color: "#915EFF", cursor: "pointer", flexShrink: 0, minWidth: 36, minHeight: 36 }}>
              <X size={17} />
            </button>
          </div>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.3vw,15px)", lineHeight: 1.8, marginBottom: 20 }}>{project.fullDescription}</p>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#F3F4F6", marginBottom: 10 }}>Key Features</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 7 }}>
              {project.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Check size={13} color={project.color} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#F3F4F6", marginBottom: 10 }}>Tech Stack</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {project.tech.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30`, borderRadius: 7, padding: "4px 10px" }}>{t}</span>)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-violet"
              style={{ padding: "10px 20px", borderRadius: 10, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, textDecoration: "none", color: "white", display: "flex", alignItems: "center", gap: 7, minHeight: 44 }}>
              <ExternalLink size={14} /> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ padding: "10px 20px", borderRadius: 10, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 7, border: "1px solid #915EFF", color: "#915EFF", minHeight: 44 }}>
              <GitBranch size={14} /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof shoaibData.projects[0] | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = shoaibData.projects.filter(p => activeFilter === "All" || p.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="section-pad" style={{ background: "#050816", position: "relative" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(145,94,255,0.05), transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,48px)" }}>
          <span className="section-label">MY WORK</span>
          <h2 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.4vw,16px)", marginTop: 14, maxWidth: 560, margin: "14px auto 0" }}>
            Here are some of my best projects that showcase my skills and passion for building exceptional digital experiences
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: "clamp(24px,4vw,48px)", flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: "8px 18px", borderRadius: 50, fontFamily: "'Inter',sans-serif", fontSize: "clamp(12px,1.3vw,14px)", fontWeight: 500, cursor: "pointer", transition: "all 0.3s", border: activeFilter === f ? "1px solid #915EFF" : "1px solid rgba(145,94,255,0.2)", background: activeFilter === f ? "rgba(145,94,255,0.2)" : "transparent", color: activeFilter === f ? "#915EFF" : "#ADB7BE", minHeight: 40 }}>
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects grid — 3 col → 2 col → 1 col via CSS */}
        <motion.div layout className="projects-main-grid">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div key={project.id} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.07 }}
                onMouseEnter={() => setHovered(project.id)} onMouseLeave={() => setHovered(null)}
                style={{ background: "#1C1C2E", border: `1px solid ${hovered === project.id ? project.color + "50" : "rgba(145,94,255,0.15)"}`, borderRadius: 18, overflow: "hidden", cursor: "pointer", transition: "all 0.4s ease", transform: hovered === project.id ? "translateY(-7px)" : "translateY(0)", boxShadow: hovered === project.id ? `0 25px 50px rgba(0,0,0,0.4), 0 0 30px ${project.color}20` : "none" }}
                onClick={() => setSelectedProject(project)}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{ transform: hovered === project.id ? "scale(1.04)" : "scale(1)", transition: "transform 0.4s ease" }}>
                    <ProjectMockup color={project.color} number={project.number} />
                  </div>
                  <AnimatePresence>
                    {hovered === project.id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${project.color}40, transparent)`, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 14 }}>
                        <div style={{ background: project.color, color: "white", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, padding: "7px 18px", borderRadius: 50, display: "flex", alignItems: "center", gap: 5 }}>
                          View Details <ChevronRight size={13} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}25`, borderRadius: 5, padding: "2px 7px" }}>{project.category}</span>
                    <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "rgba(145,94,255,0.15)" }}>{project.number}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 700, color: "#F3F4F6", marginBottom: 7 }}>{project.title} — {project.subtitle}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(11px,1.2vw,13px)", color: "#ADB7BE", lineHeight: 1.6, marginBottom: 12 }}>{project.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                    {project.tech.slice(0, 4).map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#ADB7BE", background: "rgba(145,94,255,0.06)", border: "1px solid rgba(145,94,255,0.12)", borderRadius: 4, padding: "2px 6px" }}>{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: project.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                      <ExternalLink size={11} /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                      <GitBranch size={11} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all CTA */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "clamp(28px,4vw,48px)" }}>
          <a href="https://github.com/M-Shoaib7" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.4vw,15px)", fontWeight: 600, textDecoration: "none", border: "1px solid #915EFF", color: "#915EFF", minHeight: 48 }}>
            <GitBranch size={15} /> View All Projects on GitHub
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}

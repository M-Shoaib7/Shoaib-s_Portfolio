"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shoaibData } from "@/lib/data";
import { ExternalLink, GitBranch, ArrowLeft } from "lucide-react";
import Link from "next/link";
import StarField from "@/components/ui/StarField";

const filters = ["All", "Web App", "E-Commerce", "SaaS"];

function ProjectMockup({ color, number }: { color: string; number: string }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "16/9",
      background: `linear-gradient(135deg, ${color}15, rgba(28,28,46,0.8))`,
      borderRadius: "12px 12px 0 0", position: "relative",
      overflow: "hidden", borderBottom: `1px solid ${color}25`,
    }}>
      <div style={{ height: 28, background: "rgba(5,8,22,0.8)", borderBottom: `1px solid ${color}15`, display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
        {["#FF5F57","#FEBC2E","#28C840"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, height: 14, background: "rgba(145,94,255,0.1)", borderRadius: 3, marginLeft: 8 }} />
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 14, width: "55%", background: `${color}25`, borderRadius: 3 }} />
        <div style={{ height: 7, width: "85%", background: "rgba(255,255,255,0.05)", borderRadius: 3 }} />
        <div style={{ height: 7, width: "70%", background: "rgba(255,255,255,0.03)", borderRadius: 3 }} />
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          {[1,2,3].map((i) => <div key={i} style={{ flex: 1, height: 50, background: `${color}08`, border: `1px solid ${color}15`, borderRadius: 6 }} />)}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 10, right: 14, fontFamily: "'Sora',sans-serif", fontSize: 40, fontWeight: 800, color: `${color}12` }}>
        {number}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = shoaibData.projects.filter((p) => activeFilter === "All" || p.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#050816", paddingTop: 32 }}>
      <StarField count={150} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#ADB7BE", textDecoration: "none", fontFamily: "'Inter',sans-serif", fontSize: 14, marginBottom: 32, transition: "color 0.2s" }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>PORTFOLIO</span>
          <h1 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            All <span className="gradient-text">Projects</span>
          </h1>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: 16, marginTop: 16 }}>
            A complete showcase of my work — from concept to deployment
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: "8px 20px", borderRadius: 50,
              fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.3s",
              border: activeFilter === f ? "1px solid #915EFF" : "1px solid rgba(145,94,255,0.2)",
              background: activeFilter === f ? "rgba(145,94,255,0.2)" : "transparent",
              color: activeFilter === f ? "#915EFF" : "#ADB7BE",
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id} layout
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 25px ${project.color}20` }}
                style={{
                  background: "#1C1C2E", border: `1px solid ${project.color}20`,
                  borderRadius: 20, overflow: "hidden", transition: "all 0.3s",
                }}
              >
                <ProjectMockup color={project.color} number={project.number} />
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}25`, borderRadius: 5, padding: "2px 8px" }}>
                      {project.category}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: "#F3F4F6", marginBottom: 6 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE", lineHeight: 1.6, marginBottom: 12 }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#ADB7BE", background: "rgba(145,94,255,0.06)", border: "1px solid rgba(145,94,255,0.12)", borderRadius: 4, padding: "2px 6px" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: project.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                      <ExternalLink size={12} /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                      <GitBranch size={12} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="https://github.com/muhammadshoaib" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid #915EFF", color: "#915EFF", transition: "all 0.3s" }}>
            <GitBranch size={16} /> View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

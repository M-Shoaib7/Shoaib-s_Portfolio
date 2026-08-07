"use client";
import { motion } from "framer-motion";
import { shoaibData } from "@/lib/data";
import { Printer, ArrowLeft, Mail, Phone, MapPin, Globe } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050816" }}>
      {/* Controls (hidden on print) */}
      <div className="no-print" style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(5,8,22,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(145,94,255,0.15)",
        padding: "14px 24px", display: "flex", gap: 12,
      }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#ADB7BE", textDecoration: "none", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>
          <ArrowLeft size={15} /> Back
        </Link>
        <button
          onClick={() => window.print()}
          style={{
            background: "linear-gradient(135deg, #915EFF, #7B4FD9)",
            border: "none", borderRadius: 8, padding: "8px 20px",
            fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600,
            color: "white", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <Printer size={15} /> Download PDF
        </button>
      </div>

      {/* Resume content */}
      <div id="resume-content" style={{
        maxWidth: 860, margin: "32px auto", padding: "40px 48px",
        background: "#0d0d1a",
        border: "1px solid rgba(145,94,255,0.15)",
        borderRadius: 16,
        fontFamily: "'Inter', sans-serif",
        color: "#F3F4F6",
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            borderBottom: "2px solid rgba(145,94,255,0.3)",
            paddingBottom: 24, marginBottom: 28,
          }}
        >
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 800, color: "#F3F4F6", marginBottom: 4 }}>
            Muhammad Shoaib
          </h1>
          <p style={{ fontSize: 16, color: "#915EFF", fontWeight: 600, marginBottom: 12 }}>
            Full Stack Developer &amp; UI/UX Designer
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              { icon: <Mail size={13} />, text: "mshoaib249250@gmail.com" },
              { icon: <Phone size={13} />, text: "+92 3249250789" },
              { icon: <MapPin size={13} />, text: "Karachi, Pakistan" },
              { icon: <Globe size={13} />, text: "https://github.com/M-Shoaib7" },
            ].map((item) => (
              <span key={item.text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#ADB7BE" }}>
                <span style={{ color: "#915EFF" }}>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <Section title="Professional Summary">
          <p style={{ fontSize: 14, color: "#ADB7BE", lineHeight: 1.8 }}>
            Passionate Full Stack Developer and UI/UX Designer with 5+ years of experience crafting premium
            digital experiences. Specialized in Next.js, React, TypeScript, and Node.js development.
            Delivered 50+ projects for international clients with a 4.9★ rating. Open to work — worldwide remote.
          </p>
        </Section>

        {/* Experience */}
        <Section title="Work Experience">
          {shoaibData.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#F3F4F6" }}>{exp.role}</h3>
                  <p style={{ fontSize: 13, color: "#915EFF" }}>{exp.company} · {exp.type}</p>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#ADB7BE", whiteSpace: "nowrap" }}>
                  {exp.period}
                </span>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: 13, color: "#ADB7BE", lineHeight: 1.8, display: "flex", gap: 6 }}>
                    <span style={{ color: "#915EFF", flexShrink: 0 }}>▸</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Technical Skills">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Frontend", items: shoaibData.skills.frontend.slice(0, 6) },
              { label: "Backend", items: shoaibData.skills.backend.slice(0, 6) },
              { label: "Design", items: shoaibData.skills.design.slice(0, 5) },
              { label: "DevOps", items: shoaibData.skills.devops.slice(0, 5) },
            ].map((cat) => (
              <div key={cat.label}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#915EFF", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {cat.label}
                </p>
                <p style={{ fontSize: 13, color: "#ADB7BE" }}>{cat.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="Featured Projects">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {shoaibData.projects.map((p) => (
              <div key={p.id} style={{
                background: "rgba(145,94,255,0.05)",
                border: "1px solid rgba(145,94,255,0.15)",
                borderRadius: 8, padding: "12px 14px",
              }}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 700, color: "#F3F4F6", marginBottom: 3 }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: 12, color: "#ADB7BE", lineHeight: 1.6, marginBottom: 5 }}>{p.description.slice(0, 80)}...</p>
                <p style={{ fontSize: 11, color: "#915EFF" }}>{p.tech.slice(0, 3).join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          {shoaibData.education.map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#F3F4F6" }}>{edu.degree}</h3>
                <p style={{ fontSize: 13, color: "#915EFF" }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: 12, color: "#FFD700" }}>GPA: {edu.gpa} · Distinction</p>}
                {edu.honor && <p style={{ fontSize: 12, color: "#FFD700" }}>{edu.honor}</p>}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#ADB7BE", whiteSpace: "nowrap" }}>
                {edu.period}
              </span>
            </div>
          ))}
        </Section>

        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(173,183,190,0.4)", marginTop: 32, fontFamily: "'JetBrains Mono',monospace" }}>
          References available upon request · mshoaib249250@gmail.com
        </p>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          #resume-content { border: none !important; background: white !important; color: black !important; margin: 0 !important; max-width: 100% !important; border-radius: 0 !important; }
          h1, h2, h3, h4 { color: #111 !important; }
          p, span, li { color: #333 !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontSize: 16, fontWeight: 800, color: "#F3F4F6",
        borderBottom: "1px solid rgba(145,94,255,0.2)",
        paddingBottom: 8, marginBottom: 16,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ display: "inline-block", width: 3, height: 16, background: "#915EFF", borderRadius: 2 }} />
        {title}
      </h2>
      {children}
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import { shoaibData } from "@/lib/data";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import StarField from "@/components/ui/StarField";

const categoryColors: Record<string, string> = {
  Tutorial: "#915EFF",
  Opinion: "#00D8FF",
  Journey: "#FF6B9D",
};

export default function BlogPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050816" }}>
      <StarField count={120} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#ADB7BE", textDecoration: "none", fontFamily: "'Inter',sans-serif", fontSize: 14, marginBottom: 48, transition: "color 0.2s" }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>BLOG</span>
          <h1 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            Thoughts & <span className="gradient-text-violet">Tutorials</span>
          </h1>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: 16, marginTop: 16 }}>
            Insights on development, design, and the freelance journey
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {shoaibData.blogPosts.map((post, i) => {
            const color = categoryColors[post.category] || "#915EFF";
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                style={{
                  background: "rgba(28,28,46,0.7)",
                  border: `1px solid ${color}20`,
                  borderRadius: 18, padding: "28px 32px",
                  backdropFilter: "blur(12px)",
                  cursor: "pointer", transition: "all 0.3s",
                  display: "flex", gap: 24, alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}20`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: "'Sora',sans-serif", fontSize: 40, fontWeight: 800,
                  color: `${color}20`, flexShrink: 0, width: 60, textAlign: "center",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                      color, background: `${color}15`, border: `1px solid ${color}30`,
                      borderRadius: 5, padding: "2px 10px",
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE" }}>
                      {post.date}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#ADB7BE" }}>
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 20, fontWeight: 700, color: "#F3F4F6",
                    marginBottom: 8,
                  }}>
                    {post.title}
                  </h2>
                  <p style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 14,
                    color: "#ADB7BE", lineHeight: 1.7,
                  }}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{ color, flexShrink: 0 }}>
                  <ArrowRight size={20} />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div style={{
          textAlign: "center", marginTop: 56,
          color: "#ADB7BE", fontFamily: "'Inter',sans-serif", fontSize: 14,
        }}>
          More articles coming soon. Follow me on{" "}
          <a href="https://linkedin.com/in/muhammadshoaib" target="_blank" rel="noopener noreferrer" style={{ color: "#915EFF", textDecoration: "none" }}>
            LinkedIn
          </a>{" "}
          for updates.
        </div>
      </div>
    </div>
  );
}

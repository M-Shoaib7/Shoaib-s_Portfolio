"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import { shoaibData } from "@/lib/data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const stats = [
  { value: "4.9/5", label: "Average Rating", icon: "⭐" },
  { value: "50+", label: "Projects Completed", icon: "💼" },
  { value: "20+", label: "International Clients", icon: "🌍" },
  { value: "95%", label: "Client Retention Rate", icon: "🔄" },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = shoaibData.testimonials.length;

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = shoaibData.testimonials[active];

  return (
    <section id="testimonials" ref={ref} className="section-pad" style={{
      background: "#050816",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "30%", left: "10%",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(145,94,255,0.06), transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,52px)" }}
        >
          <span className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>WHAT CLIENTS SAY</span>
          <h2 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            Client <span className="gradient-text-violet">Testimonials</span>
          </h2>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px,1.4vw,16px)", marginTop: 16 }}>
            Don&apos;t just take my word for it — here&apos;s what my clients have to say
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="testimonials-stats"
          style={{ marginBottom: "clamp(32px,5vw,52px)" }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "rgba(28,28,46,0.6)",
              border: "1px solid rgba(145,94,255,0.15)",
              borderRadius: 14, padding: "16px 24px",
              textAlign: "center", backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: "#915EFF" }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#ADB7BE" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Testimonial Card */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: "relative" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "rgba(28,28,46,0.8)",
                border: `1px solid ${t.color}30`,
                borderRadius: 24,
                padding: "clamp(20px,4vw,40px) clamp(18px,4vw,48px)",
                backdropFilter: "blur(16px)",
                maxWidth: 780,
                margin: "0 auto",
                boxShadow: `0 0 40px ${t.color}10`,
                position: "relative",
              }}
            >
              {/* Quote mark */}
              <div style={{
                position: "absolute",
                top: 24, left: 40,
                fontFamily: "'Sora', sans-serif",
                fontSize: 80, color: `${t.color}20`,
                lineHeight: 1, fontWeight: 800,
              }}>
                &ldquo;
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 20, justifyContent: "center" }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="#FFD700" color="#FFD700" />
                ))}
              </div>

              {/* Review */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px,1.5vw,17px)", color: "#F3F4F6",
                lineHeight: 1.9, textAlign: "center",
                marginBottom: 28, position: "relative", zIndex: 1,
                fontStyle: "italic",
              }}>
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: "white",
                  flexShrink: 0, boxShadow: `0 0 20px ${t.color}40`,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 16, fontWeight: 700, color: "#F3F4F6",
                    }}>
                      {t.name}
                    </span>
                    <span style={{ fontSize: 16 }}>{t.country}</span>
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13, color: "#ADB7BE",
                  }}>
                    {t.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                      color: t.color, background: `${t.color}15`,
                      border: `1px solid ${t.color}25`, borderRadius: 5, padding: "2px 8px",
                    }}>
                      {t.platform}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ADB7BE" }}>
                      Project: {t.project}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button
            onClick={prev}
            style={{
              position: "absolute", left: 0, top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(28,28,46,0.9)",
              border: "1px solid rgba(145,94,255,0.3)",
              borderRadius: "50%", width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#915EFF", cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            style={{
              position: "absolute", right: 0, top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(28,28,46,0.9)",
              border: "1px solid rgba(145,94,255,0.3)",
              borderRadius: "50%", width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#915EFF", cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
          {shoaibData.testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#915EFF" : "rgba(145,94,255,0.3)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: 52 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13, color: "#ADB7BE",
            marginBottom: 16, textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}>
            Also Find Me On
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Fiverr", color: "#1DBF73", href: "https://fiverr.com/muhammadshoaib", badge: "Top Rated Seller" },
              { label: "Upwork", color: "#6FDA44", href: "https://upwork.com/freelancers/shoaib", badge: "100% Job Success" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "rgba(28,28,46,0.8)",
                  border: `1px solid ${p.color}40`,
                  borderRadius: 14, padding: "14px 28px",
                  textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 12,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${p.color}30`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 16, fontWeight: 700, color: p.color,
                }}>
                  {p.label}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#ADB7BE" }}>
                  ⭐ {p.badge}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { shoaibData } from "@/lib/data";
import { ArrowRight, Check } from "lucide-react";

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="section-pad" style={{
      background: "linear-gradient(180deg, #050816 0%, #060a1a 100%)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 200,
        background: "radial-gradient(ellipse, rgba(255,107,157,0.05), transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}
        >
          <span className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>WHAT I OFFER</span>
          <h2 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            Services I <span className="gradient-text">Provide</span>
          </h2>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px,1.4vw,16px)", marginTop: 16, maxWidth: 540, margin: "16px auto 0" }}>
            From concept to deployment — I deliver end-to-end digital solutions that drive results
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="services-grid">
          {shoaibData.services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "rgba(28,28,46,0.7)",
                border: `1px solid ${hovered === service.id ? service.color + "50" : service.color + "20"}`,
                borderRadius: 20,
                padding: "28px 24px",
                backdropFilter: "blur(12px)",
                transition: "all 0.4s ease",
                transform: hovered === service.id ? "translateY(-8px)" : "translateY(0)",
                boxShadow: hovered === service.id
                  ? `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${service.color}20`
                  : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* BG glow */}
              <AnimatePresence>
                {hovered === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.div
                animate={hovered === service.id ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 36,
                  marginBottom: 16,
                  display: "inline-block",
                }}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 700,
                color: "#F3F4F6", marginBottom: 10,
              }}>
                {service.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(12px,1.3vw,14px)", color: "#ADB7BE",
                lineHeight: 1.7, marginBottom: 16,
              }}>
                {service.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: 20 }}>
                {service.features.map((f) => (
                  <div key={f} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    marginBottom: 5,
                  }}>
                    <Check size={12} color={service.color} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12, color: "#ADB7BE",
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: "#ADB7BE", marginBottom: 2,
                  }}>
                    Starting at
                  </div>
                  <div style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 16, fontWeight: 700,
                    color: service.color,
                  }}>
                    {service.price}
                  </div>
                </div>
                <AnimatePresence>
                  {hovered === service.id && (
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      style={{
                        background: service.color,
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 14px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12, fontWeight: 600,
                        color: "white",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 5,
                      }}
                    >
                      Get Started <ArrowRight size={12} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

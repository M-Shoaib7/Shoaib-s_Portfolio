"use client";
import { motion } from "framer-motion";

export default function AvailableBadge() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="available-badge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      onClick={scrollToContact}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <div
            style={{
              width: 8,
              height: 8,
              background: "#22c55e",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: -4,
              background: "rgba(34,197,94,0.3)",
              borderRadius: "50%",
              animation: "availablePulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span style={{ color: "#F3F4F6", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          Available for work
        </span>
      </div>
    </motion.div>
  );
}

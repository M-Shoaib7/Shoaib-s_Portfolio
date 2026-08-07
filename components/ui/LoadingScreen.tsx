"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 400);
        setTimeout(() => setPhase("done"), 1200);
      }
      setProgress(p);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: "#050816",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
          exit={{
            clipPath: ["inset(0 0 0 0)", "inset(50% 0 50% 0)", "inset(50% 0 50% 0)"],
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {/* MS Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #915EFF, #00D8FF)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(145,94,255,0.6), 0 0 80px rgba(145,94,255,0.3)",
              fontFamily: "'Sora', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "white",
            }}
          >
            MS
          </motion.div>

          {/* Name letters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              color: "#F3F4F6",
              letterSpacing: "0.1em",
            }}
          >
            {"Muhammad Shoaib".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.04, duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ width: 280 }}
          >
            <div
              style={{
                width: "100%",
                height: 2,
                background: "rgba(145,94,255,0.2)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #915EFF, #00D8FF)",
                  boxShadow: "0 0 10px rgba(145,94,255,0.8)",
                  borderRadius: 1,
                  width: `${progress}%`,
                  transition: "width 0.08s linear",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                textAlign: "right",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#915EFF",
              }}
            >
              {Math.round(progress)}%
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              color: "#ADB7BE",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Full Stack Developer & UI/UX Designer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

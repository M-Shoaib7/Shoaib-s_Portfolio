"use client";
import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function StarField({ count = 300 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (i * 37.3 + 11.7) % 100,
      y: (i * 53.1 + 7.3) % 100,
      size: (i % 3) + 1,
      opacity: 0.3 + (i % 7) * 0.1,
      duration: 2 + (i % 5),
      delay: (i % 7) * 0.3,
    }));
  }, [count]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: "white",
            borderRadius: "50%",
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

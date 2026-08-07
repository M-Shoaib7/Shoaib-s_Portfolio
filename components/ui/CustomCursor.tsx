"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']");
      setHovered(!!isInteractive);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mousedown", onMouseDown);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="custom-cursor">
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 12 : 8,
          height: hovered ? 12 : 8,
          background: hovered ? "#00D8FF" : "#915EFF",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.2s, height 0.2s, background 0.2s",
          boxShadow: hovered
            ? "0 0 15px rgba(0,216,255,0.9)"
            : "0 0 10px rgba(145,94,255,0.8)",
          transform: clicked ? "scale(0.5)" : "scale(1)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          border: hovered
            ? "2px solid rgba(0,216,255,0.6)"
            : "2px solid rgba(145,94,255,0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </div>
  );
}

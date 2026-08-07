"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

function triggerConfetti() {
  const colors = ["#915EFF","#00D8FF","#FF6B9D","#FFD700","#F3F4F6"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 6;
    Object.assign(el.style, {
      position: "fixed",
      left: Math.random() * 100 + "vw",
      top: "-20px",
      width: size + "px",
      height: size + "px",
      background: color,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      zIndex: "999999",
      pointerEvents: "none",
      animation: `confettiFall ${2 + Math.random() * 2}s ease-in forwards`,
      animationDelay: Math.random() * 1 + "s",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

function injectConsoleArt() {
  const style1 = "color: #915EFF; font-size: 16px; font-weight: bold; font-family: monospace;";
  const style2 = "color: #00D8FF; font-size: 12px; font-family: monospace;";
  const style3 = "color: #F3F4F6; font-size: 12px; font-family: monospace;";
  const style4 = "color: #FF6B9D; font-size: 12px; font-family: monospace;";

  console.log(
    `%c
 ███╗   ███╗███████╗
 ████╗ ████║██╔════╝
 ██╔████╔██║███████╗
 ██║╚██╔╝██║╚════██║
 ██║ ╚═╝ ██║███████║
 ╚═╝     ╚═╝╚══════╝`,
    style1
  );
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", style2);
  console.log("%c👋 Hi there, fellow developer!", style3);
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", style2);
  console.log("%c🚀 Muhammad Shoaib — Full Stack Developer & UI/UX Designer", style3);
  console.log("%c📍 Based in Karachi, Pakistan", style3);
  console.log("%c💜 Stack: Next.js · TypeScript · Tailwind · Framer Motion · Three.js", style3);
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", style2);
  console.log("%c✉️  Interested in collaborating? shoaib.dev@gmail.com", style4);
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", style2);
}

export default function EasterEgg() {
  useEffect(() => {
    injectConsoleArt();

    let sequence: string[] = [];

    const onKeyDown = (e: KeyboardEvent) => {
      sequence.push(e.key);
      if (sequence.length > KONAMI.length) {
        sequence = sequence.slice(-KONAMI.length);
      }
      if (sequence.join(",") === KONAMI.join(",")) {
        sequence = [];
        triggerConfetti();
        toast.success("🎉 You found the secret! You're awesome!", {
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #915EFF, #00D8FF)",
            color: "white",
            fontWeight: 600,
            fontSize: 14,
          },
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}

"use client";
import { useEffect, useState } from "react";
import { Download, Mail, Code, MessageCircle } from "lucide-react";

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onClose = () => setVisible(false);

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("click", onClose);
    document.addEventListener("scroll", onClose);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("click", onClose);
      document.removeEventListener("scroll", onClose);
    };
  }, []);

  if (!visible) return null;

  const items = [
    { icon: <Code size={14} />, label: "View Source", action: () => window.open("view-source:" + window.location.href) },
    { icon: <Mail size={14} />, label: "Copy Email", action: () => navigator.clipboard.writeText("shoaib.dev@gmail.com") },
    { icon: <Download size={14} />, label: "Download CV", action: () => window.open("/resume") },
    { icon: <MessageCircle size={14} />, label: "Say Hi on WhatsApp", action: () => window.open("https://wa.me/923001234567") },
  ];

  return (
    <div
      className="custom-context-menu"
      style={{ left: pos.x, top: pos.y, position: "fixed", zIndex: 99998 }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="context-menu-item"
          onClick={item.action}
        >
          <span style={{ color: "#915EFF" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

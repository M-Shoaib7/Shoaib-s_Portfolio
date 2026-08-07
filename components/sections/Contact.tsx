"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import {
  Mail, Phone, MapPin, GitBranch, Link, Send,
  User, MessageSquare, ChevronDown, ExternalLink,
} from "lucide-react";

const subjects = [
  "Web Development Project",
  "UI/UX Design Project",
  "E-Commerce Website",
  "Mobile App Development",
  "Consulting / Code Review",
  "Other",
];
const budgets = [
  "PKR 20,000 — 50,000",
  "PKR 50,000 — 100,000",
  "PKR 100,000 — 250,000",
  "PKR 250,000+",
  "Let's Discuss",
];
const timelines = ["ASAP (Rush order)", "1-2 weeks", "1 month", "2-3 months", "Flexible"];

const contactCards = [
  {
    icon: <Mail size={20} />, label: "Email Me",
    value: "shoaib.dev@gmail.com", sub: "I reply within 24 hours",
    href: "mailto:mshoaib249250@gmail.com", color: "#915EFF",
  },
  {
    icon: <Phone size={20} />, label: "WhatsApp",
    value: "+92 3249250789", sub: "Available 9 AM — 11 PM PKT",
    href: "https://wa.me/923249250789", color: "#25D366",
  },
  {
    icon: <ExternalLink size={20} />, label: "Hire on Fiverr",
    value: "fiverr.com/muhammadshoaib", sub: "Top Rated Seller ⭐",
    href: "https://fiverr.com/muhammadshoaib", color: "#1DBF73",
  },
  {
    icon: <ExternalLink size={20} />, label: "Hire on Upwork",
    value: "upwork.com/freelancers/shoaib", sub: "100% Job Success Score",
    href: "https://upwork.com/freelancers/shoaib", color: "#6FDA44",
  },
];

const socials = [
  { icon: <GitBranch size={18} />, href: "https://github.com/M-Shoaib7", label: "GitHub", color: "#F3F4F6" },
  { icon: <Link size={18} />, href: "https://www.linkedin.com/in/m-shoaib7/", label: "LinkedIn", color: "#0A66C2" },
  { icon: <ExternalLink size={18} />, href: "https://fiverr.com/muhammadshoaib", label: "Fiverr", color: "#1DBF73" },
  { icon: <ExternalLink size={18} />, href: "https://upwork.com/freelancers/shoaib", label: "Upwork", color: "#6FDA44" },
  { icon: <MessageSquare size={18} />, href: "https://wa.me/923249250789", label: "WhatsApp", color: "#25D366" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  budget: string;
  timeline: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "",
    subject: subjects[0], budget: budgets[4],
    timeline: timelines[4], message: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    try {
      const saved = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
      saved.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("contact_submissions", JSON.stringify(saved));
    } catch {}
    setLoading(false);
    setForm({ name: "", email: "", phone: "", subject: subjects[0], budget: budgets[4], timeline: timelines[4], message: "" });
    setErrors({});
    toast.success("Message sent! I'll reply within 24 hours. 🚀");
  };

  const inputStyle = (hasError?: boolean) => ({
    background: "rgba(28,28,46,0.8)",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.6)" : "rgba(145,94,255,0.2)"}`,
    borderRadius: 12,
    color: "#F3F4F6",
    padding: "13px 14px 13px 42px",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "all 0.3s",
    boxShadow: hasError ? "0 0 15px rgba(239,68,68,0.15)" : "none",
  });

  return (
    <section id="contact" ref={ref} className="section-pad" style={{
      background: "linear-gradient(180deg, #050816 0%, #070b1e 50%, #050816 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Large faded CONTACT text */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Sora', sans-serif",
        fontSize: "clamp(80px, 18vw, 200px)",
        fontWeight: 800,
        color: "rgba(145,94,255,0.03)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        userSelect: "none",
        zIndex: 0,
      }}>
        CONTACT
      </div>

      <div style={{ position: "absolute", top: "20%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(145,94,255,0.06), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}
        >
          <span className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>GET IN TOUCH</span>
          <h2 className="section-heading" style={{ color: "#F3F4F6", marginTop: 16 }}>
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p style={{ color: "#ADB7BE", fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px,1.4vw,16px)", marginTop: 16, maxWidth: 540, margin: "16px auto 0" }}>
            Have a project in mind? Let&apos;s discuss how I can bring your vision to life.
            I&apos;m currently available for freelance work.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* LEFT: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 700, color: "#F3F4F6", marginBottom: 24 }}>
              Ready to Start Your Project?
            </h3>

            {/* Contact Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {contactCards.map((card) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 5, boxShadow: `0 0 20px ${card.color}20` }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: "rgba(28,28,46,0.6)",
                    border: `1px solid ${card.color}20`,
                    borderRadius: 14, padding: "14px 18px",
                    textDecoration: "none",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${card.color}50`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${card.color}20`; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: card.color, flexShrink: 0,
                  }}>
                    {card.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ADB7BE", marginBottom: 2 }}>
                      {card.label}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#F3F4F6", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {card.value}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: card.color }}>
                      {card.sub}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <div style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 12, padding: "14px 18px",
              marginBottom: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "availablePulse 1.5s infinite" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: "#22c55e" }}>
                  Currently Available for New Projects
                </span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#ADB7BE" }}>
                Expected response time: &lt; 24 hours
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: "rgba(28,28,46,0.8)",
                    border: "1px solid rgba(145,94,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#ADB7BE", textDecoration: "none", transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = s.color;
                    (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${s.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#ADB7BE";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(145,94,255,0.2)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: "rgba(28,28,46,0.7)",
                border: "1px solid rgba(145,94,255,0.2)",
                borderRadius: 24, padding: "32px",
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 40px rgba(145,94,255,0.06)",
              }}
            >
              {/* Name */}
              <div style={{ marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#915EFF", zIndex: 1, pointerEvents: "none" }}>
                  <User size={15} />
                </div>
                <input
                  type="text" placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle(!!errors.name)}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(145,94,255,0.6)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 20px rgba(145,94,255,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.name ? "rgba(239,68,68,0.6)" : "rgba(145,94,255,0.2)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                />
                {errors.name && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ef4444", marginTop: 4, paddingLeft: 4 }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#915EFF", zIndex: 1, pointerEvents: "none" }}>
                  <Mail size={15} />
                </div>
                <input
                  type="email" placeholder="Email Address *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle(!!errors.email)}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(145,94,255,0.6)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 20px rgba(145,94,255,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.email ? "rgba(239,68,68,0.6)" : "rgba(145,94,255,0.2)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                />
                {errors.email && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ef4444", marginTop: 4, paddingLeft: 4 }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#915EFF", zIndex: 1, pointerEvents: "none" }}>
                  <Phone size={15} />
                </div>
                <input
                  type="tel" placeholder="Phone / WhatsApp (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle()}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(145,94,255,0.6)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 20px rgba(145,94,255,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(145,94,255,0.2)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                />
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#915EFF", zIndex: 1, pointerEvents: "none" }}>
                  <MessageSquare size={15} />
                </div>
                <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#ADB7BE", zIndex: 1, pointerEvents: "none" }}>
                  <ChevronDown size={15} />
                </div>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ ...inputStyle(), appearance: "none" as const, paddingRight: 36 }}
                >
                  {subjects.map((s) => <option key={s} value={s} style={{ background: "#1C1C2E" }}>{s}</option>)}
                </select>
              </div>

              {/* Budget + Timeline */}
              <div className="contact-selects-row" style={{ marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#ADB7BE", zIndex: 1, pointerEvents: "none" }}>
                    <ChevronDown size={15} />
                  </div>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    style={{ ...inputStyle(), paddingLeft: 14, appearance: "none" as const }}
                  >
                    {budgets.map((b) => <option key={b} value={b} style={{ background: "#1C1C2E" }}>{b}</option>)}
                  </select>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#ADB7BE", zIndex: 1, pointerEvents: "none" }}>
                    <ChevronDown size={15} />
                  </div>
                  <select
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    style={{ ...inputStyle(), paddingLeft: 14, appearance: "none" as const }}
                  >
                    {timelines.map((t) => <option key={t} value={t} style={{ background: "#1C1C2E" }}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 20, position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: 14, color: "#915EFF", zIndex: 1, pointerEvents: "none" }}>
                  <MessageSquare size={15} />
                </div>
                <textarea
                  placeholder="Tell me about your project... *"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    ...inputStyle(!!errors.message),
                    resize: "vertical" as const,
                    minHeight: 120,
                  }}
                  onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(145,94,255,0.6)"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 20px rgba(145,94,255,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = errors.message ? "rgba(239,68,68,0.6)" : "rgba(145,94,255,0.2)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; }}
                />
                <div style={{ position: "absolute", bottom: 8, right: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#ADB7BE" }}>
                  {form.message.length} chars
                </div>
                {errors.message && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ef4444", marginTop: 4, paddingLeft: 4 }}>{errors.message}</p>}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="btn-violet"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%", padding: "15px",
                  borderRadius: 12, fontSize: 15,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

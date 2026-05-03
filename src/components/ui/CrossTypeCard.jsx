import { useEffect, useRef, useState } from "react"
import { fonts } from "../../tokens/tokens"

export default function CrossTypeCard() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  // Intersection observer — trigger entrance animation once
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        border: "1px solid #DDE3ED",
        borderRadius: "20px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        height: "100%",
        cursor: "default",
        transition: "box-shadow 0.3s ease",
        boxShadow: hovered ? "0 8px 32px rgba(249,112,102,0.10)" : "none",
      }}
    >
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(249,112,102,0.1)" }} />

      <h3 style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "18px", color: "#010312", margin: 0 }}>
        Cross-type connections
      </h3>

      <p style={{ fontFamily: fonts.body, fontSize: "14px", lineHeight: 1.6, color: "#2D3B6B", margin: 0 }}>
        Your voice memo from a morning walk connects to a YouTube link and a book highlight. Synra sees the thread across all your memory types.
      </p>

      {/* Illustration */}
      <div style={{
        marginTop: "auto",
        borderRadius: "16px",
        background: "#EEF2FF",
        padding: "20px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "6px",
        overflow: "hidden",
      }}>

        {/* Card 1 — Voice waveform */}
        <ItemCard delay={0} visible={visible} hovered={hovered} bg="#DBEAFE">
          <WaveformIllustration />
          <Label>Voice memo</Label>
        </ItemCard>

        <Arrow delay={80} visible={visible} />

        {/* Card 2 — Photo */}
        <ItemCard delay={160} visible={visible} hovered={hovered} bg="#F9FAFB">
          <PhotoIllustration />
          <Label>Photo</Label>
        </ItemCard>

        <Arrow delay={240} visible={visible} />

        {/* Card 3 — Sticky note */}
        <ItemCard delay={320} visible={visible} hovered={hovered} bg="#FEF9C3">
          <NoteIllustration />
          <Label>Note</Label>
        </ItemCard>

        <Arrow delay={400} visible={visible} />

        {/* Card 4 — Document */}
        <ItemCard delay={480} visible={visible} hovered={hovered} bg="#F0FDF4">
          <DocIllustration />
          <Label>Article</Label>
        </ItemCard>

      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────── */

function ItemCard({ children, delay, visible, hovered, bg }) {
  return (
    <div style={{
      flex: "1 1 0",
      minWidth: 0,
      borderRadius: "14px",
      background: bg,
      padding: "14px 10px 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
      transition: `opacity 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
                   transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
                   box-shadow 0.3s ease`,
      boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      {children}
    </div>
  )
}

function Arrow({ delay, visible }) {
  return (
    <div style={{
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      opacity: visible ? 1 : 0,
      transition: `opacity 0.3s ease ${delay}ms`,
    }}>
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
        {/* Dashed line */}
        <line x1="0" y1="6" x2="20" y2="6"
          stroke="#94A3B8" strokeWidth="1.5"
          strokeDasharray="3 3" strokeLinecap="round" />
        {/* Arrowhead */}
        <path d="M18 2L24 6L18 10" stroke="#94A3B8" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  )
}

function Label({ children }) {
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "10px",
      fontWeight: 500,
      color: "#6B7280",
      letterSpacing: "0.02em",
    }}>
      {children}
    </span>
  )
}

/* ── Illustrations ──────────────────────────────────────── */

function WaveformIllustration() {
  const bars = [3, 6, 10, 14, 18, 22, 26, 30, 26, 22, 18, 22, 26, 22, 18, 14, 10, 6, 3]
  return (
    <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={4 + i * 4}
          y={(44 - h) / 2}
          width="2.5"
          height={h}
          rx="1.25"
          fill={`rgba(37,99,235,${0.4 + (h / 30) * 0.6})`}
        />
      ))}
    </svg>
  )
}

function PhotoIllustration() {
  return (
    <svg width="68" height="52" viewBox="0 0 68 52" fill="none">
      {/* Photo frame */}
      <rect x="2" y="2" width="64" height="48" rx="8" fill="#E5E7EB" />
      {/* Sky */}
      <rect x="2" y="2" width="64" height="28" rx="8" fill="#BAE6FD" />
      {/* Mountains */}
      <path d="M2 34L18 16L30 28L42 18L66 34V50H2V34Z" fill="#6EE7B7" />
      {/* Sun */}
      <circle cx="52" cy="14" r="6" fill="#FDE68A" />
      {/* Person silhouette */}
      <ellipse cx="28" cy="38" rx="6" ry="8" fill="#374151" opacity="0.7" />
      <circle cx="28" cy="27" r="4" fill="#374151" opacity="0.7" />
    </svg>
  )
}

function NoteIllustration() {
  return (
    <div style={{ width: "68px", padding: "8px 6px", display: "flex", flexDirection: "column", gap: "5px" }}>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 700,
        fontSize: "11px", color: "#1a1a1a", margin: 0,
      }}>
        April 12
      </p>
      <div style={{ width: "100%", height: "1.5px", background: "rgba(0,0,0,0.1)", borderRadius: "1px" }} />
      <p style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 500,
        fontSize: "8.5px", color: "#374151", margin: 0, lineHeight: 1.5,
      }}>
        Did a sprint during the session — noticed more absorption from audio content
      </p>
    </div>
  )
}

function DocIllustration() {
  return (
    <svg width="68" height="52" viewBox="0 0 68 52" fill="none">
      <rect x="2" y="2" width="64" height="48" rx="6" fill="white" />
      <rect x="2" y="2" width="64" height="48" rx="6" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="8" y="8" width="40" height="4" rx="2" fill="#9CA3AF" />
      <rect x="8" y="16" width="52" height="2.5" rx="1.25" fill="#E5E7EB" />
      <rect x="8" y="21" width="48" height="2.5" rx="1.25" fill="#E5E7EB" />
      <rect x="8" y="26" width="44" height="2.5" rx="1.25" fill="#E5E7EB" />
      <rect x="8" y="31" width="50" height="2.5" rx="1.25" fill="#E5E7EB" />
      <rect x="8" y="37" width="24" height="10" rx="3" fill="#BFDBFE" />
      <rect x="36" y="37" width="24" height="10" rx="3" fill="#BBF7D0" />
    </svg>
  )
}
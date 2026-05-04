import { useState, useEffect, useRef } from "react"
import { colors, fonts, fontSizes, fontWeights, radius, shadows, transition } from "../../tokens/tokens"

const STEPS = [
  {
    number: "01",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2v18M2 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Capture a memory",
    desc: "Type a note, record your voice, snap a photo, or paste a URL. Done in seconds.",
    color: "#5435D0",
    bg: "rgba(84,53,208,0.06)",
  },
  {
    number: "02",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.93 4.93l1.41 1.41M15.66 15.66l1.41 1.41M4.93 17.07l1.41-1.41M15.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI enriches it",
    desc: "Gemini extracts meaning, topics, entities. Audio transcribed. Images described. Links summarised.",
    color: "#7B35D0",
    bg: "rgba(123,53,208,0.06)",
  },
  {
    number: "03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="5"  cy="11" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17" cy="5"  r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M7.5 11h4M14.5 6.5l-4 3M14.5 15.5l-4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Knowledge connects",
    desc: "Embeddings find related memories and build your graph automatically. No manual tagging.",
    color: "#3554D0",
    bg: "rgba(53,84,208,0.06)",
  },
  {
    number: "04",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h10M4 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19.5 17.5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Ask anything",
    desc: "Chat with your second brain. Answers drawn from your entire memory, not just a keyword.",
    color: "#5435D0",
    bg: "rgba(84,53,208,0.06)",
  },
]

function StepCard({ step, index }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        borderRadius: radius.lg,
        background: hovered
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.7)",
        border: hovered
          ? `1px solid rgba(84,53,208,0.18)`
          : "1px solid rgba(221,227,237,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "28px 24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        cursor: "default",
        boxShadow: hovered
          ? `0 20px 48px rgba(84,53,208,0.14), 0 4px 16px rgba(84,53,208,0.08)`
          : shadows.card,
        transform: hovered
          ? "translateY(-6px) scale(1.01)"
          : visible
            ? "translateY(0) scale(1)"
            : "translateY(32px) scale(0.98)",
        opacity: visible ? 1 : 0,
        transition: `
          transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s,
          opacity   0.5s ease ${index * 0.1}s,
          box-shadow ${transition.base},
          background ${transition.base},
          border ${transition.base}
        `,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        {/* Icon */}
        <div style={{
          width: "44px", height: "44px", borderRadius: radius.md,
          background: hovered ? step.color : step.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "white" : step.color,
          transition: transition.base,
          boxShadow: hovered ? `0 4px 16px ${step.color}40` : "none",
        }}>
          {step.icon}
        </div>

        <span style={{
          fontFamily: fonts.display,
          fontSize: "13px",
          fontWeight: fontWeights.semibold,
          color: hovered ? colors.primary : "rgba(84,53,208,0.25)",
          letterSpacing: "0.05em",
          transition: transition.base,
        }}>
          {step.number}
        </span>
      </div>

      <h3 style={{
        fontFamily: fonts.display,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.md,
        color: colors.dark,
        margin: 0,
        lineHeight: 1.3,
        letterSpacing: "-0.3px",
      }}>
        {step.title}
      </h3>

      <p style={{
        fontFamily: fonts.body,
        fontWeight: fontWeights.regular,
        fontSize: fontSizes.sm,
        lineHeight: 1.7,
        color: colors.lightText,
        margin: 0,
      }}>
        {step.desc}
      </p>

      <div style={{
        marginTop: "auto",
        height: "3px",
        borderRadius: radius.full,
        background: hovered
          ? `linear-gradient(90deg, ${step.color}, transparent)`
          : "rgba(84,53,208,0.08)",
        transition: transition.slow,
        width: hovered ? "100%" : "32px",
      }} />
    </div>
  )
}

export default function HowItWorks() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      style={{
        background:   colors.greyBg,
        padding:      "100px 24px",
        overflow:     "hidden",
        position:     "relative",
      }}
    >

      <div style={{
        position:      "absolute",
        top:           "-20%",
        left:          "50%",
        transform:     "translateX(-50%)",
        width:         "800px",
        height:        "500px",
        borderRadius:  "50%",
        background:    "radial-gradient(ellipse, rgba(84,53,208,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex:        0,
      }} />

      <div style={{ maxWidth: "1124px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div
          ref={headerRef}
          style={{
            marginBottom: "56px",
            opacity:      headerVisible ? 1 : 0,
            transform:    headerVisible ? "translateY(0)" : "translateY(24px)",
            transition:   "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p style={{
            fontFamily:    fonts.body,
            fontSize:      fontSizes.xs,
            fontWeight:    fontWeights.semibold,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         colors.primary,
            marginBottom:  "12px",
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily:    fonts.display,
            fontWeight:    fontWeights.bold,
            fontSize:      "clamp(28px, 3.5vw, 46px)",
            lineHeight:    1.1,
            letterSpacing: "-0.8px",
            color:         colors.dark,
            margin:        0,
            maxWidth:      "480px",
          }}>
            From capture to<br />connected knowledge.
          </h2>
        </div>

        <div style={{
          display:  "flex",
          gap:      "16px",
          alignItems: "stretch",
        }}
          className="hiw-grid"
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .hiw-grid {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  )
}
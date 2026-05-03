import { useEffect, useRef, useState } from "react"
import { fonts } from "../../tokens/tokens"

const SEARCHES = [
  {
    query: "cortisol crash",
    results: [
      { type: "voice", label: "Voice note", meta: "from 3 days ago", color: "#5435D0" },
      { type: "text",  label: "Photo of empty coffee cup", meta: "", color: "#010312" },
    ],
  },
  {
    query: "what did I save about staying focused?",
    results: [
      { type: "note",  label: "Deep work session notes", meta: "2 weeks ago", color: "#5435D0" },
      { type: "text",  label: "Time blocking template", meta: "", color: "#010312" },
    ],
  },
  {
    query: "morning routine ideas",
    results: [
      { type: "image", label: "Screenshot — cold shower benefits", meta: "last week", color: "#5435D0" },
      { type: "text",  label: "Hal Elrod SAVERS framework", meta: "", color: "#010312" },
    ],
  },
]

const TYPE_ICONS = {
  voice: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="5" r="2.2" stroke="#5435D0" strokeWidth="1.4" fill="none"/>
      <path d="M3 5.5C3 7.43 4.57 9 6.5 9S10 7.43 10 5.5" stroke="#5435D0" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <line x1="6.5" y1="9" x2="6.5" y2="11" stroke="#5435D0" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4.5" y1="11" x2="8.5" y2="11" stroke="#5435D0" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  note: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2" stroke="#5435D0" strokeWidth="1.4" fill="none"/>
      <line x1="4" y1="5" x2="9" y2="5" stroke="#5435D0" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4" y1="7.5" x2="7" y2="7.5" stroke="#5435D0" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  image: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="2.5" width="10" height="8" rx="1.5" stroke="#5435D0" strokeWidth="1.4" fill="none"/>
      <circle cx="4.5" cy="5.5" r="1" fill="#5435D0"/>
      <path d="M1.5 9L4.5 6.5L7 8.5L9 7L11.5 9.5" stroke="#5435D0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  text: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <line x1="2" y1="4" x2="11" y2="4" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="2" y1="6.5" x2="9" y2="6.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="2" y1="9" x2="7" y2="9" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
}

// Phases per cycle: typing → showing → clearing → (next)
const CHAR_DELAY   = 55   // ms per character typed
const SHOW_HOLD    = 1800 // ms results stay visible
const CLEAR_DELAY  = 30   // ms per char deleted

export default function HybridSearchCard() {
  const [hovered,       setHovered]       = useState(false)
  const [searchIndex,   setSearchIndex]   = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [showResults,   setShowResults]   = useState(false)
  const [resultsKey,    setResultsKey]    = useState(0)
  const [phase,         setPhase]         = useState("typing") // typing | holding | clearing

  const timeoutRef = useRef(null)
  const charRef    = useRef(0)

  const clear = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }

  useEffect(() => {
    const search = SEARCHES[searchIndex]

    if (phase === "typing") {
      setShowResults(false)
      charRef.current = 0
      const typeNext = () => {
        charRef.current++
        setDisplayedText(search.query.slice(0, charRef.current))
        if (charRef.current < search.query.length) {
          timeoutRef.current = setTimeout(typeNext, CHAR_DELAY)
        } else {
          // Done typing — show results
          timeoutRef.current = setTimeout(() => {
            setResultsKey(k => k + 1)
            setShowResults(true)
            setPhase("holding")
          }, 200)
        }
      }
      timeoutRef.current = setTimeout(typeNext, 300)

    } else if (phase === "holding") {
      timeoutRef.current = setTimeout(() => setPhase("clearing"), SHOW_HOLD)

    } else if (phase === "clearing") {
      setShowResults(false)
      const clearNext = () => {
        setDisplayedText(t => {
          if (t.length <= 0) return t
          return t.slice(0, -1)
        })
        charRef.current--
        if (charRef.current > 0) {
          timeoutRef.current = setTimeout(clearNext, CLEAR_DELAY)
        } else {
          timeoutRef.current = setTimeout(() => {
            setSearchIndex(i => (i + 1) % SEARCHES.length)
            setPhase("typing")
          }, 350)
        }
      }
      charRef.current = search.query.length
      timeoutRef.current = setTimeout(clearNext, 100)
    }

    return clear
  }, [phase, searchIndex])

  const search = SEARCHES[searchIndex]

  return (
    <div
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
        boxShadow: hovered ? "0 8px 32px rgba(84,53,208,0.10)" : "none",
      }}
    >
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(84,53,208,0.08)" }} />

      <h3 style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "18px", color: "#010312", margin: 0 }}>
        Hybrid search
      </h3>

      <p style={{ fontFamily: fonts.body, fontSize: "14px", lineHeight: 1.6, color: "#2D3B6B", margin: 0 }}>
        Ask: <em>"what did I save about staying focused?"</em> and get results across your notes, voice memos, and bookmarks even if you never used the word "focus".
      </p>

      {/* Search illustration */}
      <div style={{
        marginTop: "auto",
        borderRadius: "16px",
        background: "#F8F9FC",
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}>

        {/* Search box */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: showResults ? "14px 14px 0 0" : "14px",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "border-radius 0.2s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          {/* Search icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="7" cy="7" r="4.5" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          {/* Animated text + cursor */}
          <span style={{
            fontFamily: fonts.body,
            fontSize: "14px",
            color: "#010312",
            flex: 1,
            minHeight: "20px",
            letterSpacing: "-0.01em",
          }}>
            {displayedText}
            <span style={{
              display: "inline-block",
              width: "2px",
              height: "14px",
              background: "#5435D0",
              marginLeft: "1px",
              verticalAlign: "middle",
              borderRadius: "1px",
              animation: "blink 1s step-end infinite",
            }} />
          </span>

          {/* Clear button — only when there's text */}
          {displayedText.length > 0 && (
            <div style={{
              width: "20px", height: "20px",
              borderRadius: "50%",
              background: "#D1D5DB",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Results dropdown */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderTop: "none",
          borderRadius: "0 0 14px 14px",
          overflow: "hidden",
          maxHeight: showResults ? "120px" : "0px",
          opacity: showResults ? 1 : 0,
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}>
          {search.results.map((r, i) => (
            <div
              key={`${resultsKey}-${i}`}
              style={{
                padding: "11px 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderTop: i > 0 ? "1px solid #F1F5F9" : "none",
                animation: `slideIn 0.3s ease ${i * 80}ms both`,
              }}
            >
              <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                {TYPE_ICONS[r.type]}
              </span>
              <span style={{
                fontFamily: fonts.body,
                fontSize: "13px",
                fontWeight: 600,
                color: r.color,
              }}>
                {r.label}
              </span>
              {r.meta && (
                <span style={{
                  fontFamily: fonts.body,
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#9CA3AF",
                }}>
                  {r.meta}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
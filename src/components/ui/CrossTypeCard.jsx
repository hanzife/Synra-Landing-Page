import { useEffect, useRef, useState } from "react"
import { fonts, fontSizes, fontWeights } from "../../tokens/tokens"
import runningImage from "../../assets/images/running.png"
import StravaArticle from "../../assets/images/strava-article.png"
import { body } from "framer-motion/client"

export default function CrossTypeCard() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
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
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "rgba(249,112,102,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24935 7.08335C5.0008 7.08335 5.72147 6.78484 6.25282 6.25349C6.78417 5.72214 7.08268 5.00147 7.08268 4.25002C7.08268 3.49857 6.78417 2.7779 6.25282 2.24655C5.72147 1.7152 5.0008 1.41669 4.24935 1.41669C3.4979 1.41669 2.77723 1.7152 2.24588 2.24655C1.71453 2.7779 1.41602 3.49857 1.41602 4.25002C1.41602 5.00147 1.71453 5.72214 2.24588 6.25349C2.77723 6.78484 3.4979 7.08335 4.24935 7.08335ZM5.66602 28.3334C6.79319 28.3334 7.87419 27.8856 8.67122 27.0886C9.46825 26.2915 9.91602 25.2105 9.91602 24.0834C9.91602 22.9562 9.46825 21.8752 8.67122 21.0781C7.87419 20.2811 6.79319 19.8334 5.66602 19.8334C4.53885 19.8334 3.45784 20.2811 2.66081 21.0781C1.86378 21.8752 1.41602 22.9562 1.41602 24.0834C1.41602 25.2105 1.86378 26.2915 2.66081 27.0886C3.45784 27.8856 4.53885 28.3334 5.66602 28.3334ZM25.4993 29.75C26.6265 29.75 27.7075 29.3023 28.5046 28.5052C29.3016 27.7082 29.7493 26.6272 29.7493 25.5C29.7493 24.3728 29.3016 23.2918 28.5046 22.4948C27.7075 21.6978 26.6265 21.25 25.4993 21.25C24.3722 21.25 23.2912 21.6978 22.4941 22.4948C21.6971 23.2918 21.2493 24.3728 21.2493 25.5C21.2493 26.6272 21.6971 27.7082 22.4941 28.5052C23.2912 29.3023 24.3722 29.75 25.4993 29.75ZM14.166 18.4167C15.6689 18.4167 17.1102 17.8197 18.173 16.757C19.2357 15.6943 19.8327 14.2529 19.8327 12.75C19.8327 11.2471 19.2357 9.80579 18.173 8.74308C17.1102 7.68038 15.6689 7.08335 14.166 7.08335C12.6631 7.08335 11.2218 7.68038 10.1591 8.74308C9.09637 9.80579 8.49935 11.2471 8.49935 12.75C8.49935 14.2529 9.09637 15.6943 10.1591 16.757C11.2218 17.8197 12.6631 18.4167 14.166 18.4167ZM22.666 7.08335C23.4175 7.08335 24.1381 6.78484 24.6695 6.25349C25.2008 5.72214 25.4993 5.00147 25.4993 4.25002C25.4993 3.49857 25.2008 2.7779 24.6695 2.24655C24.1381 1.7152 23.4175 1.41669 22.666 1.41669C21.9146 1.41669 21.1939 1.7152 20.6625 2.24655C20.1312 2.7779 19.8327 3.49857 19.8327 4.25002C19.8327 5.00147 20.1312 5.72214 20.6625 6.25349C21.1939 6.78484 21.9146 7.08335 22.666 7.08335Z" fill="#FE9B4E" stroke="#FE9B4E" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6.37305 6.37506L9.20638 9.20839ZM19.8314 7.08339L18.4147 8.50006ZM22.6647 22.3126L18.4147 17.0001ZM8.49805 20.5417L11.3314 17.7084Z" fill="#FE9B4E" />
          <path d="M6.37305 6.37506L9.20638 9.20839M19.8314 7.08339L18.4147 8.50006M22.6647 22.3126L18.4147 17.0001M8.49805 20.5417L11.3314 17.7084" stroke="#FE9B4E" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>


      <h3
        style={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: "18px",
          color: "#010312",
          margin: 0,
        }}
      >
        Cross-type connections
      </h3>

      <p
        style={{
          fontFamily: fonts.body,
          maxWidth: "360px",
          fontSize: fontSizes.sm,
          lineHeight: 1.6,
          color: "#2D3B6B",
          margin: 0,
        }}
      >
        Your voice memo from a morning walk connects to a YouTube link and a
        book highlight. Synra sees the thread across all your memory types.
      </p>

      <div
        style={{
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "6px",
          width: "100%",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        <ItemCard delay={0} visible={visible} hovered={hovered} bg="#EAE7F9">
          <div style={{ transform: 'scale(0.8)' }}><WaveformIllustration /></div>
          <Label>Voice</Label>
        </ItemCard>

        <Arrow delay={80} visible={visible} />
        <ItemCard delay={160} visible={visible} hovered={hovered} bg="#F9FAFB">
          <div style={{ width: "100%", height: "100%", borderRadius: "8px", overflow: "hidden" }}>
            <img
              src={runningImage}
              alt="Run"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </ItemCard>

        <Arrow delay={240} visible={visible} />

        <ItemCard delay={320} visible={visible} hovered={hovered} bg="#FEF9C3">
          <div style={{ padding: "4px", height: "100%", textAlign: 'left' }}>
            <div style={{ width: "100%", margin: "0 auto 4px" }}> <b>April 12 </b></div>
            <div style={{ fontSize: "12px", lineHeight: 1.1, color: "#333" }}>  Did a sprint during the session. noticed more absorption from audio content</div>
          </div>
          <Label>Note</Label>
        </ItemCard>

        <Arrow delay={400} visible={visible} />



        <ItemCard delay={480} visible={visible} hovered={hovered} bg="#FFFFFF">
          <div style={{
            width: "100%",
            height: "88px",
            borderRadius: "6px",
            backgroundImage: `url(${StravaArticle})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <span style={{
                color: "#FC5200",
                fontWeight: 800,
                fontSize: "11px",
                fontFamily: fonts.body,
                letterSpacing: "0.02em"
              }}>
                STRAVA
              </span>
            </div>
          </div>

          {/* Text Content - Aligned Left with Ellipsis */}
          <div style={{
            textAlign: "left",
            width: "100%",
            overflow: "hidden"
          }}>
            <h4 style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.sm,
              fontWeight: fontWeights.bold,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              Want to Progress? Don’t Overlook the Recovery
            </h4>

            <p style={{
              fontFamily: fonts.body,
              fontSize: "10px",
              fontWeight: 500,
              color: "#5435D0",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              stories.strava.com
            </p>
          </div>
        </ItemCard>
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────── */

function ItemCard({ children, delay, visible, hovered, bg, isImage = false }) {
  const padding = isImage ? "0 0 10px 0" : "14px 10px 10px"

  return (
    <div style={{
      flexShrink: 0, 
      width: "120px",
      height: "120px",
      borderRadius: "12px",
      background: bg,
      padding: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
      transition: `opacity 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
                   transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
                   box-shadow 0.3s ease`,
      boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
      overflow: "hidden"
    }}>
      {children}
    </div>
  )
}

function Arrow({ delay, visible }) {
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.3s ease ${delay}ms`,
      }}
    >
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
        <line
          x1="0"
          y1="6"
          x2="20"
          y2="6"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
        <path
          d="M18 2L24 6L18 10"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

function Label({ children }) {
  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        color: "#6B7280",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  )
}

function WaveformIllustration() {

  return (
    <svg width="80" height="70" viewBox="0 0 121 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="27.8164" width="9.73563" height="69.5402" rx="4.86782" fill="#5435D0" />
      <rect x="83.4492" width="9.73563" height="69.5402" rx="4.86782" fill="#5435D0" />
      <rect x="13.9082" y="9.73572" width="9.73563" height="50.069" rx="4.86782" fill="#5435D0" />
      <rect x="41.7246" y="9.73572" width="9.73563" height="50.069" rx="4.86782" fill="#5435D0" />
      <rect x="69.541" y="9.73572" width="9.73563" height="50.069" rx="4.86782" fill="#5435D0" />
      <rect x="97.3555" y="9.73572" width="9.73563" height="50.069" rx="4.86782" fill="#5435D0" />
      <rect y="22.2529" width="9.73563" height="25.0345" rx="4.86782" fill="#5435D0" />
      <rect x="55.6328" y="22.2529" width="9.73563" height="25.0345" rx="4.86782" fill="#5435D0" />
      <rect x="111.264" y="22.2529" width="9.73563" height="25.0345" rx="4.86782" fill="#5435D0" />
    </svg>

  )
}


function NoteIllustration() {
  return (
    <div
      style={{
        width: "68px",
        padding: "8px 6px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "11px",
          color: "#1a1a1a",
          margin: 0,
        }}
      >
        April 12
      </p>
      <div
        style={{
          width: "100%",
          height: "1.5px",
          background: "rgba(0,0,0,0.1)",
          borderRadius: "1px",
        }}
      />
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "8.5px",
          color: "#374151",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        Did a sprint during the session — noticed more absorption from audio
        content
      </p>
    </div>
  )
}

function DocIllustration() {
  return (
    <svg width="68" height="52" viewBox="0 0 68 52" fill="none">
      <rect x="2" y="2" width="64" height="48" rx="6" fill="white" />
      <rect
        x="2"
        y="2"
        width="64"
        height="48"
        rx="6"
        stroke="#E5E7EB"
        strokeWidth="1"
      />
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
import { useEffect, useRef, useState } from "react"
import { fonts } from "../../tokens/tokens"
import atomicHabitsImg from "../../assets/images/atomic-habits.png"

export default function AutoLinkCard() {
  const [hovered, setHovered] = useState(false)
  const canvasRef      = useRef(null)
  const containerRef   = useRef(null)
  const podcastRef     = useRef(null)
  const bookRef        = useRef(null)
  const similarityRef  = useRef(null)

  const drawArrows = () => {
    const canvas      = canvasRef.current
    const container   = containerRef.current
    const podcastEl   = podcastRef.current
    const bookEl      = bookRef.current
    const simEl       = similarityRef.current
    if (!canvas || !container || !podcastEl || !bookEl || !simEl) return

    const dpr    = window.devicePixelRatio || 1
    const cRect  = container.getBoundingClientRect()
    const pRect  = podcastEl.getBoundingClientRect()
    const bRect  = bookEl.getBoundingClientRect()
    const sRect  = simEl.getBoundingClientRect()

    canvas.width        = cRect.width  * dpr
    canvas.height       = cRect.height * dpr
    canvas.style.width  = cRect.width  + "px"
    canvas.style.height = cRect.height + "px"

    const ctx = canvas.getContext("2d")
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, cRect.width, cRect.height)

    // Anchor coords (container-relative)
    const pRight  = pRect.right  - cRect.left
    const pTop    = pRect.top    - cRect.top
    const pMidY   = pRect.top    + pRect.height / 2 - cRect.top

    const bLeft   = bRect.left   - cRect.left
    const bTop    = bRect.top    - cRect.top
    const bMidY   = bRect.top    + bRect.height / 2 - cRect.top

    const sMidX   = sRect.left   + sRect.width  / 2 - cRect.left
    const sMidY   = sRect.top    + sRect.height / 2 - cRect.top

    const drawArrowHead = (ctx, x, y, angle, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-10, -5)
      ctx.lineTo(-10,  5)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // ── TOP arc: podcast top-right → book top-left, going over the similarity node ──
    // Start: top-right of podcast card, End: top of book card
    const startX = pRight
    const startY = pTop + 20
    const endX   = bLeft
    const endY   = bTop + 20

    // Control points arc upward over the similarity badge
    const cp1x = sMidX - 20
    const cp1y = sMidY - 80
    const cp2x = sMidX + 10
    const cp2y = sMidY - 60

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)
    ctx.strokeStyle = "#9B5CF6"
    ctx.lineWidth   = 2.5
    ctx.setLineDash([])
    ctx.lineCap     = "round"
    ctx.stroke()

    // Arrowhead at end (pointing toward book, roughly right/down-right)
    const t   = 0.98
    const bx  = (1-t)**3*startX + 3*(1-t)**2*t*cp1x + 3*(1-t)*t**2*cp2x + t**3*endX
    const by  = (1-t)**3*startY + 3*(1-t)**2*t*cp1y + 3*(1-t)*t**2*cp2y + t**3*endY
    const t2  = 0.96
    const bx2 = (1-t2)**3*startX + 3*(1-t2)**2*t2*cp1x + 3*(1-t2)*t2**2*cp2x + t2**3*endX
    const by2 = (1-t2)**3*startY + 3*(1-t2)**2*t2*cp1y + 3*(1-t2)*t2**2*cp2y + t2**3*endY
    drawArrowHead(ctx, endX, endY, Math.atan2(endY - by2, endX - bx2), "#9B5CF6")

    // ── BOTTOM arc: book bottom → podcast bottom-left, going under the similarity node ──
    const startX2 = bLeft
    const startY2 = bRect.bottom - cRect.top - 20
    const endX2   = pRight
    const endY2   = pRect.bottom - cRect.top - 20

    const cp3x = sMidX + 10
    const cp3y = sMidY + 70
    const cp4x = sMidX - 20
    const cp4y = sMidY + 80

    ctx.beginPath()
    ctx.moveTo(startX2, startY2)
    ctx.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, endX2, endY2)
    ctx.strokeStyle = "#EAB308"
    ctx.lineWidth   = 2.5
    ctx.stroke()

    // Arrowhead at end (pointing toward podcast bottom, roughly left)
    const t3  = 0.98
    const ex  = (1-t3)**3*startX2 + 3*(1-t3)**2*t3*cp3x + 3*(1-t3)*t3**2*cp4x + t3**3*endX2
    const ey  = (1-t3)**3*startY2 + 3*(1-t3)**2*t3*cp3y + 3*(1-t3)*t3**2*cp4y + t3**3*endY2
    const t4  = 0.96
    const ex2 = (1-t4)**3*startX2 + 3*(1-t4)**2*t4*cp3x + 3*(1-t4)*t4**2*cp4x + t4**3*endX2
    const ey2 = (1-t4)**3*startY2 + 3*(1-t4)**2*t4*cp3y + 3*(1-t4)*t4**2*cp4y + t4**3*endY2
    drawArrowHead(ctx, endX2, endY2, Math.atan2(ey - ey2, ex - ex2), "#EAB308")
  }

  useEffect(() => {
    const t = setTimeout(drawArrows, 150)
    window.addEventListener("resize", drawArrows)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", drawArrows)
    }
  }, [])

  useEffect(() => {
    drawArrows()
  }, [hovered])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF", border: "1px solid #DDE3ED",
        borderRadius: "20px", padding: "32px",
        display: "flex", flexDirection: "column", gap: "12px",
        height: "100%", cursor: "default",
        transition: "box-shadow 0.3s ease",
        boxShadow: hovered ? "0 8px 32px rgba(45,212,191,0.10)" : "none",
      }}
    >
      {/* Icon box */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: "rgba(45,212,191,0.1)",
      }} />

      <h3 style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "18px", color: "#010312", margin: 0 }}>
        Auto-linking at 75% similarity
      </h3>

      <p style={{ fontFamily: fonts.body, fontSize: "14px", lineHeight: 1.6, color: "#2D3B6B", margin: 0 }}>
        Every capture is automatically connected to related ones by meaning, not keyword. A living graph that grows smarter as you do.
      </p>

      {/* Illustration */}
      <div
        ref={containerRef}
        style={{
          marginTop: "auto",
          minHeight: "220px",
          borderRadius: "16px",
          background: "#F8F9FC",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 16px",
          gap: "8px",
        }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />

        {/* Left: Podcast card */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2, position: "relative" }}>
          <div
            ref={podcastRef}
            style={{
              width: "120px",
              borderRadius: "14px",
              background: "#1a1a2e",
              overflow: "hidden",
              boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.22)" : "0 4px 16px rgba(0,0,0,0.15)",
              transition: "box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              transform: hovered ? "translateY(-3px)" : "translateY(0)",
            }}
          >
            {/* Podcast thumbnail area */}
            <div style={{
              height: "110px",
              background: "linear-gradient(160deg, #1c1c3a 0%, #0d0d1e 100%)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "10px",
            }}>
              {/* Podcast icon badge */}
              <div style={{
                position: "absolute", top: "8px", left: "8px",
                width: "24px", height: "24px",
                background: "#9B5CF6",
                borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* Podcast microphone icon */}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="5" r="2.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M3 5.5C3 7.43 4.57 9 6.5 9S10 7.43 10 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <line x1="6.5" y1="9" x2="6.5" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="4.5" y1="11" x2="8.5" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Person silhouette (abstract) */}
              <div style={{
                position: "absolute", right: 0, bottom: 0,
                width: "70px", height: "85px",
                background: "linear-gradient(180deg, rgba(120,100,200,0.15) 0%, rgba(80,60,160,0.3) 100%)",
                borderRadius: "40px 40px 0 0",
                opacity: 0.6,
              }} />

              {/* Name text */}
              <p style={{
                fontFamily: fonts.body, fontWeight: 700, fontSize: "11px",
                color: "#fff", margin: 0, position: "relative", zIndex: 1,
                lineHeight: 1.3,
              }}>
                The Tim<br/>Ferriss
              </p>
            </div>
          </div>

          {/* Label below */}
          <p style={{
            fontFamily: fonts.body, fontSize: "11px", color: "#6B7280",
            margin: 0, textAlign: "center",
          }}>
            Podcast Summary
          </p>
        </div>

        {/* Center: Similarity badge */}
        <div
          ref={similarityRef}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          <p style={{
            fontFamily: fonts.body, fontSize: "11px", color: "#6B7280",
            margin: 0, whiteSpace: "nowrap",
          }}>
            Similarity
          </p>
          <div style={{
            background: "#F97316",
            borderRadius: "999px",
            padding: "6px 16px",
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "15px",
            color: "#fff",
            boxShadow: hovered
              ? "0 0 0 6px rgba(249,115,22,0.12)"
              : "0 0 0 3px rgba(249,115,22,0.08)",
            transition: "box-shadow 0.4s ease",
          }}>
            75%
          </div>
        </div>

        {/* Right: Book card */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2, position: "relative" }}>
          <div
            ref={bookRef}
            style={{
              width: "130px",
              position: "relative",
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
              transform: hovered ? "translateY(-3px)" : "translateY(0)",
            }}
          >
            <img
              src={atomicHabitsImg}
              alt="Atomic Habits book"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "4px",
                filter: hovered ? "drop-shadow(0 8px 20px rgba(0,0,0,0.22))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.14))",
                transition: "filter 0.35s ease",
              }}
            />

            <div style={{
              position: "absolute",
              top: "12%", left: "50%",
              width: "46%",
              height: "72%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: fonts.body, fontWeight: 700, fontSize: "13px",
                color: "#1a1a1a", margin: 0, lineHeight: 1.35,
              }}>
                Atomic<br/>Habits – Ch. 4
              </p>
              <div style={{
                background: "#EAB308",
                borderRadius: "999px",
                padding: "4px 10px",
              }}>
                <p style={{
                  fontFamily: fonts.body, fontWeight: 700, fontSize: "9.5px",
                  color: "#1a1a1a", margin: 0, whiteSpace: "nowrap",
                }}>
                  1% better every day
                </p>
              </div>
            </div>
          </div>

          <p style={{
            fontFamily: fonts.body, fontSize: "11px", color: "#6B7280",
            margin: 0, textAlign: "center",
          }}>
            Book Note
          </p>
        </div>

      </div>
    </div>
  )
}
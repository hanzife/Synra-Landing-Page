import { useEffect, useRef, useState } from "react"
import { fonts } from "../../tokens/tokens"
import AliAbdaalImage from "../../assets/images/aliabdaal-video.png"

export default function SemanticCard() {
  const [hovered, setHovered] = useState(false)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const leftCardRef = useRef(null)
  const rightCardRef = useRef(null)
  const nodeBoxRef = useRef(null)

  function diamond(ctx, x, y, size, alpha) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(Math.PI / 4)
    ctx.fillStyle = `rgba(84,53,208,${alpha})`
    ctx.beginPath()
    ctx.rect(-size / 2, -size / 2, size, size)
    ctx.fill()
    ctx.restore()
  }

  const drawLines = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const leftCard = leftCardRef.current
    const rightCard = rightCardRef.current
    const nodeBox = nodeBoxRef.current
    if (!canvas || !container || !leftCard || !rightCard || !nodeBox) return

    const dpr = window.devicePixelRatio || 1
    const cRect = container.getBoundingClientRect()
    const lRect = leftCard.getBoundingClientRect()
    const rRect = rightCard.getBoundingClientRect()
    const nRect = nodeBox.getBoundingClientRect()

    canvas.width = cRect.width * dpr
    canvas.height = cRect.height * dpr
    canvas.style.width = cRect.width + "px"
    canvas.style.height = cRect.height + "px"

    const ctx = canvas.getContext("2d")
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, cRect.width, cRect.height)

    // Anchor points (container-relative)
    const lx = lRect.right - cRect.left
    const ly = lRect.top + lRect.height / 2 - cRect.top
    const rx = rRect.left - cRect.left
    const ry = rRect.top + rRect.height / 2 - cRect.top
    const nx_l = nRect.left - cRect.left
    const nx_r = nRect.right - cRect.left
    const ny = nRect.top + nRect.height / 2 - cRect.top

    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1.5
    ctx.strokeStyle = "rgba(84,53,208,0.5)"

    // Left S-curve: left card → left edge of center node
    const midX_l = (lx + nx_l) / 2
    ctx.beginPath()
    ctx.moveTo(lx, ly)
    ctx.bezierCurveTo(
      lx + (midX_l - lx) * 0.6, ly,
      nx_l - (midX_l - lx) * 0.6, ny,
      nx_l, ny
    )
    ctx.stroke()

    // Right S-curve: right edge of center node → right card
    ctx.beginPath()
    ctx.moveTo(nx_r, ny)
    ctx.bezierCurveTo(
      nx_r + (rx - nx_r) * 0.4, ny,
      rx - (rx - nx_r) * 0.6, ry,
      rx, ry
    )
    ctx.stroke()

    ctx.setLineDash([])

    // Diamonds on all 4 connection points
    diamond(ctx, lx, ly, 9, 0.7)
    diamond(ctx, rx, ry, 9, 0.7)
    diamond(ctx, nx_l, ny, 8, 0.65)
    diamond(ctx, nx_r, ny, 8, 0.65)
  }

  useEffect(() => {
    const t = setTimeout(drawLines, 120)
    window.addEventListener("resize", drawLines)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", drawLines)
    }
  }, [])

  // Redraw when hover state changes (node glow shifts bounding box slightly)
  useEffect(() => {
    drawLines()
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
        boxShadow: hovered ? "0 8px 32px rgba(84,53,208,0.10)" : "none",
      }}
    >
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(84,53,208,0.08)" }} />

      <h3 style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "18px", color: "#010312", margin: 0 }}>
        Semantic connections
      </h3>

      <p style={{ fontFamily: fonts.body, fontSize: "14px", lineHeight: 1.6, color: "#2D3B6B", margin: 0 }}>
        Save a video about deep work and Synra links it to your note on time-blocking — because they mean the same thing, even if the words differ.
      </p>

      {/* Illustration */}
      <div
        ref={containerRef}
        style={{
          marginTop: "auto", minHeight: "210px", borderRadius: "16px",
          background: "#F8F9FC", position: "relative",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "20px 16px",
        }}
      >
        {/* Canvas — sits behind everything */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />

        {/* Left: Video card */}
        <div
          ref={leftCardRef}
          style={{
            width: "150px", borderRadius: "14px", background: "#FFFFFF",
            border: "1px solid #E8ECF2", overflow: "hidden", flexShrink: 0,
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 2, position: "relative",
          }}
        >
          <div style={{
            height: "88px",
            backgroundImage: `url(${AliAbdaalImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              position: "absolute", top: "8px", left: "8px", background: "#FF0000",
              borderRadius: "4px", padding: "2px 5px", display: "flex", alignItems: "center",
            }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 1.5L6.5 4L2 6.5V1.5Z" fill="white" />
              </svg>
            </div>
           
          </div>
          <div style={{ padding: "10px 12px" }}>
            <p style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "13px", color: "#010312", margin: "0 0 2px" }}>Deep work</p>
            <p style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: "11px", color: "#5435D0", margin: 0 }}>Bookmark</p>
          </div>
        </div>

        {/* Center: Synra node */}
        <div
          style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 0,
          }}
        >
          {/* Semantic match pill */}
          <div style={{
            background: "white", border: "1px solid #E8ECF2",
            borderRadius: "999px", padding: "5px 14px",
            fontFamily: fonts.body, fontSize: "11px", fontWeight: 500, color: "#5435D0",
            whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "6px",
          }}>
            semantic match
          </div>

          {/* Dashed stem */}
          <div style={{
            width: "1px", height: "10px",
            borderLeft: "1.5px dashed rgba(84,53,208,0.35)",
          }} />

          {/* Top diamond connector */}
          <div style={{
            width: "8px", height: "8px",
            background: "rgba(84,53,208,0.7)",
            transform: "rotate(45deg)",
            marginBottom: "-4px",
            position: "relative", zIndex: 4,
          }} />

          {/* Node */}
          <div
            ref={nodeBoxRef}
            style={{
              width: "52px", height: "52px", borderRadius: "16px",
              background: "linear-gradient(135deg, #6B52E8, #4021C4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: hovered ? "0 0 0 10px rgba(84,53,208,0.08)" : "0 0 0 5px rgba(84,53,208,0.06)",
              transition: "box-shadow 0.4s ease",
              position: "relative", zIndex: 4,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="7" fill="none" stroke="white" strokeWidth="2.5" />
              <circle cx="11" cy="11" r="3" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right: Sticky note */}
        <div
          ref={rightCardRef}
          style={{
            width: "140px", borderRadius: "14px", background: "#FEF7A0",
            padding: "12px", flexShrink: 0,
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)", zIndex: 2, position: "relative",
          }}
        >
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px", background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="3" width="10" height="1.5" rx="0.75" fill="#F59E0B" />
              <rect x="2" y="6" width="8" height="1.5" rx="0.75" fill="#F59E0B" opacity="0.6" />
              <rect x="2" y="9" width="6" height="1.5" rx="0.75" fill="#F59E0B" opacity="0.4" />
            </svg>
          </div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "15px", lineHeight: 1.4, color: "#1a1a1a", margin: 0, fontWeight: 600 }}>
            Block 2hr deep work sessions every morning
          </p>
        </div>

      </div>
    </div>
  )
}
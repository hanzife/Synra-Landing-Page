import { useEffect, useRef } from "react"
import { fonts, colors } from "../../tokens/tokens"

const CLUSTERS = [
  { id: 0, label: "Lifestyle", angle: 0 },
  { id: 1, label: "University", angle: 60 },
  { id: 2, label: "Health", angle: 120 },
  { id: 3, label: "Career", angle: 180 },
  { id: 4, label: "Travel", angle: 240 },
  { id: 5, label: "Work", angle: 300 },
]

const CHILD_LABELS = {
  Lifestyle: ["Morning run", "Journaling", "Diet log", "Sleep track"],
  University: ["Thesis notes", "Lectures", "Research", "Study group"],
  Health: ["Checkup", "Medication", "Workout", "Mindfulness"],
  Career: ["Resume", "Interview", "Goals", "Side project"],
  Travel: ["Chefchaouen", "Flights", "Packing", "Memories"],
  Work: ["Client X", "Sprint", "Meeting", "Design review"],
}

function buildGraph(cx, cy) {
  const nodes = []
  const edges = []

  nodes.push({ id: "mind", x: cx, y: cy, r: 36, type: "center", label: "Your Mind", hovered: false, childVisible: false })

  const HUB_DIST = 160
  const CHILD_DIST = 85

  for (const cl of CLUSTERS) {
    const rad = (cl.angle * Math.PI) / 180
    const hx = cx + Math.cos(rad) * HUB_DIST
    const hy = cy + Math.sin(rad) * HUB_DIST

    nodes.push({ id: `hub-${cl.id}`, x: hx, y: hy, r: 18, type: "hub", label: cl.label, cluster: cl.id, hovered: false })
    edges.push({ a: "mind", b: `hub-${cl.id}`, type: "main" })

    const children = CHILD_LABELS[cl.label]
    children.forEach((childLabel, i) => {
      const spread = (i - (children.length - 1) / 2) * 32
      const perpRad = rad + Math.PI / 2
      const childAngle = rad + (spread / CHILD_DIST)
      const chx = hx + Math.cos(childAngle) * CHILD_DIST
      const chy = hy + Math.sin(childAngle) * CHILD_DIST
      const cid = `child-${cl.id}-${i}`
      nodes.push({ id: cid, x: chx, y: chy, r: 7, type: "child", label: childLabel, cluster: cl.id, hovered: false })
      edges.push({ a: `hub-${cl.id}`, b: cid, type: "child" })
    })
  }

  return { nodes, edges }
}

export default function KnowledgeGraph() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animId = null
    let tick = 0

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const resize = () => {
      canvas.width = W() * window.devicePixelRatio
      canvas.height = H() * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      if (stateRef.current) {
        stateRef.current.nodes = buildGraph(W() / 2, H() / 2).nodes
        stateRef.current.edges = buildGraph(W() / 2, H() / 2).edges
      }
    }

    const { nodes, edges } = buildGraph(W() / 2, H() / 2)
    stateRef.current = { nodes, edges, hoveredCluster: null }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      tick++
      const s = stateRef.current
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      const centerNode = s.nodes.find(n => n.id === "mind")

      for (let i = 3; i >= 1; i--) {
        const pulse = Math.sin(tick * 0.018 + i) * 6
        ctx.beginPath()
        ctx.arc(centerNode.x, centerNode.y, centerNode.r * (i * 1.8) + pulse, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(84,53,208,${0.06 - i * 0.01})`
        ctx.fillStyle = `rgba(84,53,208,${0.04 - i * 0.008})`
        ctx.lineWidth = 1
        ctx.fill()
        ctx.stroke()
      }

      for (const e of s.edges) {
        const a = s.nodes.find(n => n.id === e.a)
        const b = s.nodes.find(n => n.id === e.b)
        if (!a || !b) continue

        const isActive = s.hoveredCluster !== null && (
          (b.cluster === s.hoveredCluster) || (a.cluster === s.hoveredCluster)
        )

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.setLineDash(e.type === "child" ? [3, 5] : [5, 7])
        ctx.strokeStyle = isActive
          ? "rgba(84,53,208,0.55)"
          : e.type === "main"
            ? "rgba(84,53,208,0.2)"
            : "rgba(84,53,208,0.1)"
        ctx.lineWidth = isActive ? 1.2 : 0.8
        ctx.stroke()
        ctx.setLineDash([])
      }

      for (const n of s.nodes) {
        const isActive = n.cluster === s.hoveredCluster || n.id === "mind"
        const pulse = Math.sin(tick * 0.022 + (n.cluster ?? 0)) * 0.08 + 1

        if (n.type === "center") {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5)
          grd.addColorStop(0, "rgba(84,53,208,0.35)")
          grd.addColorStop(1, "transparent")
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()

          const fill = ctx.createRadialGradient(n.x - 8, n.y - 8, 0, n.x, n.y, n.r)
          fill.addColorStop(0, "#7B5FE8")
          fill.addColorStop(1, "#4021C4")
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fillStyle = fill
          ctx.fill()

          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = `600 13px 'Inter', sans-serif`
          ctx.fillStyle = "white"
          ctx.fillText("Your Mind", n.x, n.y)

        } else if (n.type === "hub") {
          const r = n.r * (isActive ? 1.2 * pulse : pulse)

          // Glow on hover
          if (isActive) {
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.5)
            grd.addColorStop(0, "rgba(84,53,208,0.3)")
            grd.addColorStop(1, "transparent")
            ctx.beginPath()
            ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2)
            ctx.fillStyle = grd
            ctx.fill()
          }

          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = isActive ? "#5435D0" : "rgba(84,53,208,0.15)"
          ctx.strokeStyle = isActive ? "#7B5FE8" : "rgba(84,53,208,0.4)"
          ctx.lineWidth = 1.2
          ctx.fill()
          ctx.stroke()

          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = `500 11px 'Inter', sans-serif`
          ctx.fillStyle = isActive ? "#010312" : "rgba(1,3,18,0.5)"
          ctx.fillText(n.label, n.x, n.y + r + 14)

        } else if (n.type === "child") {
          const r = n.r * (isActive ? 1.15 : 1)

          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = isActive ? "#2DD4BF" : "rgba(45,212,191,0.3)"
          ctx.strokeStyle = isActive ? "#5EEAD4" : "rgba(45,212,191,0.2)"
          ctx.lineWidth = 0.8
          ctx.fill()
          ctx.stroke()

          // Child label on hover
          if (isActive) {
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = `400 9.5px 'Inter', sans-serif`
            ctx.fillStyle = "rgba(1,3,18,0.5)"
            ctx.fillText(n.label, n.x, n.y + r + 10)
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const s = stateRef.current
      let hit = null

      for (const n of s.nodes) {
        if (n.type !== "hub") continue
        const dx = n.x - mx
        const dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < n.r + 12) { hit = n.cluster; break }
      }

      s.hoveredCluster = hit
      canvas.style.cursor = hit !== null ? "pointer" : "default"
    }

    const onMouseLeave = () => {
      if (stateRef.current) stateRef.current.hoveredCluster = null
    }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <section id="knowledge-graph" style={{
      background: "#FFFFFF",
      padding: "100px 0 0",
      overflow: "hidden",
    }}>

      <div style={{ maxWidth: "1124px", margin: "0 auto 64px", textAlign: "center", padding: "0 24px" }}>
        <p style={{
          fontFamily: fonts.body,
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: colors.primary,
          marginBottom: "16px",
        }}>
          Connectivity
        </p>
        <h2 style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: "clamp(32px, 4vw, 52px)",
          lineHeight: 1.1,
          letterSpacing: "-1px",
          color: "#010312",
          marginBottom: "20px",
        }}>
          Your memories don't live in silos.
        </h2>
        <p style={{
          fontFamily: fonts.body,
          fontSize: "17px",
          lineHeight: 1.7,
          color: "#2D3B6B",
          maxWidth: "560px",
          margin: "0 auto",
        }}>
          Every capture is automatically connected to related ones by meaning,
          not keyword. A living graph that grows smarter as you do.
        </p>
      </div>

      <div style={{ position: "relative", width: "100%", height: "560px" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "560px", display: "block", background: "#FFFFFF" }}
        />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "80px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          pointerEvents: "none",
        }} />
        <p style={{
          position: "absolute", bottom: "20px", left: "50%",
          transform: "translateX(-50%)",
          fontFamily: fonts.body, fontSize: "11px",
          color: "rgba(1,3,18,0.25)", whiteSpace: "nowrap",
          pointerEvents: "none",
        }}>
          Hover clusters to explore
        </p>
      </div>
    </section >
  )
}
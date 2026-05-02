import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "Knowledge Graph", href: "#knowledge-graph" },
  { label: "Features",        href: "#features"        },
  { label: "How it works",    href: "#how-it-works"    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "32px 24px 0" }}>

      {/* Nav pill */}
      <div style={{
        maxWidth:             "1240px",
        margin:               "0 auto",
        borderRadius:         "999px",
        padding:              scrolled ? "10px 20px" : "12px 24px",
        display:              "flex",
        alignItems:           "center",
        background:           scrolled ? "rgba(255,255,255,0.62)" : "transparent",
        backdropFilter:       scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        border:               scrolled ? "1px solid rgba(255,255,255,0.85)" : "1px solid transparent",
        boxShadow:            scrolled ? "0 8px 32px rgba(84,53,208,0.10), 0 2px 8px rgba(0,0,0,0.06)" : "none",
        transition:           "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>

        {/* Left: Logo */}
        <div style={{ flex: 1 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "linear-gradient(135deg, #5435D0, #4021C4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(84,53,208,0.35)",
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3.2" fill="white" />
                <circle cx="9" cy="2.8" r="1.7" fill="white" opacity="0.65" />
                <circle cx="15" cy="12.2" r="1.7" fill="white" opacity="0.65" />
                <circle cx="3" cy="12.2" r="1.7" fill="white" opacity="0.65" />
                <line x1="9" y1="4.5" x2="9" y2="5.8" stroke="white" strokeWidth="1.2" opacity="0.45" />
                <line x1="13.4" y1="11.3" x2="12.1" y2="10.5" stroke="white" strokeWidth="1.2" opacity="0.45" />
                <line x1="4.6" y1="11.3" x2="5.9" y2="10.5" stroke="white" strokeWidth="1.2" opacity="0.45" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px", color: "#010312", letterSpacing: "-0.3px" }}>
              Synra
            </span>
          </a>
        </div>

        {/* Center: Links */}
        <nav style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "36px" }} className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "14px", color: "#2D3B6B", textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s ease" }}
              onMouseEnter={e => e.target.style.color = "#5435D0"}
              onMouseLeave={e => e.target.style.color = "#2D3B6B"}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }} className="nav-cta">
          <a href="#download"
            style={{
              padding: "10px 22px", borderRadius: "999px",
              background: "linear-gradient(135deg, #5435D0, #4021C4)",
              color: "white", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: "14px", textDecoration: "none",
              boxShadow: "0 2px 12px rgba(84,53,208,0.30)",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(84,53,208,0.45)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 2px 12px rgba(84,53,208,0.30)" }}
          >
            Download free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-burger"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="#010312" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="#010312" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="7"  x2="19" y2="7"  stroke="#010312" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="13" x2="19" y2="13" stroke="#010312" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        maxWidth: "1240px", margin: "8px auto 0", borderRadius: "20px", overflow: "hidden",
        maxHeight: menuOpen ? "300px" : "0px", opacity: menuOpen ? 1 : 0,
        background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 8px 32px rgba(84,53,208,0.10)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "15px", color: "#2D3B6B", textDecoration: "none" }}>
              {link.label}
            </a>
          ))}
          <a href="#download" style={{
            display: "flex", justifyContent: "center", padding: "12px", borderRadius: "999px",
            background: "linear-gradient(135deg, #5435D0, #4021C4)", color: "white",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none",
          }}>
            Download free
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
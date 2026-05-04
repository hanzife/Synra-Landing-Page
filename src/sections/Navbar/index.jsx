import { useState, useEffect } from "react"
import { fontSizes } from "../../tokens/tokens"
import { body } from "framer-motion/client"

const NAV_LINKS = [
    { label: "Knowledge Graph", href: "#knowledge-graph" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
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
                maxWidth: "1240px",
                margin: "0 auto",
                borderRadius: "999px",
                padding: scrolled ? "10px 20px" : "12px 24px",
                display: "flex",
                alignItems: "center",
                background: scrolled ? "rgba(255,255,255,0.62)" : "transparent",
                backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                border: scrolled ? "1px solid rgba(255,255,255,0.85)" : "1px solid transparent",
                boxShadow: scrolled ? "0 8px 32px rgba(84,53,208,0.10), 0 2px 8px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>

                <div style={{ flex: 1 }}>
                    <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                       
                            <svg width="26" height="26" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 0C15.5 0 19.9292 0.000143928 22.1436 4.42871C24.358 8.857 31 8.85729 31 15.5C31 22.1427 24.358 22.143 22.1436 26.5713C19.9292 30.9999 15.5 31 15.5 31C15.4648 30.9999 11.0629 30.9822 8.85742 26.5713C6.6431 22.1428 1.37154e-05 22.1428 0 15.5C0 8.85718 6.64308 8.85722 8.85742 4.42871C11.0629 0.0178483 15.4648 7.04953e-05 15.5 0ZM15.5 8.59473C11.6864 8.59485 8.59473 11.6864 8.59473 15.5C8.59491 19.3134 11.6865 22.4052 15.5 22.4053C19.3136 22.4053 22.4051 19.3135 22.4053 15.5C22.4053 11.6864 19.3137 8.59473 15.5 8.59473Z"
                                    fill="#5435D0" />
                            </svg>

                        <span style={{
                            fontFamily: body.display,
                            fontWeight: 800,
                            fontSize: "18px",
                            color: "#010312",
                            letterSpacing: "-0.3px"
                        }}>
                            Synra
                        </span>
                    </a>
                </div>

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

                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }} className="nav-cta">
                    <a href="https://apps.apple.com/ma/app/synra-chat-with-your-memories/id6762082982"
                        style={{
                            padding: "10px 22px", borderRadius: "999px",
                            background: "linear-gradient(135deg, #5435D0, #4021C4)",
                            color: "white", fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600, fontSize: "14px", textDecoration: "none",
                            boxShadow: "0 2px 12px rgba(84,53,208,0.30)",
                            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(84,53,208,0.45)" }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(84,53,208,0.30)" }}
                    >
                        Download free
                    </a>
                </div>

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
                                <line x1="3" y1="7" x2="19" y2="7" stroke="#010312" strokeWidth="2" strokeLinecap="round" />
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
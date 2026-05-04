import { useState, useEffect, useRef } from "react"
import { colors, fonts, fontSizes, fontWeights, radius, shadows, transition } from "../../tokens/tokens"

const LINKS = {
    Product: [
        { label: "Knowledge Graph", href: "#knowledge-graph" },
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
    ],
}

function FooterLink({ label, href }) {
    return (
        <a href={href} style={{
            fontFamily: fonts.body, fontSize: fontSizes.sm,
            fontWeight: fontWeights.regular, color: "rgba(255,255,255,0.4)",
            textDecoration: "none", display: "block",
        }}>
            {label}
        </a>
    )
}

function CTAButton() {
    return (
        <a href="https://apps.apple.com/ma/app/synra-chat-with-your-memories/id6762082982" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "14px 28px", borderRadius: radius.full,
            background: "linear-gradient(135deg, #5435D0, #4021C4)",
            color: "white", fontFamily: fonts.body,
            fontWeight: fontWeights.semibold, fontSize: fontSizes.sm,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(84,53,208,0.35)",
        }}>
            Download free
        </a>
    )
}

function SocialIcon({ path }) {
    return (
        <a href="#" style={{
            width: "34px", height: "34px", borderRadius: radius.sm,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none",
        }}>
            <svg width="14" height="14" viewBox="0 0 22 22" fill="none"
                stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
                <path d={path} />
            </svg>
        </a>
    )
}

export default function Footer() {
    const [visible, setVisible] = useState(false)
    const ctaRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        if (ctaRef.current) observer.observe(ctaRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <footer style={{ background: colors.dark, position: "relative", overflow: "hidden" }}>

            {/* Orbs */}
            <div style={{
                position: "absolute", top: "-10%", left: "50%",
                transform: "translateX(-50%)",
                width: "900px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(84,53,208,0.18) 0%, transparent 65%)",
                pointerEvents: "none", zIndex: 0,
            }} />
            <div style={{
                position: "absolute", bottom: "0", left: "-10%",
                width: "400px", height: "400px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(84,53,208,0.08) 0%, transparent 70%)",
                pointerEvents: "none", zIndex: 0,
            }} />

            {/* CTA */}
            <div
                ref={ctaRef}
                style={{
                    maxWidth: "1124px",
                    margin: "0 auto",
                    padding: "100px 24px 80px",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(32px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
            >
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "6px 16px", borderRadius: radius.full,
                    background: "rgba(84,53,208,0.15)", border: "1px solid rgba(84,53,208,0.3)",
                    marginBottom: "28px",
                }}>
                    <div style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: colors.primary, boxShadow: `0 0 8px ${colors.primary}`,
                    }} />
                    <span style={{
                        fontFamily: fonts.body, fontSize: fontSizes.xs,
                        fontWeight: fontWeights.semibold, color: "rgba(255,255,255,0.7)",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                        Available on iOS
                    </span>
                </div>

                <h2 style={{
                    fontFamily: fonts.display, fontWeight: fontWeights.bold,
                    fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05,
                    letterSpacing: "-1.5px", color: "white", margin: "0 0 20px",
                }}>
                    Start building your<br />
                    <span style={{
                        background: "linear-gradient(135deg, #7B5FE8, #5435D0)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                        second brain.
                    </span>
                </h2>

                <p style={{
                    fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 1.7,
                    color: "rgba(255,255,255,0.45)", margin: "0 auto 40px", maxWidth: "400px",
                }}>
                    Free to start. No credit card. Your thoughts deserve better than scattered notes.
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                    <CTAButton />
                  
                </div>

                <p style={{ fontFamily: fonts.body, fontSize: fontSizes.xs, color: "rgba(255,255,255,0.2)", marginTop: "16px" }}>
                    No credit card required
                </p>
            </div>

          
        

            <div style={{
                maxWidth: "1124px", margin: "0 auto", padding: "20px 24px 40px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                position: "relative", zIndex: 1, flexWrap: "wrap", gap: "12px",
            }}>
                <p style={{ fontFamily: fonts.body, fontSize: fontSizes.xs, color: "rgba(255,255,255,0.2)", margin: 0 }}>
                    © 2025 Synra. All rights reserved.
                </p>
                <p style={{ fontFamily: fonts.body, fontSize: fontSizes.xs, color: "rgba(255,255,255,0.2)", margin: 0 }}>
                    Made with ♥ for curious minds.
                </p>
            </div>

        </footer >
    )
}
import { useEffect, useRef } from "react"
import { fonts } from "../../tokens/tokens"
import heroBg from "../../assets/hero-bg.png"

import phoneMockup from "../../assets/phone-mockup.png"
import PhoneMockupCards from "../../components/ui/PhoneMockupCards.jsx"




export default function Hero() {
    const phoneRef = useRef(null)

    useEffect(() => {
        const onMouseMove = (e) => {
            const { innerWidth, innerHeight } = window
            const x = (e.clientX / innerWidth - 0.5) * 20
            const y = (e.clientY / innerHeight - 0.5) * -14
            if (phoneRef.current) {
                phoneRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`
            }
        }
        const onMouseLeave = () => {
            if (phoneRef.current) {
                phoneRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"
            }
        }
        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mouseleave", onMouseLeave)
        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mouseleave", onMouseLeave)
        }
    }, [])

    return (
        <section className="hero-section" style={{
            position: "relative",
            height: "100vh",
            maxHeight: window.innerWidth >= 1440 ? "840px" : "100vh",
            background: "#F2F6F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: "0 24px",

        }}>

            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                zIndex: 0,
            }} />

            <div className="hero-overlay" style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, #F2F6F9 30%, rgba(242,246,249,0.85) 50%, rgba(242,246,249,0.2) 70%, transparent 100%)",
                zIndex: 1,
            }} />

            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "65%",
                background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(97,68,230,0.18) 0%, rgba(73,42,201,0.08) 40%, transparent 70%)",
                animation: "pulse 6s ease-in-out infinite",
                pointerEvents: "none",
                zIndex: 0,
            }} />

            <div className="hero-inner" style={{
                maxWidth: "1124px",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "48px",
                paddingTop: "120px",
                paddingBottom: "80px",
                position: "relative",
                zIndex: 1,
            }}>

                <div style={{ flex: "0 0 auto", maxWidth: "520px" }}>

                    <h1 style={{
                        fontFamily: fonts.display,
                        fontWeight: 800,
                        fontSize: "clamp(48px, 5.5vw, 72px)",
                        lineHeight: 1.05,
                        letterSpacing: "-1.5px",
                        color: "#010312",
                        marginBottom: "24px",
                    }}>
                        Your thoughts,{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #5435D0, #7B5FE8)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            Connected.
                        </span>
                    </h1>

                    <p className="hero-text" style={{
                        fontFamily: fonts.body,
                        fontSize: "17px",
                        lineHeight: 1.7,
                        color: "#2D3B6B",
                        marginBottom: "40px",
                        maxWidth: "420px",
                    }}>
                        Synra captures your thoughts, links, voice memos, and images
                        then connects them into a living knowledge graph you can
                        actually talk to.
                    </p>

                    <div className="hero-buttons" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <a href="https://apps.apple.com/ma/app/synra-chat-with-your-memories/id6762082982"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "14px 28px",
                                borderRadius: "999px",
                                background: "linear-gradient(135deg, #5435D0, #4021C4)",
                                color: "white",
                                fontFamily: fonts.body,
                                fontWeight: 600,
                                fontSize: "15px",
                                textDecoration: "none",
                                boxShadow: "0 4px 20px rgba(84,53,208,0.35)",
                                transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(84,53,208,0.45)" }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(84,53,208,0.35)" }}
                        >
                            <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
                                <path d="M12.5 8.8C12.5 7.3 13.3 6.1 15 5.4C14.1 4.1 12.7 3.4 11.1 3.3C9.6 3.2 8.2 4.1 7.4 4.1C6.7 4.1 5.4 3.3 4.1 3.3C2.2 3.4 0 4.8 0 7.9C0 11 2.3 14.6 4.2 14.6C5.1 14.6 5.9 14 7.2 14C8.5 14 9.2 14.6 10.3 14.6C12.3 14.6 14.3 11 14.8 9.2C13.2 8.4 12.5 8.8 12.5 8.8ZM9.8 1.8C10.5 1 10.9 0 10.7 -0.9C9.9 -0.8 8.8 -0.3 8.1 0.5C7.4 1.2 6.9 2.3 7.1 3.1C8 3.1 9.1 2.6 9.8 1.8Z" fill="white" transform="translate(0, 1.5)" />
                            </svg>
                            Download free
                        </a>

                        <a href="#how-it-works"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "14px 28px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.7)",
                                border: "1px solid rgba(84,53,208,0.15)",
                                color: "#010312",
                                fontFamily: fonts.body,
                                fontWeight: 600,
                                fontSize: "15px",
                                textDecoration: "none",
                                backdropFilter: "blur(12px)",
                                transition: "all 0.25s ease",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#5435D0"; e.currentTarget.style.color = "#5435D0" }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(84,53,208,0.15)"; e.currentTarget.style.color = "#010312" }}
                        >
                            See how it works
                        </a>
                    </div>

                    <p style={{
                        fontFamily: fonts.body,
                        fontSize: "13px",
                        color: "#9CA3AF",
                        marginTop: "16px",
                    }}>
                        No credit card required
                    </p>
                </div>


                <div className="hero-phone" ref={phoneRef}
                        style={{
                            transition: "transform 0.12s ease-out",
                            willChange: "transform",
                            transformStyle: "preserve-3d",
                        }}>
                    <PhoneMockupCards />
                </div>


            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.05); }
        }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column !important; text-align: center; }
  .hero-inner img { width: 300px !important; }

           .hero-overlay {
    background: linear-gradient(to bottom, #F2F6F9 40%, rgba(242,246,249,0.85) 60%, rgba(242,246,249,0.2) 80%, transparent 100%) !important;
  }
 .hero-inner { 
    flex-direction: column !important;
    text-align: center;
  }
  .hero-inner .hero-text { order: 1; }
  .hero-inner .hero-phone { order: 2; }


   .hero-section {
    height: auto !important;
    min-height: fit-content !important;
    padding: 100px 24px 60px !important;
  }

  .hero-inner {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 32px !important;
  }

  .hero-text {
    max-width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .hero-text p {
    text-align: center !important;
  }

  .hero-buttons {
    justify-content: center !important;
    width: 100% !important;
  }

  .hero-phone { 
    order: 2;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
  }

  .hero-inner img { 
    width: 300px !important; 
  }

  
   .hero-phone {
    margin-top: 62px !important;
  }

           .hero-section {
    height: auto !important;
    min-height: fit-content !important;
    padding-top: 100px !important;
    padding-bottom: 60px !important;
  }
        }
      `}</style>
        </section>
    )
}
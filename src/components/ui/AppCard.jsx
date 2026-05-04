import { fonts } from "../../tokens/tokens"
import appMockup from "../../assets/images/app-mockups.png"

export default function AppCard() {
    return (
        <div style={{
            background: "#FFFFFF",
            border: "1px solid #DDE3ED",
            borderRadius: "20px",
            padding: "40px 0px 0px 48px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            overflow: "hidden",
            position: "relative",
            minHeight: "280px",
        }}>

            <div style={{ flex: "0 0 auto", maxWidth: "360px", zIndex: 2 }}>

                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: "rgba(84,53,208,0.06)",
                    border: "1px solid rgba(84,53,208,0.12)",
                    marginBottom: "16px",
                }}>
                    <div style={{
                        width: "5px", height: "5px", borderRadius: "50%",
                        background: "#5435D0", boxShadow: "0 0 6px rgba(84,53,208,0.6)",
                    }} />
                    <span style={{
                        fontFamily: fonts.body, fontSize: "11px", fontWeight: 600,
                        color: "#5435D0", letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>
                        Available on iOS
                    </span>
                </div>

                <h3 style={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "clamp(22px, 2.5vw, 32px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                    color: "#010312",
                    margin: "0 0 12px",
                }}>
                    A gorgeous native<br />iOS app.
                </h3>

                <p style={{
                    fontFamily: fonts.body, fontSize: "14px",
                    lineHeight: 1.7, color: "#2D3B6B",
                    margin: "0 0 24px", maxWidth: "300px",
                }}>
                    Capture thoughts the moment they happen. Voice, text, photo, or link — enriched instantly.
                </p>

                <a href="https://apps.apple.com"  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    marginBottom:"40px",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #5435D0, #4021C4)",
                    color: "white",
                    fontFamily: fonts.body,
                    fontWeight: 600,
                    fontSize: "13px",
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(84,53,208,0.3)",
                }}>
                    <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
                        <path d="M11.5 8.3C11.5 6.8 12.3 5.6 14 4.9C13.1 3.6 11.7 2.9 10.1 2.8C8.6 2.7 7.2 3.6 6.4 3.6C5.7 3.6 4.4 2.8 3.1 2.8C1.2 2.9 0 4.3 0 7.4C0 10.5 2.3 14.1 4.2 14.1C5.1 14.1 5.9 13.5 7.2 13.5C8.5 13.5 9.2 14.1 10.3 14.1C12.3 14.1 14.3 10.5 14 8.7C12.4 7.9 11.5 8.3 11.5 8.3ZM9.3 1.5C10 0.7 10.4 -0.3 10.2-1.2C9.4-1.1 8.3-0.6 7.6 0.2C6.9 0.9 6.4 2 6.6 2.8C7.5 2.8 8.6 2.3 9.3 1.5Z" fill="white" transform="translate(0,1)" />
                    </svg>
                    Download on App Store
                </a>
            </div>

            <div style={{
                flex: "1",
                position: "relative",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                overflow: "hidden",
                alignSelf: "stretch",
            }}>
                <img
                    src={appMockup}
                    alt="Synra iOS app"
                    style={{
                        height: "420px",
                        width: "100%",
                        objectFit: "contain",
                        objectPosition: "top",
                        transform: "rotate(-4deg) translate(40px, 40px)",
                        filter: "drop-shadow(0 32px 48px rgba(4,2,18,0.15)) drop-shadow(0 8px 16px rgba(84,53,208,0.12))",
                        position: "absolute",
                        bottom: "-40px",
                        right: "-20px",
                    }}
                />
            </div>

        </div>
    )
}
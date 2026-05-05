import { useState } from "react"
import phoneMockup from "../../assets/phone-mockup.png"
import card1 from "../../assets/images/phone-card-1.png"
import card2 from "../../assets/images/phone-card-2.png"
import card3 from "../../assets/images/phone-card-3.png"
import card4 from "../../assets/images/phone-card-4.png"

const cards = [
    { id: 1, src: card1, top: "40%", alt: "Photo memory 1" },
    { id: 2, src: card2, top: "52%", alt: "Photo memory 2" },
    { id: 3, src: card3, top: "64%", alt: "Event memory" },
    { id: 4, src: card4, top: "76%", alt: "Note memory" },
]

export default function PhoneMockupCards() {
    const [hoveredId, setHoveredId] = useState(null)

    const getCardStyle = (id) => {
        const isHovered = hoveredId === id
        const isSibling = hoveredId !== null && hoveredId !== id

        return {
            position: "absolute",
            left: "6%",
            width: "88%",
            zIndex: isHovered ? 10 : 2,
            cursor: "pointer",
            borderRadius: "16px",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, opacity 0.3s ease",
            transform: isHovered
                ? "translateY(-10px) scale(1.03)"
                : isSibling
                    ? "translateY(3px) scale(0.98)"
                    : "translateY(0px) scale(1)",
            boxShadow: isHovered
                ? "0 24px 48px rgba(1,3,18,0.18), 0 8px 24px rgba(84,53,208,0.15)"
                : "0 4px 16px rgba(1,3,18,0.08)",
            opacity: isSibling ? 0.85 : 1,
        }
    }

    return (
        <div style={{
            position: "relative",
            width: "clamp(20px, 17vw, 320px)",
            margin: "0 auto",
        }}>
            {/* Phone mockup base */}
            <img
                src={phoneMockup}
                alt="Synra app"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    filter: "drop-shadow(0 40px 60px rgba(4,2,18,0.18)) drop-shadow(0 8px 24px rgba(84,53,208,0.2))",
                    position: "relative",
                    zIndex: 1,
                }}
            />

            {/* Floating cards */}
            {cards.map((card, i) => (
                <div
                    key={card.id}
                    style={{ ...getCardStyle(card.id), top: card.top }}
                    onMouseEnter={() => setHoveredId(card.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <img
                        src={card.src}
                        alt={card.alt}
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            borderRadius: "16px",
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
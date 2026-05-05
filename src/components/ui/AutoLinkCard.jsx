import { useState, useRef } from "react"
import { fonts } from "../../tokens/tokens"
import atomicHabitsImg from "../../assets/images/atomic-habits.png"
import podcastImg from "../../assets/images/podcast.png"

export default function AutoLinkCard() {
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef(null)

  return (
    <div
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
        boxShadow: hovered ? "0 8px 32px rgba(45,212,191,0.10)" : "none",
      }}
    >
      <div style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "rgba(45,212,191,0.1)",
      }} />

      <h3 style={{
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: "18px",
        color: "#010312",
        margin: 0,
      }}>
        Auto-linking at 75% similarity
      </h3>

      <p style={{
        fontFamily: fonts.body,
        fontSize: "14px",
        lineHeight: 1.6,
        color: "#2D3B6B",
        margin: 0,
      }}>
        Every capture is automatically connected to related ones by meaning, not keyword. A living graph that grows smarter as you do.
      </p>

      <div
        ref={containerRef}
        style={{
          marginTop: "auto",
          minHeight: "220px",
          borderRadius: "16px",
          //background: "#F8F9FC",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
          position: "relative",
        }}>
          <div style={{
            width: "120px",
            borderRadius: "14px",
            background: "#1a1a2e",
            overflow: "hidden",
            boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.22)" : "0 4px 16px rgba(0,0,0,0.15)",
            transition: "box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
          }}>

            <div style={{
              height: "110px",
              backgroundImage: `url(${podcastImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "10px",
            }}>

            </div>
          </div>

          <p style={{
            fontFamily: fonts.body,
            fontSize: "11px",
            color: "#6B7280",
            margin: 0,
            textAlign: "center",
          }}>
            Podcast Summary
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}>

          <p style={{
            fontFamily: fonts.body,
            fontSize: "11px",
            color: "#6B7280",
            margin: 0,
            whiteSpace: "nowrap",
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

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
          position: "relative",
        }}>
          <div style={{
            width: "130px",
            position: "relative",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
          }}>
            <img
              src={atomicHabitsImg}
              alt="Atomic Habits book"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "4px",
                filter: hovered
                  ? "drop-shadow(0 8px 20px rgba(0,0,0,0.22))"
                  : "drop-shadow(0 4px 12px rgba(0,0,0,0.14))",
                transition: "filter 0.35s ease",
              }}
            />

            <div style={{
              position: "absolute",
              top: "12%",
              width: "100%",
              height: "72%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "13px",
                color: "#1a1a1a",
                margin: 0,
                lineHeight: 1.35,
              }}>
                Atomic Habits <br />– Ch. 4
              </p>
              <div style={{
                background: "#EAB308",
                borderRadius: "999px",
                padding: "4px 10px",
              }}>
                <p style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "9.5px",
                  color: "#1a1a1a",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}>
                  1% better every day
                </p>
              </div>
            </div>
          </div>

          <p style={{
            fontFamily: fonts.body,
            fontSize: "11px",
            color: "#6B7280",
            margin: 0,
            textAlign: "center",
          }}>
            Book Note
          </p>
        </div>

      </div>
    </div>
  )
}
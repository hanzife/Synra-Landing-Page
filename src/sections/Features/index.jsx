import { fonts } from "../../tokens/tokens"
import SemanticCard from "../../components/ui/SemanticCard"
import AutoLinkCard from "../../components/ui/AutoLinkCard"
import HybridSearchCard from "../../components/ui/HybridSearchCard"
import CrossTypeCard from "../../components/ui/CrossTypeCard"
import AppCard from "../../components/ui/AppCard"


export default function Features() {
    return (
        <section id="features" style={{
            background: "#ffffff",
            padding: "100px 24px",
        }}>
            <div style={{ maxWidth: "1124px", margin: "0 auto" }}>

                <div style={{ marginBottom: "56px" }}>
                    <p style={{
                        fontFamily: fonts.body,
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#5435D0",
                        marginBottom: "12px",
                    }}>
                        What you can do
                    </p>
                    <h2 style={{
                        fontFamily: fonts.display,
                        fontWeight: 800,
                        fontSize: "clamp(28px, 3.5vw, 46px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.8px",
                        color: "#010312",
                        maxWidth: "480px",
                        margin: "0",
                    }}>
                        Built different.<br />Works like magic.
                    </h2>
                </div>


                <div style={row} className="feat-row">
                    <div style={{ ...col, flex: "0 0 calc(60% - 8px)" }} className="feat-col">
                        <SemanticCard />
                    </div>
                    <div style={{ ...col, flex: "0 0 calc(40% - 8px)" }} className="feat-col">
                        <AutoLinkCard />
                    </div>
                </div>

                <div style={{ ...row, marginTop: "16px" }} className="feat-row">
                    <div style={{ ...col, flex: "0 0 calc(35% - 8px)" }} className="feat-col">
                        <HybridSearchCard />
                    </div>
                    <div style={{ ...col, flex: "0 0 calc(65% - 8px)" }} className="feat-col">
                        <CrossTypeCard />
                    </div>
                </div>

                <div style={{ ...row, marginTop: "16px" }} className="feat-row">
                    <div style={{ ...col, flex: "1" }} className="feat-col">
                        <AppCard />
                    </div>
                </div>
                
            </div>

            <style>{`
        @media (max-width: 768px) {
          .feat-row { flex-direction: column !important; }
          .feat-col { flex: 0 0 100% !important; width: 100% !important; }
        }
          @media (max-width: 1024px) {
        .feat-row { flex-direction: column !important; }
        .feat-col { flex: 0 0 100% !important; width: 100% !important; }
    }
      `}</style>
        </section>
    )
}

const row = {
    display: "flex",
    gap: "16px",
    alignItems: "stretch",
}

const col = {
    minWidth: 0,
}
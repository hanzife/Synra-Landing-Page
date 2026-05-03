export default function SemanticCard() {
  return (
    <div style={card}>
      <div style={{ ...iconBox, background: "rgba(84,53,208,0.08)" }} />
      <h3 style={title}>Semantic connections</h3>
      <p style={sub}>Save a video about deep work and Synra links it to your note on time-blocking. because they mean the same thing, even if the words differ.</p>
      <div style={illustration} />
    </div>
  )
}

const card = {
  background:    "#FFFFFF",
  border:        "1px solid #DDE3ED",
  borderRadius:  "20px",
  padding:       "32px",
  display:       "flex",
  flexDirection: "column",
  gap:           "12px",
  height:        "100%",
}

const iconBox = {
  width:        "44px",
  height:       "44px",
  borderRadius: "12px",
  marginBottom: "4px",
}

const title = {
  fontFamily:  "'Inter', sans-serif",
  fontWeight:  700,
  fontSize:    "18px",
  color:       "#010312",
  margin:      0,
}

const sub = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  fontSize:   "14px",
  lineHeight: 1.6,
  color:      "#2D3B6B",
  margin:     0,
}

const illustration = {
  marginTop:    "auto",
  paddingTop:   "24px",
  minHeight:    "160px",
  borderRadius: "12px",
  background:   "#F2F6F9",
}
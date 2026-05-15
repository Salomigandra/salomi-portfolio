/* ProjectBrief — consistent analyst card shown at the top of every case study */

const TOOLS_COLORS = {
  "Python": "#4A6073",
  "SQL": "#1A7A8A",
  "Excel": "#5A6E4F",
  "React/JS": "#C9A46F",
};

const INK = "#1C1C1C";
const GOLD = "#C9A46F";
const SLATE = "#4A6073";

export default function ProjectBrief({ question, tools, methods, output }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(28,28,28,0.09)",
      borderRadius: "16px",
      padding: "1.5rem 1.75rem",
      marginBottom: "0.5rem",
      boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      borderTop: `3px solid ${GOLD}`,
    }}>
      {/* Header */}
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
        📋 Project Brief
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>

        {/* Business Question */}
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: `${INK}50`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "5px" }}>
            Business Question
          </p>
          <p style={{ fontSize: "13px", color: INK, lineHeight: 1.55, fontWeight: 500 }}>
            {question}
          </p>
        </div>

        {/* Tools */}
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: `${INK}50`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "5px" }}>
            Tools &amp; Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {tools.map(t => (
              <span key={t} style={{
                fontSize: "11px", fontWeight: 700, padding: "2px 9px", borderRadius: "20px",
                background: `${TOOLS_COLORS[t] || SLATE}12`,
                color: TOOLS_COLORS[t] || SLATE,
                border: `1px solid ${TOOLS_COLORS[t] || SLATE}30`,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Methods */}
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: `${INK}50`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "5px" }}>
            Methods
          </p>
          <p style={{ fontSize: "12.5px", color: `${INK}80`, lineHeight: 1.6 }}>
            {methods}
          </p>
        </div>

        {/* Output */}
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: `${INK}50`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "5px" }}>
            Output
          </p>
          <p style={{ fontSize: "12.5px", color: `${INK}80`, lineHeight: 1.6 }}>
            {output}
          </p>
        </div>

      </div>
    </div>
  );
}

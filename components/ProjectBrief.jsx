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

const GH_BASE = "https://github.com/salomigandra/data-analytics-case-studies/tree/main";

export default function ProjectBrief({ question, tools, methods, output, slug }) {
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
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, margin: 0 }}>
          Project Brief
        </p>
        {slug && (
          <a
            href={`${GH_BASE}/${slug}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "12px", fontWeight: 700, color: "#fff",
              background: "#1C1C1C",
              border: "none",
              padding: "6px 14px", borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              transition: "background 0.15s",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>

        {/* Problem Statement */}
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, color: `${INK}50`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "5px" }}>
            Problem Statement
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

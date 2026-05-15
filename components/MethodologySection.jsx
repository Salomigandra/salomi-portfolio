"use client";
import { useState } from "react";

/*
  MethodologySection
  ──────────────────
  Props:
    slug       – "ist" | "air-quality" | "hospital-pricing" | "climate" | "inflation" | "iran-shock"
    sources    – [{ id, name, org, url, year, usedFor }]
    steps      – [{ label, formula, result, note? }]
    toolNotes  – [{ tool, color, tasks: string[] }]
    files      – [{ name, ext, label }]  // files inside /methodology/[slug]/
*/

const INK   = "#1C1C1C";
const GOLD  = "#C9A46F";
const TEAL  = "#1A7A8A";
const SLATE = "#4A6073";
const IVORY = "#FFFDF5";
const LIGHT = "#F5F5F0";

const EXT_ICON = { py: "🐍", sql: "🗄️", xlsx: "📊", md: "📄" };
const EXT_COLOR = {
  py:   { bg: "#4A607312", border: "#4A607340", text: "#4A6073" },
  sql:  { bg: "#1A7A8A12", border: "#1A7A8A40", text: "#1A7A8A" },
  xlsx: { bg: "#5A6E4F12", border: "#5A6E4F40", text: "#5A6E4F" },
  md:   { bg: "#C9A46F12", border: "#C9A46F40", text: "#C9A46F" },
};

export default function MethodologySection({ slug, sources, steps, toolNotes, files }) {
  const [tab, setTab] = useState("sources");

  const tabs = [
    { id: "sources",   label: "Data Sources"  },
    { id: "calc",      label: "How It's Calculated" },
    { id: "tools",     label: "Tool Breakdown" },
    { id: "download",  label: "Download Files" },
  ];

  return (
    <div style={{
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 1.5rem 3rem",
    }}>
      {/* Section Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        marginBottom: "1.25rem", paddingTop: "2.5rem",
        borderTop: "1px solid rgba(28,28,28,0.08)",
      }}>
        <span style={{ fontSize: "18px" }}>🔬</span>
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", color: GOLD, margin: 0 }}>
            Methodology & Proof of Work
          </p>
          <p style={{ fontSize: "13px", color: `${INK}70`, margin: "2px 0 0", lineHeight: 1.4 }}>
            Every number is sourced. Every calculation is shown. Every tool has a job.
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: "flex", gap: "4px", flexWrap: "wrap",
        background: LIGHT, borderRadius: "12px", padding: "4px",
        marginBottom: "1.25rem",
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: "1 1 auto", minWidth: "120px",
              fontSize: "12px", fontWeight: 700,
              padding: "8px 14px", borderRadius: "9px",
              border: "none", cursor: "pointer",
              transition: "all 0.15s",
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? INK : `${INK}60`,
              boxShadow: tab === t.id ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: DATA SOURCES ── */}
      {tab === "sources" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: LIGHT }}>
                {["#", "Source", "Organisation", "Year", "Used For"].map((h, i) => (
                  <th key={h} style={{
                    padding: "10px 12px", textAlign: "left",
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: `${INK}60`,
                    borderBottom: `2px solid ${GOLD}`,
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sources.map((s, i) => (
                <tr key={s.id}
                  style={{ background: i % 2 === 0 ? "#fff" : LIGHT,
                    borderBottom: "1px solid rgba(28,28,28,0.05)" }}
                >
                  <td style={{ padding: "10px 12px", color: `${INK}40`, fontWeight: 700,
                    fontSize: "11px" }}>{s.id}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: INK }}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer"
                        style={{ color: TEAL, textDecoration: "none",
                          borderBottom: `1px dotted ${TEAL}` }}>
                        {s.name}
                      </a>
                    ) : s.name}
                  </td>
                  <td style={{ padding: "10px 12px", color: `${INK}80`, fontSize: "12px" }}>{s.org}</td>
                  <td style={{ padding: "10px 12px", color: `${INK}60`, fontSize: "12px",
                    whiteSpace: "nowrap" }}>{s.year}</td>
                  <td style={{ padding: "10px 12px", color: `${INK}80`, fontSize: "12px",
                    lineHeight: 1.5 }}>{s.usedFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TAB: CALCULATIONS ── */}
      {tab === "calc" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1px solid rgba(28,28,28,0.07)",
              borderRadius: "12px",
              overflow: "hidden",
            }}>
              {/* Step header */}
              <div style={{
                background: LIGHT, padding: "10px 16px",
                display: "flex", alignItems: "center", gap: "10px",
                borderBottom: "1px solid rgba(28,28,28,0.06)",
              }}>
                <span style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: GOLD, color: "#fff",
                  fontSize: "11px", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ fontWeight: 700, fontSize: "13px", color: INK }}>{s.label}</span>
              </div>

              {/* Formula block */}
              <div style={{ padding: "14px 16px" }}>
                <pre style={{
                  margin: "0 0 10px",
                  background: "#F8F8F6",
                  border: "1px solid rgba(28,28,28,0.06)",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  fontSize: "12px",
                  lineHeight: 1.75,
                  color: "#2d4a3e",
                  fontFamily: "'Fira Mono', 'Consolas', monospace",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {s.formula}
                </pre>

                {/* Result pill */}
                {s.result && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    background: `${GOLD}15`,
                    border: `1px solid ${GOLD}40`,
                    borderRadius: "8px", padding: "6px 12px",
                    fontSize: "12px", fontWeight: 700, color: INK,
                  }}>
                    <span style={{ color: GOLD }}>→</span> {s.result}
                  </div>
                )}

                {s.note && (
                  <p style={{ fontSize: "11px", color: `${INK}55`, marginTop: "8px",
                    fontStyle: "italic", lineHeight: 1.6 }}>
                    ⚠ {s.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB: TOOL BREAKDOWN ── */}
      {tab === "tools" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
          {toolNotes.map((t, i) => (
            <div key={i} style={{
              background: "#fff",
              border: `1px solid ${t.color}25`,
              borderTop: `3px solid ${t.color}`,
              borderRadius: "12px",
              padding: "16px 18px",
            }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: t.color,
                margin: "0 0 10px" }}>
                {t.tool}
              </p>
              <ul style={{ margin: 0, paddingLeft: "16px" }}>
                {t.tasks.map((task, j) => (
                  <li key={j} style={{
                    fontSize: "12px", color: `${INK}80`,
                    lineHeight: 1.7, marginBottom: "3px",
                  }}>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB: DOWNLOAD FILES ── */}
      {tab === "download" && (
        <div>
          <p style={{ fontSize: "13px", color: `${INK}70`, marginBottom: "1rem", lineHeight: 1.6 }}>
            All source files for this case study are available below. The Python script
            reproduces every number shown. The SQL queries show the database logic.
            The Excel workbook contains the full model with formatted tables and charts.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {files.map((f, i) => {
              const ext = f.ext.toLowerCase();
              const style = EXT_COLOR[ext] || EXT_COLOR.md;
              return (
                <a
                  key={i}
                  href={`/methodology/${slug}/${f.name}`}
                  download
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "14px 16px", borderRadius: "12px",
                    background: style.bg,
                    border: `1px solid ${style.border}`,
                    textDecoration: "none",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "24px", lineHeight: 1 }}>{EXT_ICON[ext] || "📄"}</span>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: style.text,
                      margin: 0 }}>{f.name}</p>
                    <p style={{ fontSize: "11px", color: `${INK}55`, margin: "2px 0 0" }}>{f.label}</p>
                  </div>
                  <span style={{ marginLeft: "auto", fontSize: "14px", color: `${INK}30` }}>↓</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

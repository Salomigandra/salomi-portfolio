"use client";
import { useState } from "react";

const PALETTE = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  slate: "#4A6073",
  coral: "#E38B75",
  olive: "#5A6E4F",
};

const TABS = [
  {
    id: "approach",
    label: "Analysis Approach",
    emoji: "🔍",
    accent: PALETTE.slate,
    tagline: "Start with the question, not the data.",
    steps: [
      {
        n: "01",
        title: "Define the Question",
        desc: "What decision does this analysis need to support? Never open a dataset before I can answer this.",
      },
      {
        n: "02",
        title: "Collect & Clean",
        desc: "Validate sources, handle nulls, document assumptions. Garbage in, garbage out -- no shortcuts here.",
      },
      {
        n: "03",
        title: "Explore & Query",
        desc: "SQL aggregations, Python exploration, pattern spotting. Let the data show what it wants to say.",
      },
      {
        n: "04",
        title: "Visualize & Verify",
        desc: "Charts that show one clear thing, not ten vague ones. If it needs a legend to decode, it is too complex.",
      },
      {
        n: "05",
        title: "Recommend",
        desc: "A finding without a recommendation is just a number. Every analysis ends with a clear next action.",
      },
    ],
    badges: ["Define First", "Reproducible", "Documented", "Decision-Driven"],
  },
  {
    id: "toolkit",
    label: "Technical Toolkit",
    emoji: "🛠️",
    accent: PALETTE.olive,
    tagline: "Tools chosen for the task, not the resume.",
    steps: [
      {
        n: "SQL",
        title: "Querying",
        desc: "Joins, aggregations, subqueries, window functions. PostgreSQL primary, comfortable across dialects.",
      },
      {
        n: "PY",
        title: "Python / pandas",
        desc: "Data cleaning, transformation, exploration. From raw CSV to clean dataframe in minutes.",
      },
      {
        n: "XLS",
        title: "Reporting",
        desc: "Excel pivot tables, Google Sheets, automated dashboards that update themselves.",
      },
      {
        n: "VIZ",
        title: "Visualization",
        desc: "Power BI (learning), Tableau concepts, chart best practices -- clarity over cleverness always.",
      },
      {
        n: "</>",
        title: "Dev Background",
        desc: "React, Next.js, Git -- lets me build interactive data displays most analysts cannot.",
      },
    ],
    badges: ["SQL", "Python", "Excel", "Power BI", "Tableau", "Git"],
  },
  {
    id: "communication",
    label: "Insight & Communication",
    emoji: "💬",
    accent: PALETTE.coral,
    tagline: "The best analysis goes nowhere if it cannot be understood.",
    steps: [
      {
        n: "01",
        title: "Plain Language Findings",
        desc: "No jargon, just what it means and why it matters. If a non-technical stakeholder cannot follow it, it is not done.",
      },
      {
        n: "02",
        title: "Dashboards People Use",
        desc: "Built around decisions, not data dumps. One clear metric per view -- maximum signal, minimum noise.",
      },
      {
        n: "03",
        title: "Documented Methodology",
        desc: "Reproducible, auditable, trustworthy. Anyone should be able to pick up where I left off.",
      },
      {
        n: "04",
        title: "Stakeholder-Ready",
        desc: "A manager should read it in 30 seconds and know exactly what to do next.",
      },
      {
        n: "05",
        title: "Honest About Limits",
        desc: "Clear on what the data can and cannot tell us. Intellectual honesty builds more trust than overselling.",
      },
    ],
    badges: ["Clear", "Actionable", "Honest", "Reproducible", "Trustworthy"],
  },
];

export default function WorkSkillsTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="data-approach" className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        {/* Heading */}
        <h2
          className="text-center text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          style={{ color: PALETTE.charcoal }}
        >
          Data Analysis &amp; Technical Skills
        </h2>
        <p
          className="mx-auto mt-4 max-w-3xl text-center text-base md:text-lg"
          style={{ color: "#1C1C1CB3" }}
        >
          Turning raw data into clear answers -- through the right questions, honest analysis,
          and insights stakeholders can act on.
        </p>

        {/* Tab buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === i}
              aria-controls={`tabpanel-${t.id}`}
              onClick={() => setActive(i)}
              className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: active === i ? t.accent : "transparent",
                color: active === i ? "#ffffff" : t.accent,
                border: `2px solid ${t.accent}`,
                boxShadow: active === i ? `0 4px 14px ${t.accent}55` : "none",
                focusRingColor: t.accent,
              }}
            >
              <span className="mr-1.5" aria-hidden="true">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-label={tab.label}
          className="mt-10 rounded-3xl overflow-hidden"
          style={{
            border: `1.5px solid ${tab.accent}35`,
            boxShadow: `0 12px 48px ${tab.accent}20`,
          }}
        >
          {/* Accent bar */}
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${tab.accent}, ${tab.accent}66)`,
            }}
          />

          <div className="p-6 md:p-10 bg-white">

            {/* Tagline */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl" aria-hidden="true">{tab.emoji}</span>
              <p className="text-lg md:text-xl font-semibold italic" style={{ color: tab.accent }}>
                &ldquo;{tab.tagline}&rdquo;
              </p>
            </div>

            {/* Steps list */}
            <ol className="space-y-4" aria-label={`${tab.label} steps`}>
              {tab.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 items-start rounded-2xl p-4"
                  style={{ backgroundColor: `${tab.accent}0A` }}
                >
                  {/* Step badge */}
                  <div
                    className="flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center text-xs font-bold leading-none"
                    style={{ backgroundColor: tab.accent, color: "#ffffff" }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </div>

                  <div className="min-w-0">
                    <div
                      className="font-semibold text-base"
                      style={{ color: PALETTE.charcoal }}
                    >
                      {step.title}
                    </div>
                    <div
                      className="mt-0.5 text-sm leading-relaxed"
                      style={{ color: "#1C1C1CB3" }}
                    >
                      {step.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap gap-2" aria-label={`${tab.label} keywords`}>
              {tab.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${tab.accent}18`,
                    color: tab.accent,
                    border: `1px solid ${tab.accent}40`,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

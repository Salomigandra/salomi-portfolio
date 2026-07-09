// app/work/pathsy/page.js — Pathsy data & analytics case study
import Link from "next/link";

export const metadata = {
  title: "Pathsy Case Study — Salomi Gandra | Data Analyst",
  description:
    "Designing the PostgreSQL data model and weighted recommendation engine behind a career-guidance platform — then auditing and validating it with SQL and Python against production data.",
};

const C = {
  charcoal: "#1C1C1C",
  ivory: "#F5F5F0",
  gold: "#C9A46F",
  slate: "#4A6073",
  olive: "#5A6E4F",
  lime: "#86C986",
};

function SectionLabel({ n, children }) {
  return (
    <div className="flex items-baseline gap-3 mb-4 mt-14">
      <span className="text-xs font-black" style={{ color: C.gold }}>{n}</span>
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: C.charcoal }}>
        {children}
      </h2>
    </div>
  );
}

function P({ children }) {
  return (
    <p className="text-[15px] leading-relaxed mb-4" style={{ color: `${C.charcoal}B0` }}>
      {children}
    </p>
  );
}

function Code({ title, children }) {
  return (
    <figure className="my-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${C.charcoal}15` }}>
      <figcaption className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest"
        style={{ background: "#111", color: `${C.lime}` }}>
        {title}
      </figcaption>
      <pre className="p-4 overflow-x-auto text-[12.5px] leading-relaxed"
        style={{ background: "#1a1a1a", color: "#d8d8d0", margin: 0 }}>
        <code>{children}</code>
      </pre>
    </figure>
  );
}

function Finding({ children }) {
  return (
    <div className="my-5 rounded-xl p-4 text-[14px] leading-relaxed"
      style={{ background: `${C.olive}10`, border: `1px solid ${C.olive}35`, color: `${C.charcoal}C0` }}>
      <span className="font-black text-[11px] uppercase tracking-widest block mb-1" style={{ color: C.olive }}>
        Finding
      </span>
      {children}
    </div>
  );
}

const VALIDATION_ROWS = [
  ["Engineering aspirant", "MPC / Engineering", "1", "1"],
  ["Medical aspirant", "BiPC / Medical", "1", "1"],
  ["Commerce aspirant", "Commerce", "1", "1"],
  ["Humanities aspirant", "Arts / Humanities", "1", "1"],
  ["Law / professional", "Integrated law", "1", "1"],
  ["Pharmacy aspirant", "Pharmacy", "2", "2"],
  ["Hands-on trade seeker", "ITI trades", "2", "1 *"],
  ["Diploma-first student", "Polytechnic", "2", "2"],
  ["Defence aspirant", "Defence prep", "4 ❌", "1 ✅"],
];

const METRICS = [
  ["Quiz completion rate", "starts → 9/9 answered; per-question drop-off finds weak questions"],
  ["Save rate", "saves ÷ path views — the product's real conversion of interest into intent"],
  ["Zero-result search rate", "share of searches returning nothing; its top terms are the content roadmap"],
  ["Demand concentration", "share of views in top-3 streams — quantifies the engineering/medicine bias"],
  ["Recommendation diversity", "distinct top-1 results ÷ paths — quiz calibration health"],
];

export default function PathsyCaseStudy() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: C.ivory, color: C.charcoal }}>
      <article className="mx-auto max-w-3xl px-6 pt-14 pb-24">

        <Link href="/work" className="text-xs font-bold hover:underline" style={{ color: C.slate }}>
          ← Back to work
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {["Case Study", "PostgreSQL · SQL", "Python", "Product Analytics"].map((t) => (
              <span key={t} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: `${C.olive}15`, color: C.olive, border: `1px solid ${C.olive}30` }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Pathsy: the data model and analytics behind a career-guidance platform
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: `${C.charcoal}80` }}>
            Solo project — schema design → data curation → weighted recommendation engine →
            SQL audits and Python validation against the production database. All numbers on
            this page come from live queries, and every artifact is public.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://pathsy.org" target="_blank" rel="noopener noreferrer"
              className="rounded-lg px-4 py-2 text-sm font-bold" style={{ background: C.olive, color: "#fff" }}>
              Live product →
            </a>
            <a href="https://github.com/Salomigandra/edstudy/tree/main/analytics"
              target="_blank" rel="noopener noreferrer"
              className="rounded-lg px-4 py-2 text-sm font-bold border"
              style={{ borderColor: `${C.olive}50`, color: C.olive }}>
              SQL + Python on GitHub →
            </a>
          </div>
        </header>

        {/* At a glance */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["12", "tables in schema"],
            ["78", "active courses"],
            ["833", "career roles"],
            ["9/9", "archetypes in top 3"],
          ].map(([num, label]) => (
            <div key={label} className="rounded-xl p-4 text-center"
              style={{ background: "#fff", border: `1px solid ${C.charcoal}10` }}>
              <div className="text-2xl font-black" style={{ color: C.olive }}>{num}</div>
              <div className="text-[11px] mt-1 uppercase tracking-wide" style={{ color: `${C.charcoal}55` }}>{label}</div>
            </div>
          ))}
        </div>

        <SectionLabel n="01">Problem</SectionLabel>
        <P>
          Every year, millions of Indian students finish Class 10 and 12 with no structured way
          to compare what comes next. Guidance is fragmented across coaching-institute marketing
          (biased), word of mouth (narrow), and scattered blogs (unverified) — so demand
          hyper-concentrates into engineering and medicine while vocational and emerging paths
          stay invisible.
        </P>
        <P>
          Pathsy structures the decision as data: every major path as comparable, queryable
          records — courses, entrance exams, specializations, career roles, salary progressions —
          plus a quiz that maps student preferences to streams. My question as the analyst:
          <strong> can a transparent, rules-based model (no black-box AI) give students a genuinely
          useful ranked recommendation?</strong>
        </P>

        <SectionLabel n="02">The dataset</SectionLabel>
        <P>
          <strong>Curated reference data (supply side):</strong> 78 active courses, 288
          specializations, and 833 career roles across 4 education stages and 30 streams,
          hand-researched from state board syllabi (BIEAP, TSBIE, CBSE) and exam-authority
          sources, normalized into a 12-table PostgreSQL schema — courses → specializations →
          career roles, entrance exams linked through a many-to-many junction table, and a
          4-band salary progression (Fresher → Junior → Mid → Senior) per course.
        </P>
        <P>
          <strong>Behavioral data (demand side):</strong> product events — quiz starts and
          completions, searches (including zero-result ones), path views, saves. The append-only
          events table is designed and the funnel/search-gap SQL is written; instrumentation is
          the current sprint (see 07).
        </P>

        <SectionLabel n="03">Cleaning & assumptions</SectionLabel>
        <ul className="space-y-2.5 mb-4">
          {[
            ["Naming normalization", "AP/Telangana stream names (MPC, BiPC) unified with CBSE equivalents (PCM, PCB) — both always displayed; a synonym map handles search (“doctor” → MBBS)."],
            ["Salary standardization", "all sources converted to a common 4-band LPA progression; conflicting sources resolved to conservative midpoints and flagged with an on-page disclaimer."],
            ["Soft deletes", "courses carry an is_active flag instead of being deleted, so saved-path references never break."],
            ["Stated assumptions", "salary bands are indicative national medians, not offers; quiz weights are hand-assigned per path and validated by simulation (see 05)."],
          ].map(([k, v]) => (
            <li key={k} className="text-[15px] leading-relaxed flex gap-2" style={{ color: `${C.charcoal}B0` }}>
              <span aria-hidden="true" className="flex-shrink-0 mt-[9px] h-1 w-1 rounded-full" style={{ background: C.gold }} />
              <span><strong>{k}:</strong> {v}</span>
            </li>
          ))}
        </ul>

        <SectionLabel n="04">SQL audit of my own data</SectionLabel>
        <P>
          A guidance product is only as trustworthy as its least-complete record, so the first
          analysis was an audit of the dataset I curated — run against production:
        </P>
        <Code title="sql/02_data_completeness.sql (excerpt)">{`SELECT c.slug, c.name,
       COUNT(DISTINCT sr.id)      AS salary_bands,   -- expected: 4
       COUNT(DISTINCT ce.exam_id) AS linked_exams
FROM courses c
LEFT JOIN salary_ranges sr         ON sr.course_id = c.id
LEFT JOIN course_entrance_exams ce ON ce.course_id = c.id
WHERE c.is_active
GROUP BY c.id, c.slug, c.name
HAVING COUNT(DISTINCT sr.id) < 4
    OR COUNT(DISTINCT ce.exam_id) = 0;`}</Code>
        <Finding>
          The audit found 22 of 78 active courses missing the full 4-band salary progression, and
          74 of 78 with <em>zero</em> rows in the exam junction table — exam data was living in a
          free-text column, which blocks exam-based filtering. I backfilled the junction: 46 exams
          added, ~100 course–exam links with mandatory flags. The backfill also corrected the
          metric itself: 23 of those &quot;missing&quot; courses are ITI trades and skill
          certifications with <em>no entrance exam at all</em> — a completeness metric needs a
          &quot;not applicable&quot; category before you treat every zero as missing data.
          Auditing your own curation is humbling; it is also the job.
        </Finding>

        <SectionLabel n="05">Validating the recommendation engine (Python)</SectionLabel>
        <P>
          The quiz scores 9 answers against per-path JSONB weights. To test calibration, I
          defined 9 student archetypes — the answers a stereotypical aspirant of each path would
          pick, chosen from option text alone — and ran them through the live scoring matrix:
        </P>
        <div className="my-5 overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.charcoal}12` }}>
          <table className="w-full text-[13px]" style={{ background: "#fff" }}>
            <thead>
              <tr style={{ background: `${C.olive}0D` }}>
                {["Archetype", "Expected path", "Rank before fix", "Rank after fix"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-bold text-[11px] uppercase tracking-wider"
                    style={{ color: `${C.charcoal}70` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VALIDATION_ROWS.map(([a, t, before, after]) => (
                <tr key={a} style={{ borderTop: `1px solid ${C.charcoal}08` }}>
                  <td className="px-4 py-2" style={{ color: `${C.charcoal}B0` }}>{a}</td>
                  <td className="px-4 py-2" style={{ color: `${C.charcoal}B0` }}>{t}</td>
                  <td className="px-4 py-2 font-bold" style={{ color: before.startsWith("1") ? C.olive : before.startsWith("4") ? "#C0392B" : C.gold }}>{before}</td>
                  <td className="px-4 py-2 font-bold" style={{ color: after.startsWith("1") ? C.olive : C.gold }}>{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Finding>
          The first run exposed a real flaw: a Defence aspirant could never see Defence ranked
          first — its maximum achievable score was 6, vs. 24 for the engineering track, because
          only 2 of 32 quiz options carried any defence weight. My first rebalance fixed the ranks
          but overcorrected: ITI could suddenly outrank engineering for any tinkering-minded
          student, which is unrealistic in India, and Defence collected points from options
          unrelated to service. The final design is <strong>commitment-gated</strong>: a ninth
          question asks what the student has <em>actually done</em> (trained for NDA, visited an
          ITI centre, researched entrance exams), and high-stakes paths only rank first when that
          action signal is present. Result: 7/9 rank #1, 9/9 in top 3.
          <span className="block mt-2 text-[13px]" style={{ color: `${C.charcoal}70` }}>
            * ITI ranks first only for a student who has actually visited a training centre and
            wants a 1–2-year route to income; a tinkering-profile student still gets engineering
            first. Calibration is a product decision, not just a math one.
          </span>
        </Finding>

        <SectionLabel n="06">Key metrics</SectionLabel>
        <div className="my-5 overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.charcoal}12` }}>
          <table className="w-full text-[13px]" style={{ background: "#fff" }}>
            <tbody>
              {METRICS.map(([m, why]) => (
                <tr key={m} style={{ borderTop: `1px solid ${C.charcoal}08` }}>
                  <td className="px-4 py-2.5 font-bold whitespace-nowrap align-top" style={{ color: C.charcoal }}>{m}</td>
                  <td className="px-4 py-2.5" style={{ color: `${C.charcoal}90` }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionLabel n="07">Dashboard & instrumentation plan</SectionLabel>
        <P>
          Behavioral events flow into a single append-only <code>app_events</code> table
          (anonymous session id, event name, JSONB payload — insert-only RLS for clients). The
          funnel and zero-result-search SQL is already written against it. The Power BI report
          has three pages:
        </P>
        <ul className="space-y-2.5 mb-4">
          {[
            ["Engagement overview", "WAU, views by stage, top paths, save-rate trend"],
            ["Quiz funnel", "start → per-question → completion, top-1 result distribution"],
            ["Content gaps", "zero-result search terms, demand vs. supply per stream, saves-to-views ranking"],
          ].map(([k, v]) => (
            <li key={k} className="text-[15px] leading-relaxed flex gap-2" style={{ color: `${C.charcoal}B0` }}>
              <span aria-hidden="true" className="flex-shrink-0 mt-[9px] h-1 w-1 rounded-full" style={{ background: C.gold }} />
              <span><strong>{k}:</strong> {v}</span>
            </li>
          ))}
        </ul>

        <SectionLabel n="08">What this project demonstrates</SectionLabel>
        <P>
          Relational modeling from a blank page (12 tables, junction tables, RLS, full-text
          search), disciplined data curation with documented assumptions, a transparent scoring
          model whose flaws I went looking for and found, and SQL/Python used the way analysts
          actually use them — to audit, validate, and decide what to fix next. The honest status:
          reference data and validation are live; behavioral instrumentation ships next, and this
          page will grow real funnel numbers when it does.
        </P>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="https://github.com/Salomigandra/edstudy/tree/main/analytics"
            target="_blank" rel="noopener noreferrer"
            className="rounded-lg px-4 py-2 text-sm font-bold" style={{ background: C.olive, color: "#fff" }}>
            Explore the SQL & Python →
          </a>
          <Link href="/work" className="rounded-lg px-4 py-2 text-sm font-bold border"
            style={{ borderColor: `${C.charcoal}25`, color: C.charcoal }}>
            More work
          </Link>
        </div>
      </article>
    </main>
  );
}

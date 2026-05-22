"use client";
import { useState } from "react";

export default function PublishPage() {
  const [form, setForm] = useState({
    name: "", email: "", institution: "", discipline: "", title: "", description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not send. Please email info@writespan.com directly.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setError("Could not send. Please email info@writespan.com directly.");
      setSubmitting(false);
    }
  };

  return (
    <main className="ws-main">
      {/* Responsive overrides — one place, all media queries */}
      <style>{`
        .ws-main {
          min-height: 100vh;
          background: #0a1628;
          color: #ffffff;
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .ws-main * { box-sizing: border-box; }

        .ws-container {
          max-width: 960px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }
        .ws-section { padding-top: 80px; padding-bottom: 80px; }
        .ws-section.alt { background: #0f1e36; }

        .ws-head { background: #0a1628; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .ws-head-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ws-logo { color: #fff; text-decoration: none; }
        .ws-logo-pre { font-family: Georgia, serif; font-size: 19px; color: rgba(255,255,255,0.55); }
        .ws-logo-main { font-family: Georgia, serif; font-size: 19px; color: #fff; font-weight: 700; }
        .ws-head-mail { color: #bfdbfe; font-size: 14px; text-decoration: none; }

        .ws-eyebrow {
          color: #7dd3fc; font-size: 13px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          margin: 0 0 20px;
        }
        .ws-h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 48px; font-weight: 700; line-height: 1.12;
          margin: 0 0 24px; letter-spacing: -0.02em; max-width: 760px;
        }
        .ws-h2 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 32px; font-weight: 700;
          margin: 0 0 32px; letter-spacing: -0.01em;
        }
        .ws-h2.accent { color: #7dd3fc; font-size: 26px; margin-bottom: 22px; }
        .ws-h3 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 19px; font-weight: 700; margin: 0 0 8px;
        }
        .ws-h3.accent { color: #7dd3fc; }

        .ws-lead { font-size: 18px; line-height: 1.65; color: #cbd5e1; max-width: 680px; margin: 0 0 18px; }
        .ws-lead.dim { font-size: 16px; color: #94a3b8; font-style: italic; margin-bottom: 36px; }
        .ws-body { font-size: 15px; line-height: 1.65; color: #cbd5e1; margin: 0; }

        .ws-btn-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .ws-btn {
          display: inline-block; padding: 14px 30px; border-radius: 8px;
          font-size: 15px; font-weight: 700; text-decoration: none;
          border: 1px solid transparent; cursor: pointer; font-family: inherit;
        }
        .ws-btn.primary { background: #7dd3fc; color: #0a1628; }
        .ws-btn.ghost   { background: transparent; color: #fff; border-color: rgba(255,255,255,0.3); font-weight: 600; }
        .ws-btn.primary:hover { background: #38bdf8; }
        .ws-btn.ghost:hover   { background: rgba(255,255,255,0.06); }
        .ws-btn:disabled { background: #475569 !important; color: #cbd5e1; cursor: wait; }

        .ws-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .ws-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
        .ws-card {
          background: #0a1628; padding: 28px 26px; border-radius: 10px;
          border: 1px solid rgba(125,211,252,0.25);
        }

        .ws-steps { list-style: none; padding: 0; margin: 0; }
        .ws-step {
          display: flex; gap: 22px; padding-bottom: 26px; margin-bottom: 26px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ws-step:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
        .ws-step-num {
          flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%;
          background: #7dd3fc; color: #0a1628;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 800;
        }
        .ws-step-body { flex: 1; padding-top: 4px; }

        .ws-list { list-style: none; padding: 0; margin: 0; }
        .ws-list li {
          display: flex; gap: 14px; margin-bottom: 14px;
          font-size: 15px; color: #cbd5e1; line-height: 1.55;
        }
        .ws-check { color: #7dd3fc; font-weight: 700; font-size: 17px; flex-shrink: 0; }

        .ws-form { max-width: 680px; margin: 0 auto; }
        .ws-field { margin-bottom: 18px; }
        .ws-label { display: block; font-size: 13px; font-weight: 600; color: #bfdbfe; margin-bottom: 7px; }
        .ws-req   { color: #7dd3fc; }
        .ws-input, .ws-textarea {
          width: 100%; padding: 12px 14px;
          background: #0f1e36; color: #fff;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 8px; font-size: 16px;
          font-family: inherit; outline: none;
          -webkit-appearance: none; appearance: none;
        }
        .ws-textarea { resize: vertical; line-height: 1.6; min-height: 100px; }
        .ws-input:focus, .ws-textarea:focus { border-color: #7dd3fc; }

        .ws-error {
          background: rgba(220,38,38,0.15); border: 1px solid rgba(220,38,38,0.4);
          color: #fecaca; padding: 12px 16px; border-radius: 8px;
          font-size: 14px; margin-bottom: 18px;
        }

        .ws-footnote { font-size: 12.5px; color: #64748b; margin: 14px 0 0; }

        .ws-success {
          background: #0f1e36; padding: 40px 32px; border-radius: 12px;
          border: 1px solid rgba(125,211,252,0.25); text-align: center;
        }

        .ws-footer {
          padding: 28px 0; background: #070f1f;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .ws-footer-row {
          display: flex; flex-wrap: wrap; gap: 18px;
          justify-content: space-between; align-items: center;
        }
        .ws-footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
        .ws-footer a { color: #94a3b8; text-decoration: none; font-size: 13px; }
        .ws-footer p { color: #94a3b8; font-size: 13px; margin: 0; }

        /* ─── Tablet ─── */
        @media (max-width: 900px) {
          .ws-grid-3 { grid-template-columns: 1fr 1fr; }
          .ws-h1 { font-size: 40px; }
          .ws-h2 { font-size: 28px; }
        }

        /* ─── Phone ─── */
        @media (max-width: 640px) {
          .ws-container { padding-left: 20px; padding-right: 20px; }
          .ws-section { padding-top: 56px; padding-bottom: 56px; }

          .ws-h1 { font-size: 30px; line-height: 1.18; margin-bottom: 18px; }
          .ws-h2 { font-size: 24px; margin-bottom: 22px; }
          .ws-h2.accent { font-size: 22px; }
          .ws-h3 { font-size: 17px; }

          .ws-lead { font-size: 16px; }
          .ws-lead.dim { font-size: 15px; margin-bottom: 28px; }

          .ws-grid-3, .ws-grid-2 { grid-template-columns: 1fr; gap: 16px; }
          .ws-card { padding: 22px 20px; }

          .ws-step { gap: 16px; }
          .ws-step-num { width: 38px; height: 38px; font-size: 16px; }

          .ws-btn { padding: 13px 22px; font-size: 14.5px; }
          .ws-btn-row { gap: 10px; }

          .ws-success { padding: 32px 22px; }
          .ws-footer-row { gap: 14px; }
          .ws-footer-links { gap: 14px; }
        }
      `}</style>

      {/* HEADER */}
      <header className="ws-head">
        <div className="ws-container ws-head-row">
          <a href="/" className="ws-logo">
            <span className="ws-logo-pre">WriteSpan</span>{" "}
            <span className="ws-logo-main">Press</span>
          </a>
          <a href="mailto:info@writespan.com" className="ws-head-mail">
            info@writespan.com
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="ws-section">
        <div className="ws-container">
          <p className="ws-eyebrow">For Faculty Authors</p>
          <h1 className="ws-h1">
            Write the textbook your students need. Keep the rights. Get paid.
          </h1>
          <p className="ws-lead">
            WriteSpan Press partners with faculty to publish their teaching materials
            as coursewire — digital-first textbooks that live on the web, update in
            real time, and reach students at the point of need.
          </p>
          <p className="ws-lead dim">
            We are in conversations with faculty across many disciplines. If publishing
            a textbook interests you, we want to hear from you.
          </p>
          <div className="ws-btn-row">
            <a href="#interest" className="ws-btn primary">Get in touch</a>
            <a href="mailto:info@writespan.com" className="ws-btn ghost">Email us directly</a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="ws-section alt">
        <div className="ws-container">
          <h2 className="ws-h2">Why publish with WriteSpan</h2>
          <div className="ws-grid-3">
            {[
              { title: "Affordable for students", body: "Coursewire pricing is a fraction of traditional textbooks. Students access what they need, on the device they have, at a price they can pay." },
              { title: "Current and pedagogical", body: "Update a chapter the week a new study comes out. No waiting years for a new edition. Your textbook stays as current as your teaching." },
              { title: "You own it", body: "You keep copyright. You set the price. You earn royalties on every adoption. No surrender of intellectual property." },
            ].map((c, i) => (
              <div key={i} className="ws-card">
                <h3 className="ws-h3 accent">{c.title}</h3>
                <p className="ws-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ws-section">
        <div className="ws-container">
          <h2 className="ws-h2">How it works</h2>
          <ol className="ws-steps">
            {[
              { title: "You write the textbook", body: "Bring your manuscript, course materials, or a clear outline. We work from what you already have." },
              { title: "WriteSpan handles production", body: "Design, layout, accessibility compliance, ISBN, and copyright registration. You stay focused on the content." },
              { title: "We publish on the WriteSpan Press imprint", body: "Coursewire — digital-first, web and mobile. Print editions available on request." },
              { title: "You earn royalties on every adoption", body: "Meaningful per-copy royalties. Transparent reporting. You can update editions whenever you want." },
            ].map((step, i) => (
              <li key={i} className="ws-step">
                <div className="ws-step-num">{i + 1}</div>
                <div className="ws-step-body">
                  <h3 className="ws-h3">{step.title}</h3>
                  <p className="ws-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT YOU KEEP / WHAT WE PROVIDE */}
      <section className="ws-section alt">
        <div className="ws-container">
          <div className="ws-grid-2">
            <div>
              <h2 className="ws-h2 accent">What you keep</h2>
              <ul className="ws-list">
                {[
                  "Copyright stays with you",
                  "You set the retail price",
                  "Meaningful per-copy royalties",
                  "Update editions whenever you want",
                ].map((item, i) => (
                  <li key={i}><span className="ws-check">✓</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="ws-h2 accent">What WriteSpan provides</h2>
              <ul className="ws-list">
                {[
                  "Coursewire design and production",
                  "ISBN and copyright registration",
                  "Web and mobile distribution",
                  "Marketing to adopting faculty",
                  "Royalty reporting and payments",
                  "Print editions on request",
                ].map((item, i) => (
                  <li key={i}><span className="ws-check">✓</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="interest" className="ws-section">
        <div className="ws-container">
          <div className="ws-form">
            {!submitted ? (
              <>
                <h2 className="ws-h2">Express your interest</h2>
                <p className="ws-lead" style={{ fontSize: 15.5, color: "#94a3b8", marginBottom: 32 }}>
                  Tell us about your textbook idea, or email{" "}
                  <a href="mailto:info@writespan.com" style={{ color: "#7dd3fc", textDecoration: "underline" }}>
                    info@writespan.com
                  </a>{" "}
                  directly.
                </p>

                <form onSubmit={handleSubmit}>
                  {[
                    { key: "name", label: "Your name", type: "text", required: true },
                    { key: "email", label: "Email", type: "email", required: true },
                    { key: "institution", label: "Institution and rank", type: "text", required: true, placeholder: "e.g., Delaware State University, Associate Professor" },
                    { key: "discipline", label: "Discipline", type: "text", required: true, placeholder: "e.g., English, Biology, Sociology" },
                    { key: "title", label: "Working title or topic (optional)", type: "text", required: false },
                  ].map(field => (
                    <div key={field.key} className="ws-field">
                      <label className="ws-label">
                        {field.label}{field.required && <span className="ws-req"> *</span>}
                      </label>
                      <input
                        className="ws-input"
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder ?? ""}
                        value={(form as any)[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      />
                    </div>
                  ))}

                  <div className="ws-field">
                    <label className="ws-label">Brief description (optional)</label>
                    <textarea
                      className="ws-textarea"
                      rows={4}
                      placeholder="What you have in mind — the course, your materials, your vision."
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    />
                  </div>

                  {error && <div className="ws-error">{error}</div>}

                  <button type="submit" disabled={submitting} className="ws-btn primary">
                    {submitting ? "Sending..." : "Send interest"}
                  </button>
                  <p className="ws-footnote">
                    We will reach out within a few days. You will also receive a confirmation email.
                  </p>
                </form>
              </>
            ) : (
              <div className="ws-success">
                <h2 className="ws-h2 accent" style={{ marginBottom: 14 }}>Thank you.</h2>
                <p className="ws-body" style={{ marginBottom: 10 }}>
                  We received your inquiry. A confirmation email is on its way to{" "}
                  <strong style={{ color: "#fff" }}>{form.email}</strong>.
                </p>
                <p className="ws-body" style={{ color: "#94a3b8" }}>
                  We will reach out within a few days to talk through your textbook idea.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ws-footer">
        <div className="ws-container ws-footer-row">
          <p>© 2026 WriteSpan LLC · WriteSpan Press is an imprint of WriteSpan LLC.</p>
          <div className="ws-footer-links">
            <a href="/">Catalog</a>
            <a href="mailto:info@writespan.com">Contact</a>
            <a href="https://assess.writespan.com">Assessment</a>
            <a href="https://nurseprep.writespan.com">NursePrep</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
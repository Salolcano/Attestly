"use client";
import Link from "next/link";

import { Chip, Marquee, Notice, SectionHead } from "@/components/ui";
import { configured } from "@/lib/config";
import { reads } from "@/lib/genlayer/contract";
import { formatGen, formatTime } from "@/lib/genlayer/format";
import { useLoad } from "@/lib/hooks";

const STEPS = [
  ["Define", "Write the requirements that must be true, the evidence policy and an optional payout in GEN. Then freeze it. After that nothing can change, for anyone."],
  ["Evidence", "Anyone registers web sources against the requirements they support. The addresses are recorded on chain before anyone reads them."],
  ["Verify", "Every validator fetches every source itself and answers each requirement independently. A round only counts if they agree. The contract derives the result and pays by basis points."],
];

export default function Home() {
  const info = useLoad(() => (configured ? reads.info() : Promise.resolve(null)), []);
  const activity = useLoad(() => (configured ? reads.activity(0, 6) : Promise.resolve(null)), []);

  return (
    <>
      <section className="wrap" style={{ position: "relative", padding: "72px 24px 56px", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, zIndex: -1 }} />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(0,.75fr)", gap: 32, alignItems: "center" }} className="hero">
          <div>
            <div className="label" style={{ marginBottom: 22 }}>Verifiable compliance protocols / GenLayer Studio Next</div>
            <h1 className="display" style={{ fontSize: "clamp(48px, 9.5vw, 132px)", margin: 0 }}>
              Define once.<br /><span className="accent">Prove</span> anywhere.
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.6, maxWidth: 560, margin: "28px 0 36px" }}>
              Attestly turns a promise into a public record. Write what must be true, register the evidence, and let
              independent GenLayer validators decide whether the evidence satisfies it. No auditor. No approval loop.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/protocols/new" className="btn">Create protocol</Link>
              <Link href="/registry" className="btn ghost">See the registry</Link>
            </div>
          </div>
          <div style={{ position: "relative", maxWidth: 440, justifySelf: "center", width: "100%" }}>
            <div className="halftone" />
            <div className="halftone-ring" />
          </div>
        </div>
        <style>{`@media (max-width: 860px){ .hero{ grid-template-columns: 1fr !important } .hero > div:last-child{ max-width: 260px } }`}</style>
      </section>

      <Marquee items={["Define what must be true", "Freeze it", "Register evidence", "Validators verify", "Public registry", "Zero babysitting"]} />

      <section className="wrap" style={{ paddingTop: 96 }}>
        {!configured && (
          <div style={{ marginBottom: 48 }}>
            <Notice>
              No contract is configured yet. Deploy <span className="mono">contracts/attestly.py</span> on Studio Next and set{" "}
              <span className="mono">NEXT_PUBLIC_ATTESTLY_ADDRESS</span> in Vercel. See DEPLOYMENT.md.
            </Notice>
          </div>
        )}
        <SectionHead n="01 / How it works" title="Three moves." accent="One verdict." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
          {STEPS.map(([name, text], i) => (
            <div key={name} style={{ background: "var(--bg)", padding: 32 }}>
              <div className="num">0{i + 1}</div>
              <h3 className="display" style={{ fontSize: 34, margin: "14px 0 12px" }}>{name}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 120 }}>
        <SectionHead n="02 / Who owns what" title="The model reads." accent="The contract decides." />
        <div className="card" style={{ overflowX: "auto" }}>
          {[
            ["The contract", "Permissions, custody, the 5-minute pause before a result counts, the independent-publisher floor, the overall result, every payment, the registry."],
            ["GenLayer consensus", "Whether each requirement is met: a question several machines answer apart from each other and must answer alike."],
            ["The model", "One document, one requirement, one answer, with words it can point at on the page. A quote that is not on the page is thrown away."],
          ].map(([who, owns], i) => (
            <div key={who} className="row" style={{ gridTemplateColumns: "200px 1fr", padding: "22px 28px", borderTop: i ? undefined : 0 }}>
              <span className="display" style={{ fontSize: 22 }}>{who}</span>
              <span style={{ color: "var(--muted)", lineHeight: 1.6 }}>{owns}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 120 }}>
        <SectionHead n="03 / Live on chain" title="The record" accent="so far." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "var(--line)", border: "1px solid var(--line)", marginBottom: 40 }}>
          {[
            ["Protocols", info.data ? String(info.data.protocol_count) : "-"],
            ["In registry", info.data ? String(info.data.registry_count) : "-"],
            ["GEN in custody", info.data ? formatGen(info.data.custody) : "-"],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "var(--bg)", padding: 28 }}>
              <div className="label">{k}</div>
              <div className="display" style={{ fontSize: 40, marginTop: 10 }}>{v}</div>
            </div>
          ))}
        </div>
        {activity.data && activity.data.items.length > 0 && (
          <div>
            <div className="label" style={{ marginBottom: 8 }}>Recent activity</div>
            {activity.data.items.map((a, i) => (
              <Link key={i} href={`/protocols/${a.protocol_id}`} className="row" style={{ gridTemplateColumns: "56px 1fr auto", padding: "12px 0" }}>
                <span className="num">{a.protocol_id}</span>
                <span style={{ color: "var(--muted)" }}>{a.note}</span>
                <span className="num">{formatTime(a.at)}</span>
              </Link>
            ))}
          </div>
        )}
        {activity.error && <Notice tone="bad">{activity.error}</Notice>}
      </section>

      <section className="wrap" style={{ paddingTop: 120, textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: "clamp(40px, 8vw, 104px)", margin: "0 0 28px" }}>
          Write it. Freeze it. <span className="accent">Verify</span> it.
        </h2>
        <Link href="/protocols/new" className="btn">Create protocol</Link>
        <div style={{ marginTop: 18 }}><Chip value="VERIFIED" label="every result is public" /></div>
      </section>
    </>
  );
}

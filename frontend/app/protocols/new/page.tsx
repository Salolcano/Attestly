"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Notice, SectionHead } from "@/components/ui";
import { TxButton } from "@/components/tx-button";
import { useWallet } from "@/components/wallet-provider";
import { calls, reads, type Call, type Definition } from "@/lib/genlayer/contract";

type Req = { text: string; rule: string; mandatory: boolean };
const blank = (): Req => ({ text: "", rule: "", mandatory: true });

export default function NewProtocol() {
  const router = useRouter();
  const { address } = useWallet();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [responsible, setResponsible] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reqs, setReqs] = useState<Req[]>([{ text: "", rule: "", mandatory: true }]);
  const [minSources, setMinSources] = useState(1);
  const [minPublishers, setMinPublishers] = useState(1);
  const [payee, setPayee] = useState("");
  const [partialPct, setPartialPct] = useState(0);
  const [problem, setProblem] = useState("");

  const patch = (i: number, p: Partial<Req>) => setReqs(reqs.map((r, j) => (j === i ? { ...r, ...p } : r)));

  const build = (): Call | null => {
    const addr = /^0x[0-9a-fA-F]{40}$/;
    const fail = (m: string) => { setProblem(m); return null; };
    if (!title.trim() || !subject.trim()) return fail("Give the protocol a title and a subject.");
    if (!reqs.every((r) => r.text.trim())) return fail("Every requirement needs text.");
    if (!reqs.some((r) => r.mandatory)) return fail("At least one requirement must be mandatory.");
    const ts = Math.floor(new Date(deadline).getTime() / 1000);
    if (!deadline || !Number.isFinite(ts) || ts <= Date.now() / 1000 + 120) return fail("Pick a deadline in the future.");
    if (responsible.trim() && !addr.test(responsible.trim())) return fail("The responsible party is not a valid address.");
    if (payee.trim() && !addr.test(payee.trim())) return fail("The payee is not a valid address.");
    if (minPublishers > minSources) return fail("Independent publishers cannot exceed required sources.");
    setProblem("");
    const definition: Definition = {
      requirements: reqs.map((r, i) => ({ id: `R${i + 1}`, text: r.text.trim(), rule: r.rule.trim(), mandatory: r.mandatory })),
      evidence_policy: { min_sources: minSources, min_publishers: minPublishers },
      payout: { payee: payee.trim(), partial_bps: Math.round(partialPct * 100) },
    };
    return calls.create(title.trim(), subject.trim(), responsible.trim(), ts, definition);
  };

  const onDone = async () => {
    const page = await reads.protocols(0, 10);
    const mine = page.items.find((p) => p.creator.toLowerCase() === (address ?? "").toLowerCase());
    router.push(mine ? `/protocols/${mine.id}` : "/protocols");
  };

  return (
    <div className="wrap" style={{ paddingTop: 72, maxWidth: 860 }}>
      <SectionHead n="New protocol" title="Write what must" accent="be true." />
      <div style={{ display: "grid", gap: 20 }}>
        <label><div className="label">Title</div><input className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Widget 2.0 release compliance" maxLength={120} /></label>
        <label><div className="label">Subject</div><input className="field" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="widgetworks/widget v2.0" maxLength={400} /></label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <label><div className="label">Responsible party (optional, defaults to you)</div><input className="field mono" value={responsible} onChange={(e) => setResponsible(e.target.value)} placeholder="0x..." /></label>
          <label><div className="label">Evidence deadline</div><input className="field" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label>
        </div>

        <div className="label" style={{ marginTop: 16 }}>Requirements (1 to 6)</div>
        {reqs.map((r, i) => (
          <div key={i} className="card card-pad" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="num">R{i + 1}</span>
              <label className="label" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" checked={r.mandatory} onChange={(e) => patch(i, { mandatory: e.target.checked })} /> mandatory
              </label>
            </div>
            <input className="field" placeholder="The release states an open-source licence" value={r.text} onChange={(e) => patch(i, { text: e.target.value })} maxLength={400} />
            <input className="field" placeholder="How to decide it (optional)" value={r.rule} onChange={(e) => patch(i, { rule: e.target.value })} maxLength={400} />
            {reqs.length > 1 && <button className="btn ghost sm" style={{ justifySelf: "start" }} onClick={() => setReqs(reqs.filter((_, j) => j !== i))}>Remove</button>}
          </div>
        ))}
        {reqs.length < 6 && <button className="btn ghost sm" style={{ justifySelf: "start" }} onClick={() => setReqs([...reqs, blank()])}>Add requirement</button>}

        <div className="label" style={{ marginTop: 16 }}>Evidence policy</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          <label><div className="label">Sources per mandatory requirement</div>
            <select className="field" value={minSources} onChange={(e) => setMinSources(Number(e.target.value))}>{[1, 2, 3].map((n) => <option key={n}>{n}</option>)}</select></label>
          <label><div className="label">Independent publishers needed</div>
            <select className="field" value={minPublishers} onChange={(e) => setMinPublishers(Number(e.target.value))}>{[1, 2, 3].map((n) => <option key={n}>{n}</option>)}</select></label>
        </div>

        <div className="label" style={{ marginTop: 16 }}>Payout (optional; you fund it after creating)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <label><div className="label">Payee on VERIFIED</div><input className="field mono" value={payee} onChange={(e) => setPayee(e.target.value)} placeholder="0x..." /></label>
          <label><div className="label">Share paid on PARTIALLY_VERIFIED (%)</div><input className="field" type="number" min={0} max={100} value={partialPct} onChange={(e) => setPartialPct(Number(e.target.value))} /></label>
        </div>

        {problem && <Notice tone="bad">{problem}</Notice>}
        <div><TxButton call={build} onDone={onDone}>Create draft</TxButton></div>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Creating a draft changes nothing yet. You fund it, then freeze it, on the next page.</p>
      </div>
    </div>
  );
}

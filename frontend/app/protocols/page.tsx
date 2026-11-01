"use client";
import Link from "next/link";

import { Notice, ProtocolRow, SectionHead } from "@/components/ui";
import { configured } from "@/lib/config";
import { reads } from "@/lib/genlayer/contract";
import { useLoad } from "@/lib/hooks";

export default function Protocols() {
  const { data, error, loading } = useLoad(() => (configured ? reads.protocols(0, 30) : Promise.resolve(null)), []);
  return (
    <div className="wrap" style={{ paddingTop: 72 }}>
      <SectionHead n="All protocols" title="What must be" accent="true." />
      <div style={{ marginBottom: 28 }}><Link href="/protocols/new" className="btn">Create protocol</Link></div>
      {!configured && <Notice>No contract is configured yet. See DEPLOYMENT.md.</Notice>}
      {error && <Notice tone="bad">{error}</Notice>}
      {loading && <div className="label">Reading the chain...</div>}
      {data && data.items.length === 0 && <div className="label">No protocols yet. Create the first one.</div>}
      {data?.items.map((p) => <ProtocolRow key={p.id} p={p} />)}
    </div>
  );
}

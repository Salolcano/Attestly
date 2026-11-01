"use client";
import Link from "next/link";
import { useState } from "react";

import { shortAddress } from "@/lib/genlayer/format";
import { useWallet } from "./wallet-provider";

export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g fill="currentColor">
        <circle cx="20" cy="46" r="4" /><circle cx="32" cy="46" r="4" /><circle cx="44" cy="46" r="4" />
        <circle cx="26" cy="33" r="4" /><circle cx="38" cy="33" r="4" /><circle cx="32" cy="20" r="4" />
      </g>
    </svg>
  );
}

function WalletButton() {
  const { wallets, address, wrongChain, error, connect, disconnect, switchToStudio } = useWallet();
  const [open, setOpen] = useState(false);

  if (address) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {wrongChain && <button className="btn sm" onClick={switchToStudio}>Switch to Studio Next</button>}
        <button className="btn ghost sm mono" onClick={disconnect} title="Disconnect">{shortAddress(address)}</button>
      </div>
    );
  }
  return (
    <div style={{ position: "relative" }}>
      <button className="btn sm" onClick={() => (wallets.length === 1 ? connect(wallets[0]) : setOpen(!open))}>
        {wallets.length === 0 ? "No wallet found" : "Connect wallet"}
      </button>
      {open && wallets.length > 1 && (
        <div className="card" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", minWidth: 220, zIndex: 30 }}>
          {wallets.map((w) => (
            <button key={w.info.rdns} className="btn ghost sm" style={{ width: "100%", justifyContent: "flex-start", border: 0 }}
              onClick={() => { setOpen(false); void connect(w); }}>
              {w.info.icon && /* eslint-disable-next-line @next/next/no-img-element */ <img src={w.info.icon} alt="" width={18} height={18} />}
              {w.info.name}
            </button>
          ))}
        </div>
      )}
      {error && <div className="label" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", color: "var(--bad)", width: 260, textAlign: "right" }}>{error}</div>}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(10,10,10,.86)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mark /><span className="display" style={{ fontSize: 20 }}>attestly</span>
        </Link>
        <nav className="mono" style={{ display: "flex", gap: 22, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>
          <Link href="/registry" className="hide-sm">Registry</Link>
          <Link href="/protocols" className="hide-sm">Protocols</Link>
          <Link href="/protocols/new" className="hide-sm">Create</Link>
        </nav>
        <WalletButton />
      </div>
      <style>{`@media (max-width: 640px){ .hide-sm{ display:none } }`}</style>
    </header>
  );
}

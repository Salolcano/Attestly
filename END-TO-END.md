# End-to-end run on Studio Next (10 minutes)

1. Create a protocol from `demo/protocol.json` (put your own address as payee). Fund 1 GEN. Freeze.
2. (Optional) Authorize a helper who may add up to 4 sources. Register evidence: a public page you control that states a licence and a changelog entry
   (`demo/release-record.md` hosted anywhere public, for example a GitHub Gist raw URL), tick R1,R2.
3. Verify evidence. Expect `PARTIALLY_VERIFIED` if R3 has no source, `VERIFIED` if all three are supported.
4. Wait 5 minutes, accept the verdict, finalize. Check that the payee received `partial_bps` of the lock.
5. Open the registry and the party record: the protocol is listed under the responsible party.
6. Negative run: register `demo/status-page-with-instructions.md` (hosted) as the only source. No
   requirement may become MET.

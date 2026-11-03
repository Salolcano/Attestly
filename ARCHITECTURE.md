# Architecture

* **One contract** (`contracts/attestly.py`). State is JSON in `TreeMap[str,str]` (protocols, evidence,
  verification rounds, party records) plus `DynArray` indexes. Amounts are strings in views.
* **One non-deterministic step**: `_evaluate` fetches each source and asks the model one question per
  requirement, inside `gl.eq_principle.prompt_comparative`. Validators agree if every requirement status
  and every source availability match; quotes may differ.
* **Grounding**: a MET/NOT_MET answer survives only if its quote is on the cited page after normalising markup.
* **Contract-owned rules**: independence floor (a decisive answer needs enough readable independent
  publishers), result derivation (`_derive_result`), payout split (`_split_payout`), 5-minute acceptance
  delay, recovery after deadline + 1 day, custody ledger zeroed before any transfer is emitted.
* **Registry**: on finalization the protocol id is appended to `registry_ids` and to the responsible
  party's record (counts per result, last 50 entries, verified rate in basis points).
* **Console**: client-side Next.js. Reads via a throwaway-account client; writes via the wallet's
  provider with the connected address as the account. All fees come from SDK estimates.
* **Evidence access control**: `submit_evidence`, `replace_evidence`, `withdraw_evidence` and
  `request_verification` check the caller against creator, responsible party and the protocol's
  `submitters` list. Quotas (`MAX_PER_DELEGATE`, `RESERVED_FOR_OWNERS`, `MAX_REGISTRATIONS`) are
  constants in the contract. Rows are never deleted: withdrawn or replaced rows are marked
  (`removed_by`, `replaced_by`) and drop out of `evidence_ids`, so earlier verification rounds stay readable.

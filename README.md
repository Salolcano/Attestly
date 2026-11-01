# Attestly

**Verifiable compliance protocols with a public registry, on GenLayer Studio Next.**

Define what must be true. Freeze it. Register web evidence. GenLayer validators each fetch every
source and judge every requirement on their own; a round only counts if they agree. The contract
derives the result in plain code, pays an optional GEN consequence by basis points, and writes the
finalized protocol into a public registry searchable by the party it was about.

| | |
|---|---|
| Network | Studio Next, chain `61997`, RPC `https://studio-next.genlayer.com/api` |
| Contract | `contracts/attestly.py` (`# v0.3.0`, `py-genlayer:babwp9...`) |
| Console | `frontend/` (Next.js, `genlayer-js 2.0.0-rc.2`), host on Vercel |
| Deploy | see `DEPLOYMENT.md` (browser only, no local tooling) |

## Lifecycle

`DRAFT -> (AWAITING_ACCEPTANCE) -> ACTIVE -> EVIDENCE_SUBMITTED -> VERDICT_PROPOSED -> ACCEPTED -> FINALIZED`
with `CANCELLED` and a one-day-after-deadline `recover_protocol` so no GEN is ever stuck.

Results: `VERIFIED`, `PARTIALLY_VERIFIED`, `NOT_VERIFIED`, `INCONCLUSIVE`, `PROTOCOL_DEVIATION`.

## Fee system (Consensus v0.6)

Every write carries a `FeesDistribution` + `feeValue` taken unchanged from the SDK's own estimate
(`frontend/lib/genlayer/fees.ts`). Two bugs fixed there, both tested in `frontend/tests/fees.test.ts`:

* **`No account set`** - the signing client was built with `account: undefined`. It now receives the
  connected wallet address (`lib/genlayer/client.ts`), so the SDK knows who signs before the wallet opens.
* **`BudgetTooLow`** - a quote below the network's minimum execution budget. The app pins
  `genlayer-js 2.0.0-rc.2` (receipt floor priced with wrapper + terminal reserve), refuses a 0-GEN quote
  before the wallet opens, shows the fee in GEN with enough digits to never read "0", and on a
  `BudgetTooLow` answer re-quotes with doubled time units up to three times.

## Tests

```
python -m pytest -q            # 28 contract-logic tests (in-process stub of the SDK)
cd frontend && npm test        # fee and formatting tests
genvm-lint check contracts/attestly.py
```

The stub proves permissions, custody, derived results, payouts and the registry. It does not replace
GenVM: the authoritative run is Studio Next itself (`END-TO-END.md`).

# Deployment (browser only)

## 1. Deploy the contract on Studio Next
1. Open Studio Next (the studio your hackathon page links to) and connect your wallet.
   Network: **Studio Next**, RPC `https://studio-next.genlayer.com/api`, chain id `61997`.
2. New file, paste all of `contracts/attestly.py`. Keep the first two lines exactly as they are.
3. Deploy with no constructor arguments. Studio shows the fee quote; accept it.
4. Wait for `FINALIZED` and confirm the execution result is a success, then copy the contract address.
5. Check `get_info` returns `{"version": "attestly-1", ...}`.

## 2. Host the console on Vercel
1. Push this repo to GitHub.
2. Vercel -> Add New Project -> import it. **Root Directory: `frontend`**. Framework: Next.js.
3. Environment variables (copy from `frontend/.env.example`):
   `NEXT_PUBLIC_RPC_URL`, `NEXT_PUBLIC_CHAIN_ID=61997`, `NEXT_PUBLIC_EXPLORER_URL`,
   `NEXT_PUBLIC_ATTESTLY_ADDRESS=<address from step 1>`.
4. Deploy. After changing a variable, redeploy (NEXT_PUBLIC values are baked in at build).

## 3. Wallet
Rabby / MetaMask: the console offers to add and switch to Studio Next. You need GEN on Studio Next
for the value you lock plus the fee deposit (unused fee is refunded at finalization).

## If a write fails
* `No account set` - connect a wallet first; the header must show your address.
* `BudgetTooLow` - the console re-quotes automatically. If it still fails after 3 attempts, open the
  transaction in the explorer and check the fee panel; the RPC may be serving stale fee data.
* Payout writes (`finalize_protocol`, `cancel_protocol`, `recover_protocol`) emit GEN transfers. If the
  quote for those is rejected, estimate them with the CLI using `messageAllocations`
  (`genlayer estimate-fees <addr> finalize_protocol --fees '{"messageAllocations":[...]}'`).

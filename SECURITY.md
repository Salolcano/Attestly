# Security notes

* Evidence is treated as material to read, never as instructions (`demo/status-page-with-instructions.md`).
* A model never names the result and never moves money; it answers one requirement at a time.
* Sources must be public https hosts (no credentials, ports, IP literals, localhost).
* Payable calls that cannot be accepted are refunded, not reverted (a revert would drop the refund).
* The frozen fingerprint covers title, subject, party, deadline, requirements, policy and payee.
* Known limits: pages are read as text only; a publisher is judged by host/account, not by identity;
  `prompt_comparative` uses an LLM judge for equivalence, so keep requirements concrete.

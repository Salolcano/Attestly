# End to end

A record of one protocol walked through the deployed Attestly contract on GenLayer Studio Next (chain 61997). Every transaction below is a link to the explorer so each step can be reviewed.

## Deployment

| Item | Value |
|---|---|
| Network | GenLayer Studio Next, chain 61997 |
| Deploy transaction | [0xa1d25a6ab9cf8a8a7439a599c470c40c9c4b6ba15dcf5c52cfedacd3fd9e0952](https://explorer-studio-next.genlayer.com/tx/0xa1d25a6ab9cf8a8a7439a599c470c40c9c4b6ba15dcf5c52cfedacd3fd9e0952) |

## Evidence page

One public page was registered as evidence:

1. [consensus-v06-migration](https://docs.genlayer.com/developers/consensus-v06-migration)

## Requirements

1. The page says Studio-dev uses chain ID 61997. (mandatory)

## Transactions

All four were sent to the contract, listed oldest first. The explorer does not decode method names, so the function column follows the lifecycle order in the README and ARCHITECTURE.md.

| # | Step | Function | Evidence page | Consensus | Transaction |
|---|---|---|---|---|---|
| 1 | Write the protocol | `create_protocol` | none | Accepted | [0xc21366632f4bc0cf13cfd2fbbcca4fd6c2d27541b92dfca5c1bc6d928eb7790e](https://explorer-studio-next.genlayer.com/tx/0xc21366632f4bc0cf13cfd2fbbcca4fd6c2d27541b92dfca5c1bc6d928eb7790e) |
| 2 | Freeze the terms | `freeze_protocol` | none | Accepted | [0xf9fdffd062d94c2acc86b92ca13fe7cda9b42df19ddccf49f6d9aad51de2ef67](https://explorer-studio-next.genlayer.com/tx/0xf9fdffd062d94c2acc86b92ca13fe7cda9b42df19ddccf49f6d9aad51de2ef67) |
| 3 | Register evidence | `submit_evidence` | [consensus-v06-migration](https://docs.genlayer.com/developers/consensus-v06-migration) | Accepted | [0x27c9c9db35781861c2629772f48394e938d6c568ba81df916d76aa66986dfcdf](https://explorer-studio-next.genlayer.com/tx/0x27c9c9db35781861c2629772f48394e938d6c568ba81df916d76aa66986dfcdf) |
| 4 | Request verification | `request_verification` | [consensus-v06-migration](https://docs.genlayer.com/developers/consensus-v06-migration) | Accepted | [0x8cb7c5d38188c75d199b0070d59fda793be29f58d6c609b6388320b218dd9e69](https://explorer-studio-next.genlayer.com/tx/0x8cb7c5d38188c75d199b0070d59fda793be29f58d6c609b6388320b218dd9e69) |

## Reproduce

Follow the steps in `END-TO-END.md` of the repository, using `demo/protocol.json` with one requirement.

Raw page address for the evidence, as the contract fetches it:

- https://docs.genlayer.com/developers/consensus-v06-migration

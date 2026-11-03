# End to end

A record of one protocol walked through the deployed Attestly contract on GenLayer Studio Next (chain 61997). Every transaction below is a link to the explorer so each step can be reviewed.

## Deployment

| Item | Value |
|---|---|
| Network | GenLayer Studio Next, chain 61997 |
| Contract | [0xc53b8A90B1Ebe00dB1abc0F2A7916d7Bb27D76D1](https://explorer-studio-next.genlayer.com/address/0xc53b8A90B1Ebe00dB1abc0F2A7916d7Bb27D76D1) |

## Evidence page

One public page was registered as evidence:

1. [example.com](https://example.com)

## Requirements

1. The page says the domain is for use in illustrative examples. (mandatory)

## Transactions

All seven were sent to the contract, listed oldest first. The explorer does not decode method names, so the function column follows the lifecycle order in the README and ARCHITECTURE.md.

| # | Step | Function | Evidence page | Transaction |
|---|---|---|---|---|
| 1 | Write the protocol | `create_protocol` | none | [0xfc878c53a79df6d4b091458008fff666d381093f1468b0130963497c67e69ac5](https://explorer-studio-next.genlayer.com/tx/0xfc878c53a79df6d4b091458008fff666d381093f1468b0130963497c67e69ac5) |
| 2 | Freeze the terms | `freeze_protocol` | none | [0xe486626e6f75bf2972297d9041700c49e08ad56346296a1143897a5c2fdeb6e2](https://explorer-studio-next.genlayer.com/tx/0xe486626e6f75bf2972297d9041700c49e08ad56346296a1143897a5c2fdeb6e2) |
| 3 | Register evidence | `submit_evidence` | [example.com](https://example.com) | [0xba183c2c366007cd4bf7fd0525eb6366aa252b643d2d718447c7536f17abe270](https://explorer-studio-next.genlayer.com/tx/0xba183c2c366007cd4bf7fd0525eb6366aa252b643d2d718447c7536f17abe270) |
| 4 | Request verification | `request_verification` | [example.com](https://example.com) | [0x79b81699d133f90cbd85a825395e2abcb4a4bbe8de6c4978f758086e37debc65](https://explorer-studio-next.genlayer.com/tx/0x79b81699d133f90cbd85a825395e2abcb4a4bbe8de6c4978f758086e37debc65) |
| 5 | Accept the verdict | `accept_verification` | n/a | [0x84bb0304b1cd310027153e15c9fc99da9bcf8b2a52374e0b7d2ca3344b2b3947](https://explorer-studio-next.genlayer.com/tx/0x84bb0304b1cd310027153e15c9fc99da9bcf8b2a52374e0b7d2ca3344b2b3947) |
| 6 | Finalize and pay | `finalize_protocol` | n/a | [0x5065210e0260649d8c871cbff7ac41b43d554996b6e8475b41d1ef5dc7137f55](https://explorer-studio-next.genlayer.com/tx/0x5065210e0260649d8c871cbff7ac41b43d554996b6e8475b41d1ef5dc7137f55) |
| 7 | Additional call | see note below | n/a | [0xad7f629a0e7001a1371a4261e4972a83e2b708c566d17c8aeb08b5b3c3746dbb](https://explorer-studio-next.genlayer.com/tx/0xad7f629a0e7001a1371a4261e4972a83e2b708c566d17c8aeb08b5b3c3746dbb) |

### Note on call 7

The lifecycle has six calls after deployment: `create_protocol`, `freeze_protocol`, `submit_evidence`, `request_verification`, `accept_verification` and `finalize_protocol`. Seven calls were sent, so one is an additional call, such as a repeated step. Open the link to read its call data and confirm.

## Reproduce

Follow the steps in `END-TO-END.md` of the repository, using one requirement.

Raw page address for the evidence, as the contract fetches it:

- https://example.com

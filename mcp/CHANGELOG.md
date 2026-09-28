# @cryptoapis-io/mcp

## 0.4.9

### Patch Changes

- Updated dependencies [1b45318]
  - @cryptoapis-io/mcp-signer@0.5.0
  - @cryptoapis-io/mcp-x402-pay@0.5.3

## 0.4.8

### Patch Changes

- Updated dependencies [dbfbb0a]
  - @cryptoapis-io/mcp-blockchain-fees@0.5.1

## 0.4.7

### Patch Changes

- Updated dependencies [3167621]
  - @cryptoapis-io/mcp-block-data@0.4.0
  - @cryptoapis-io/mcp-blockchain-events@0.5.0
  - @cryptoapis-io/mcp-simulate@0.4.0
  - @cryptoapis-io/mcp-prepare-transactions@0.5.0
  - @cryptoapis-io/mcp-address-history@0.4.0
  - @cryptoapis-io/mcp-address-latest@0.4.0
  - @cryptoapis-io/mcp-aml@0.2.0
  - @cryptoapis-io/mcp-market-data@0.4.0
  - @cryptoapis-io/mcp-contracts@0.4.0
  - @cryptoapis-io/mcp-utils@0.4.0
  - @cryptoapis-io/mcp-hd-wallet@0.4.0
  - @cryptoapis-io/mcp-broadcast@0.5.0
  - @cryptoapis-io/mcp-blockchain-fees@0.5.0
  - @cryptoapis-io/mcp-transactions-data@0.4.0
  - @cryptoapis-io/mcp-signer@0.4.1
  - @cryptoapis-io/mcp-x402-pay@0.5.2

## 0.4.6

### Patch Changes

- Updated dependencies [9b37ad7]
  - @cryptoapis-io/mcp-x402-pay@0.5.1

## 0.4.5

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-x402-pay@0.5.0

## 0.4.4

### Patch Changes

- Updated dependencies [eade12a]
- Updated dependencies [8397658]
- Updated dependencies [74154b1]
- Updated dependencies [7f680c2]
  - @cryptoapis-io/mcp-address-history@0.3.1
  - @cryptoapis-io/mcp-address-latest@0.3.1
  - @cryptoapis-io/mcp-blockchain-events@0.4.0
  - @cryptoapis-io/mcp-hd-wallet@0.3.1

## 0.4.3

### Patch Changes

- Updated dependencies [068b206]
- Updated dependencies [c30c9b1]
  - @cryptoapis-io/mcp-broadcast@0.4.0
  - @cryptoapis-io/mcp-simulate@0.3.1
  - @cryptoapis-io/mcp-address-history@0.3.1
  - @cryptoapis-io/mcp-address-latest@0.3.1
  - @cryptoapis-io/mcp-aml@0.1.1
  - @cryptoapis-io/mcp-block-data@0.3.1
  - @cryptoapis-io/mcp-blockchain-events@0.3.1
  - @cryptoapis-io/mcp-blockchain-fees@0.4.1
  - @cryptoapis-io/mcp-contracts@0.3.1
  - @cryptoapis-io/mcp-hd-wallet@0.3.1
  - @cryptoapis-io/mcp-market-data@0.3.1
  - @cryptoapis-io/mcp-prepare-transactions@0.4.1
  - @cryptoapis-io/mcp-signer@0.4.1
  - @cryptoapis-io/mcp-transactions-data@0.3.1
  - @cryptoapis-io/mcp-utils@0.3.1
  - @cryptoapis-io/mcp-x402-pay@0.4.1

## 0.4.2

### Patch Changes

- Updated dependencies [cdb2c1f]
- Updated dependencies [cdb2c1f]
- Updated dependencies [cdb2c1f]
  - @cryptoapis-io/mcp-prepare-transactions@0.4.0
  - @cryptoapis-io/mcp-blockchain-fees@0.4.0
  - @cryptoapis-io/mcp-address-history@0.3.1
  - @cryptoapis-io/mcp-address-latest@0.3.1
  - @cryptoapis-io/mcp-aml@0.1.1
  - @cryptoapis-io/mcp-block-data@0.3.1
  - @cryptoapis-io/mcp-blockchain-events@0.3.1
  - @cryptoapis-io/mcp-broadcast@0.3.1
  - @cryptoapis-io/mcp-contracts@0.3.1
  - @cryptoapis-io/mcp-hd-wallet@0.3.1
  - @cryptoapis-io/mcp-market-data@0.3.1
  - @cryptoapis-io/mcp-signer@0.4.1
  - @cryptoapis-io/mcp-simulate@0.3.1
  - @cryptoapis-io/mcp-transactions-data@0.3.1
  - @cryptoapis-io/mcp-utils@0.3.1
  - @cryptoapis-io/mcp-x402-pay@0.4.1

## 0.4.1

### Patch Changes

- Updated dependencies [e519949]
  - @cryptoapis-io/mcp-x402-pay@0.4.0

## 0.4.0

### Minor Changes

- 00a1b15: Add the two x402 servers to the umbrella package.

  `mcp-x402-pay` (buyer) has been published since 0.1.0 but was never listed here, and `mcp-x402-accept`
  (merchant) is new — so `npm install @cryptoapis-io/mcp` claimed to install "all Crypto APIs MCP servers"
  while silently omitting both halves of x402.

  The README's usage section assumed every server takes `--api-key`, which is wrong for these two: the
  buyer needs a key with the `X402_BUYER` feature, and the merchant proxy takes a `--config` file and a
  key with `X402_FACILITATOR`. Documented both rather than letting the table imply otherwise.

### Patch Changes

- Updated dependencies [ff80ffb]
  - @cryptoapis-io/mcp-x402-accept@0.1.1

## 0.3.1

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-signer@0.4.0

## 0.3.0

### Minor Changes

- Add MCP logging, resources, and prompts across all packages. Add debug-level tool call logging, replace console.error with McpLogger, remove .refine() from schemas for MCP client compatibility, and fix supply-chain vulnerabilities.

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-address-history@0.3.0
  - @cryptoapis-io/mcp-address-latest@0.3.0
  - @cryptoapis-io/mcp-block-data@0.3.0
  - @cryptoapis-io/mcp-blockchain-events@0.3.0
  - @cryptoapis-io/mcp-blockchain-fees@0.3.0
  - @cryptoapis-io/mcp-broadcast@0.3.0
  - @cryptoapis-io/mcp-contracts@0.3.0
  - @cryptoapis-io/mcp-hd-wallet@0.3.0
  - @cryptoapis-io/mcp-market-data@0.3.0
  - @cryptoapis-io/mcp-prepare-transactions@0.3.0
  - @cryptoapis-io/mcp-signer@0.3.0
  - @cryptoapis-io/mcp-simulate@0.3.0
  - @cryptoapis-io/mcp-transactions-data@0.3.0
  - @cryptoapis-io/mcp-utils@0.3.0

## 0.2.6

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-address-history@0.2.4
  - @cryptoapis-io/mcp-address-latest@0.2.4
  - @cryptoapis-io/mcp-block-data@0.2.3
  - @cryptoapis-io/mcp-blockchain-events@0.2.3
  - @cryptoapis-io/mcp-blockchain-fees@0.2.4
  - @cryptoapis-io/mcp-broadcast@0.2.3
  - @cryptoapis-io/mcp-contracts@0.2.4
  - @cryptoapis-io/mcp-hd-wallet@0.2.4
  - @cryptoapis-io/mcp-market-data@0.2.5
  - @cryptoapis-io/mcp-prepare-transactions@0.2.3
  - @cryptoapis-io/mcp-signer@0.2.4
  - @cryptoapis-io/mcp-simulate@0.2.3
  - @cryptoapis-io/mcp-transactions-data@0.2.4
  - @cryptoapis-io/mcp-utils@0.2.3

## 0.2.5

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-address-history@0.2.3
  - @cryptoapis-io/mcp-address-latest@0.2.3
  - @cryptoapis-io/mcp-blockchain-fees@0.2.3
  - @cryptoapis-io/mcp-contracts@0.2.3
  - @cryptoapis-io/mcp-hd-wallet@0.2.3
  - @cryptoapis-io/mcp-signer@0.2.3
  - @cryptoapis-io/mcp-transactions-data@0.2.3

## 0.2.4

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-address-history@0.2.2
  - @cryptoapis-io/mcp-address-latest@0.2.2
  - @cryptoapis-io/mcp-block-data@0.2.2
  - @cryptoapis-io/mcp-blockchain-events@0.2.2
  - @cryptoapis-io/mcp-blockchain-fees@0.2.2
  - @cryptoapis-io/mcp-broadcast@0.2.2
  - @cryptoapis-io/mcp-contracts@0.2.2
  - @cryptoapis-io/mcp-hd-wallet@0.2.2
  - @cryptoapis-io/mcp-prepare-transactions@0.2.2
  - @cryptoapis-io/mcp-signer@0.2.2
  - @cryptoapis-io/mcp-simulate@0.2.2
  - @cryptoapis-io/mcp-transactions-data@0.2.2
  - @cryptoapis-io/mcp-utils@0.2.2
  - @cryptoapis-io/mcp-market-data@0.2.4

## 0.2.3

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-market-data@0.2.3

## 0.2.2

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-market-data@0.2.2

## 0.2.1

### Patch Changes

- Rename Hosted MCP Server to Remote MCP Server in documentation
- Updated dependencies
  - @cryptoapis-io/mcp-address-history@0.2.1
  - @cryptoapis-io/mcp-address-latest@0.2.1
  - @cryptoapis-io/mcp-block-data@0.2.1
  - @cryptoapis-io/mcp-blockchain-events@0.2.1
  - @cryptoapis-io/mcp-blockchain-fees@0.2.1
  - @cryptoapis-io/mcp-broadcast@0.2.1
  - @cryptoapis-io/mcp-contracts@0.2.1
  - @cryptoapis-io/mcp-hd-wallet@0.2.1
  - @cryptoapis-io/mcp-market-data@0.2.1
  - @cryptoapis-io/mcp-prepare-transactions@0.2.1
  - @cryptoapis-io/mcp-signer@0.2.1
  - @cryptoapis-io/mcp-simulate@0.2.1
  - @cryptoapis-io/mcp-transactions-data@0.2.1
  - @cryptoapis-io/mcp-utils@0.2.1

## 0.2.0

### Minor Changes

- Add User-Agent and x-source headers to identify MCP traffic

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-address-history@0.2.0
  - @cryptoapis-io/mcp-address-latest@0.2.0
  - @cryptoapis-io/mcp-block-data@0.2.0
  - @cryptoapis-io/mcp-blockchain-events@0.2.0
  - @cryptoapis-io/mcp-blockchain-fees@0.2.0
  - @cryptoapis-io/mcp-broadcast@0.2.0
  - @cryptoapis-io/mcp-contracts@0.2.0
  - @cryptoapis-io/mcp-hd-wallet@0.2.0
  - @cryptoapis-io/mcp-market-data@0.2.0
  - @cryptoapis-io/mcp-prepare-transactions@0.2.0
  - @cryptoapis-io/mcp-signer@0.2.0
  - @cryptoapis-io/mcp-simulate@0.2.0
  - @cryptoapis-io/mcp-transactions-data@0.2.0
  - @cryptoapis-io/mcp-utils@0.2.0

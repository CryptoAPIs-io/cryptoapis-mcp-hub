# @cryptoapis-io/mcp

The combined [Crypto APIs](https://cryptoapis.io) MCP server — all 14 data products in a single process, one command.

## What's Included

Every tool is named `<product>__<tool>` (e.g. `block_data__evm_block_data`):

| Product | Tools |
|---------|-------|
| `address_history` | Manage synced addresses, full tx/token history (EVM, UTXO) |
| `address_latest` | Current balance/state (EVM, UTXO, Solana, XRP, Kaspa) |
| `aml` | AML address verification and transaction screening |
| `block_data` | Block-level data (EVM, UTXO, XRP) |
| `blockchain_events` | Webhook subscriptions — create and manage |
| `blockchain_fees` | Fee recommendations and gas estimation (EVM, UTXO, XRP, Tezos, Solana) |
| `broadcast` | Broadcast signed raw transactions |
| `contracts` | Smart contract ABIs and on-chain data (EVM, Solana) |
| `hd_wallet` | xpub/HD wallet balance and sync (EVM, UTXO, XRP) |
| `market_data` | Asset prices, exchange rates, metadata |
| `prepare_transactions` | Build unsigned transactions (EVM, Tezos, Solana, Kaspa, XRP, UTXO, Tron) |
| `simulate` | Dry-run Ethereum transaction simulation |
| `transactions_data` | Transaction lookup and listing |
| `utils` | Address derivation and encoding utilities |

Each product also registers its prompts and a `cryptoapis://<product>/...` resource.

**Not included:** `@cryptoapis-io/mcp-signer` (local transaction signing), `@cryptoapis-io/mcp-x402-pay`
(buyer-side x402), and `@cryptoapis-io/mcp-x402-accept` (merchant-side x402 paywall) are separate
installs — they move money or hold keys, which this combined server deliberately does not.

## Prerequisites

- Node.js 18+
- [Crypto APIs](https://cryptoapis.io/) account and API key ([sign up](https://app.cryptoapis.io/signup) | [get API key](https://app.cryptoapis.io/api-keys))

## Usage

```bash
npx @cryptoapis-io/mcp --api-key YOUR_API_KEY
```

Or via environment variable:

```bash
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp
```

### Claude Desktop

```json
{
  "mcpServers": {
    "cryptoapis": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "cryptoapis": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "cryptoapis": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Remote MCP Server

Crypto APIs also hosts this same combined server over HTTP Streamable transport at
[https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp) — no installation required. Pass your API
key via the `x-api-key` header with each request:

```json
{
  "mcpServers": {
    "cryptoapis": {
      "url": "https://ai.cryptoapis.io/mcp",
      "headers": {
        "x-api-key": "your_api_key_here"
      }
    }
  }
}
```

## HTTP Transport (self-hosted)

```bash
npx @cryptoapis-io/mcp --transport http --api-key YOUR_API_KEY
```

See the [main README](https://github.com/CryptoAPIs-io/cryptoapis-mcp-hub) for the full list of CLI
arguments, HTTP API key modes, and exposing the server beyond localhost.

## Only need a few products?

Install just the packages you use instead of the combined server:

```bash
npx @cryptoapis-io/mcp-block-data --api-key YOUR_API_KEY
```

See [docs](https://developers.cryptoapis.io) for the full API reference.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting the server.

## License

MIT

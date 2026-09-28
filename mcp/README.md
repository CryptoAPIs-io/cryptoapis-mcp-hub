# @cryptoapis-io/mcp

Install all [Crypto APIs](https://cryptoapis.io) MCP servers with a single command.

## Prerequisites

- Node.js 18+
- [Crypto APIs](https://cryptoapis.io/) account and API key ([sign up](https://app.cryptoapis.io/signup) | [get API key](https://app.cryptoapis.io/api-keys))

## Installation

```bash
npm install @cryptoapis-io/mcp
```

Or install only the servers you need (recommended if you only use a few):

```bash
npm install @cryptoapis-io/mcp-address-latest @cryptoapis-io/mcp-hd-wallet
```

## What's Included

| Package | Description |
|---------|-------------|
| `@cryptoapis-io/mcp-address-latest` | Current balance and state for EVM, UTXO, Solana, XRP, and Kaspa addresses |
| `@cryptoapis-io/mcp-address-history` | Full transaction and token history for synced addresses |
| `@cryptoapis-io/mcp-block-data` | Block-level data from EVM, UTXO, and XRP blockchains |
| `@cryptoapis-io/mcp-blockchain-events` | Subscribe to and manage on-chain event webhooks |
| `@cryptoapis-io/mcp-blockchain-fees` | Fee recommendations and gas estimation |
| `@cryptoapis-io/mcp-broadcast` | Broadcast signed raw transactions |
| `@cryptoapis-io/mcp-contracts` | Read smart contract ABIs and on-chain data |
| `@cryptoapis-io/mcp-hd-wallet` | HD wallet management, balance retrieval, and sync |
| `@cryptoapis-io/mcp-market-data` | Asset prices, exchange rates, and market metadata |
| `@cryptoapis-io/mcp-prepare-transactions` | Build unsigned transactions |
| `@cryptoapis-io/mcp-signer` | Local transaction signing (EVM, UTXO, Tron, XRP) |
| `@cryptoapis-io/mcp-simulate` | Dry-run EVM transaction simulation |
| `@cryptoapis-io/mcp-transactions-data` | Transaction lookup and listing |
| `@cryptoapis-io/mcp-utils` | Address derivation and encoding utilities |
| `@cryptoapis-io/mcp-x402-pay` | Pay x402-gated HTTP endpoints and MCP tools automatically (non-custodial) |
| `@cryptoapis-io/mcp-x402-accept` | Charge agents per tool call — self-hosted x402 paywall for an existing MCP server |

## Usage

After installing, each server is available via `npx`:

```bash
npx @cryptoapis-io/mcp-hd-wallet --api-key YOUR_API_KEY
npx @cryptoapis-io/mcp-market-data --api-key YOUR_API_KEY
npx @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY
```

The two **x402** servers are configured differently, because they move money rather than read data:

```bash
# Buyer — pay for 402-gated endpoints and MCP tools. Needs a key with the X402_BUYER feature.
npx @cryptoapis-io/mcp-x402-pay --api-key YOUR_API_KEY

# Merchant — paywall an MCP server you already run. Config file, not flags:
npx @cryptoapis-io/mcp-x402-accept --config ./x402-accept.config.json
```

`mcp-x402-accept` is **self-hosted by design** — you run it, so your tool arguments and results never
leave your machine. It needs a key with the **X402_FACILITATOR** feature; see its README for the config
format.

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-address-latest": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-latest"],
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
    "cryptoapis-address-latest": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-latest"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

See each package's README for full documentation of available tools and actions. For n8n, MCP Inspector, and Claude Code setup, see the [main README](../../README.md).

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Remote MCP Server

Crypto APIs provides an official remote MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT

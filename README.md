# Crypto APIs MCP Servers

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) servers for [Crypto APIs](https://cryptoapis.io/) — blockchain data, transactions, fees, signing, HD wallets, market data, and more. Works with Claude Desktop, Cursor, Windsurf, n8n, and any MCP-compatible AI client.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Quick Start

### Prerequisites

- Node.js 18+
- [Crypto APIs](https://cryptoapis.io/) account and API key ([sign up](https://app.cryptoapis.io/signup) | [get API key](https://app.cryptoapis.io/api-keys))

### Install a single server

```bash
npx @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY
```

### Install all servers at once

```bash
npm install @cryptoapis-io/mcp
```

## Remote MCP Server

Crypto APIs provides an official remote MCP server with HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp).

This is a multi-tenant server — pass your API key via the `x-api-key` header with each request. No installation or self-hosting required.

Use this when you need HTTP transport without running your own server (e.g. with n8n, custom AI agents, or any HTTP-based MCP client).

## Packages

| Package | npm | GitHub | Description |
|---------|-----|--------|-------------|
| `@cryptoapis-io/mcp` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp) | — | Meta-package — installs all servers below |
| `@cryptoapis-io/mcp-address-latest` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-address-latest) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-address-latest) | Current balance and state for EVM, UTXO, Solana, XRP, Kaspa addresses |
| `@cryptoapis-io/mcp-aml` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-aml) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-aml) | AML address verification and transaction screening |
| `@cryptoapis-io/mcp-address-history` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-address-history) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-address-history) | Full transaction and token history for synced addresses |
| `@cryptoapis-io/mcp-block-data` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-block-data) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-block-data) | Block details by height or hash (EVM, UTXO, XRP) |
| `@cryptoapis-io/mcp-blockchain-events` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-blockchain-events) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-blockchain-events) | Webhook subscriptions for on-chain events |
| `@cryptoapis-io/mcp-blockchain-fees` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-blockchain-fees) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-blockchain-fees) | Fee recommendations and gas estimation (EVM, UTXO, XRP) |
| `@cryptoapis-io/mcp-broadcast` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-broadcast) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-broadcast) | Broadcast signed raw transactions |
| `@cryptoapis-io/mcp-contracts` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-contracts) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-contracts) | Token details by contract address (EVM, Solana) |
| `@cryptoapis-io/mcp-hd-wallet` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-hd-wallet) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-hd-wallet) | HD wallet management, balance, and sync (EVM, UTXO, XRP) |
| `@cryptoapis-io/mcp-market-data` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-market-data) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-market-data) | Asset prices, exchange rates, and market metadata |
| `@cryptoapis-io/mcp-prepare-transactions` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-prepare-transactions) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-prepare-transactions) | Build unsigned EVM transactions |
| `@cryptoapis-io/mcp-signer` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-signer) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-signer) | Local transaction signing (EVM, UTXO, Tron, XRP) — no API calls |
| `@cryptoapis-io/mcp-simulate` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-simulate) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-simulate) | Dry-run EVM transaction simulation |
| `@cryptoapis-io/mcp-transactions-data` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-transactions-data) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-transactions-data) | Transaction lookup by hash (EVM, UTXO, Solana, XRP, Kaspa) |
| `@cryptoapis-io/mcp-utils` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-utils) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-utils) | Address validation, raw tx decoding, XRP X-Address encoding |
| `@cryptoapis-io/mcp-shared` | [npm](https://www.npmjs.com/package/@cryptoapis-io/mcp-shared) | [GitHub](https://github.com/CryptoAPIs-io/cryptoapis-mcp-shared) | Shared HTTP client, error types, blockchain constants, and schemas |

## Supported Blockchains & Networks

### EVM

| Blockchain | Mainnet | Testnet |
|------------|---------|---------|
| Ethereum | mainnet | sepolia |
| Ethereum Classic | mainnet | mordor |
| Binance Smart Chain | mainnet | testnet |
| Polygon | mainnet | amoy |
| Avalanche (C-Chain) | mainnet | fuji |
| Tron | mainnet | nile |
| Arbitrum | mainnet | sepolia |
| Base | mainnet | sepolia |
| Optimism | mainnet | sepolia |

### UTXO

| Blockchain | Mainnet | Testnet |
|------------|---------|---------|
| Bitcoin | mainnet | testnet |
| Bitcoin Cash | mainnet | testnet |
| Litecoin | mainnet | testnet |
| Dogecoin | mainnet | testnet |
| Dash | mainnet | testnet |
| Zcash | mainnet | testnet |

### Other

| Blockchain | Mainnet | Testnet |
|------------|---------|---------|
| XRP (Ripple) | mainnet | testnet |
| Solana | mainnet | devnet |
| Kaspa | mainnet | — |

## Configuration

All MCP servers need a Crypto APIs API key. For **stdio** transport, provide it at startup via CLI argument or environment variable. For **HTTP** transport, it can also be provided per-request via `x-api-key` header (see [HTTP API Key Modes](#http-api-key-modes)).

```bash
# CLI argument (recommended)
npx @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY

# Environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-address-latest
```

### Claude Desktop

Add to your Claude Desktop config:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "cryptoapis-address-latest": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-latest"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    },
    "cryptoapis-hd-wallet": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-hd-wallet"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Add as many servers as you need. See each package's README for its specific config.

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

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

### Claude Code

```bash
claude mcp add cryptoapis-address-latest -- npx -y @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY
```

### n8n

n8n's AI Agent can call your MCP servers using the built-in **MCP Client Tool** node. This lets you use blockchain data tools inside n8n workflows — no custom code needed.

**1. Start a server in HTTP mode:**

```bash
npx @cryptoapis-io/mcp-market-data --transport http --api-key YOUR_API_KEY
```

**2. Add the MCP Client Tool to your n8n workflow:**

1. Create or open a workflow with an **AI Agent** node
2. Under the agent's **Tools** section, click **Add Tool** > **MCP Client Tool**
3. Configure the MCP Client Tool:
   - **URL**: `http://localhost:3000/mcp` (or your server's host/port)
4. The agent now has access to all tools exposed by that MCP server

**3. Repeat for additional servers** (each on a different port):

```bash
npx @cryptoapis-io/mcp-blockchain-fees --transport http --port 3001 --api-key YOUR_API_KEY
npx @cryptoapis-io/mcp-transactions-data --transport http --port 3002 --api-key YOUR_API_KEY
```

Add a separate MCP Client Tool node for each server, pointing to its port.

> **Note:** All servers default to port `3000`. When running multiple servers on the same host, use `--port` to assign each a different port.

> **Tip:** For production use, run the servers as persistent processes (e.g. via `pm2`, `systemd`, or Docker) rather than `npx`.

> **Note:** `@cryptoapis-io/mcp-signer` only supports stdio transport and cannot be used with n8n's HTTP-based MCP Client Tool.

There is also a dedicated [n8n community node](https://www.npmjs.com/package/@cryptoapis-io/n8n-nodes-cryptoapis) that provides native Crypto APIs integration within n8n workflows and AI agents.

## CLI Arguments

All servers support these arguments:

| Argument | Description | Default |
|----------|-------------|---------|
| `--api-key` | Crypto APIs API key | `CRYPTOAPIS_API_KEY` env var |
| `--transport` | Transport type: `stdio` or `http` | `stdio` |
| `--host` | HTTP host (use `0.0.0.0` to accept remote connections — requires an auth token with `--api-key`) | `127.0.0.1` |
| `--auth-token` | Bearer token callers must send (`Authorization: Bearer <token>`); prefer the env var | `MCP_AUTH_TOKEN` env var |
| `--allowed-hosts` | Comma-separated `Host` header allowlist for non-loopback binds | — |
| `--port` | HTTP port | `3000` |
| `--path` | HTTP path | `/mcp` |
| `--stateless` | Enable stateless HTTP mode | `false` |

**Exception:** `@cryptoapis-io/mcp-signer` only supports stdio (no HTTP transport) since it handles private keys locally.

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

**Fixed key (single-tenant)** — start with `--api-key`. The key is used for all requests and any `x-api-key` headers on incoming requests are ignored.

```bash
npx @cryptoapis-io/mcp-market-data --transport http --api-key YOUR_API_KEY
```

**Per-request key (multi-tenant)** — start without `--api-key`. Each incoming HTTP request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a single public MCP server that serves multiple users, each using their own API key.

```bash
# Start without API key
npx @cryptoapis-io/mcp-market-data --transport http

# Clients include their key in every request via x-api-key header
```

| Scenario | API key source | `x-api-key` header |
|----------|---------------|--------------------|
| Stdio (always) | `--api-key` or `CRYPTOAPIS_API_KEY` env var (required) | N/A |
| HTTP with `--api-key` | Startup key (fixed for all requests) | Ignored |
| HTTP without `--api-key` | `x-api-key` request header (required) | Required |

### Exposing the server beyond localhost

HTTP mode listens on `127.0.0.1` by default, so only processes on the same machine can reach it.
To accept connections from other machines or containers (Docker, Kubernetes, a shared VPC), bind
explicitly and protect the port:

```bash
# Fixed key: callers must present a bearer token. Without MCP_AUTH_TOKEN the server refuses to
# start on a non-loopback address, because anyone reaching the port would spend your credits.
export MCP_AUTH_TOKEN=$(openssl rand -hex 32)
npx @cryptoapis-io/mcp-market-data --transport http --host 0.0.0.0 --api-key YOUR_API_KEY \
  --allowed-hosts mcp.internal.example
# Clients send: Authorization: Bearer $MCP_AUTH_TOKEN

# Per-request key: no startup key; requests without their own x-api-key are rejected (401)
npx @cryptoapis-io/mcp-market-data --transport http --host 0.0.0.0
```

`--allowed-hosts` restricts the `Host` header (DNS rebinding protection) when not bound to
loopback; loopback binds get this check automatically. Prefer `MCP_AUTH_TOKEN` over
`--auth-token`: command-line arguments are visible in the process list.

> **Note:** Stdio transport always requires an API key at startup. The per-request mode only applies to HTTP transport.

## Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY
```

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Security

Found a vulnerability? Please report it privately, not in a public issue. See [SECURITY.md](SECURITY.md) or email security@cryptoapis.io.
Published advisories are on the [Security tab](https://github.com/CryptoAPIs-io/cryptoapis-mcp-hub/security/advisories).

## License

MIT

# @cryptoapis-io/mcp-hub

## 0.3.1

### Patch Changes

- `@cryptoapis-io/mcp` is now a runnable combined MCP server (`npx @cryptoapis-io/mcp`) that bundles the
  14 non-signing product packages into one process, naming every tool `<product>__<tool>`. It no longer
  depends on `mcp-signer`, `mcp-x402-pay` or `mcp-x402-accept`, and gains registry metadata (`mcpName`,
  `server.json` with both the npm package and the hosted `https://ai.cryptoapis.io/mcp` remote).

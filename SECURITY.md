# Security Policy

This policy covers the Crypto APIs MCP servers (`@cryptoapis-io/mcp-*` on npm, and the
`CryptoAPIs-io/cryptoapis-mcp-*` repositories), and the other open-source projects in the
[CryptoAPIs-io](https://github.com/CryptoAPIs-io) organization.

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report privately through GitHub: open the
[Security tab of this repository](https://github.com/CryptoAPIs-io/cryptoapis-mcp-hub/security) and
choose **Report a vulnerability**. Only the maintainers can see the report.

If you can't use GitHub, email **[security@cryptoapis.io](mailto:security@cryptoapis.io)**.

Useful details:

- the affected package(s) and version(s);
- how the server was started (transport, flags, environment);
- steps to reproduce, and what an attacker gains;
- whether and how you would like to be credited.

## What to expect

- We acknowledge a report within **3 business days**.
- We reproduce it, check every package that shares the affected code, and keep you updated.
- Fixed versions are released first. We then publish a
  [GitHub Security Advisory](https://github.com/CryptoAPIs-io/cryptoapis-mcp-hub/security/advisories)
  and request a CVE where warranted, so `npm audit` and Dependabot flag vulnerable installs.
- We credit reporters in the advisory and the release notes, unless you prefer to stay anonymous.

## Scope

In scope: the source code in this organization's repositories and the packages published from them.

Out of scope here: the hosted Crypto APIs platform (`rest.cryptoapis.io`, `ai.cryptoapis.io`, the
dashboard). Please still report issues you find there through the same channel and we will route
them internally.

## Supported versions

Security fixes go into the **latest release** of each package. Please upgrade to the newest version
before reporting, and check whether the issue still reproduces.

## Security advisories

Published advisories for the MCP servers are listed on
[this repository's advisories page](https://github.com/CryptoAPIs-io/cryptoapis-mcp-hub/security/advisories).

## Acknowledgements

We thank the following people for responsibly reporting security issues:

- **Syed Anas Mohiuddin** ([@SyedAnas01](https://github.com/SyedAnas01)): unauthenticated access to
  the MCP HTTP transport.

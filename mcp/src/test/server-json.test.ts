import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { connectStdio, SPAWN_TEST_TIMEOUT_MS } from "./helpers.js";

const PACKAGE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const packageJson = JSON.parse(readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
const serverJson = JSON.parse(readFileSync(path.join(PACKAGE_ROOT, "server.json"), "utf8"));

test("server.json versions and identifiers line up with package.json", () => {
    assert.equal(serverJson.version, packageJson.version);
    assert.equal(serverJson.packages[0].version, packageJson.version);
    assert.equal(serverJson.packages[0].identifier, packageJson.name);
    assert.equal(packageJson.mcpName, serverJson.name);
});

test("server.json declares the hosted remote with a required, secret x-api-key header", () => {
    const remote = serverJson.remotes.find((r: { type: string }) => r.type === "streamable-http");
    assert.ok(remote, "expected a streamable-http remote");
    assert.equal(remote.url, "https://ai.cryptoapis.io/mcp");
    const header = remote.headers.find((h: { name: string }) => h.name === "x-api-key");
    assert.ok(header, "expected an x-api-key header");
    assert.equal(header.isRequired, true);
    assert.equal(header.isSecret, true);
});

test(
    "the running server reports the umbrella package version, not a copied placeholder",
    { timeout: SPAWN_TEST_TIMEOUT_MS },
    async (t) => {
        const client = await connectStdio(["--api-key", "test-key"], undefined, process.execPath, t.signal);
        try {
            const serverVersion = client.getServerVersion();
            assert.equal(serverVersion?.version, packageJson.version);
        } finally {
            await client.close();
        }
    },
);

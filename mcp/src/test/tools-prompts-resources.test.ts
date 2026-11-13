import { test } from "node:test";
import assert from "node:assert/strict";

import { connectStdio, SPAWN_TEST_TIMEOUT_MS } from "./helpers.js";
import {
    EXPECTED_DESTRUCTIVE_TOOLS,
    EXPECTED_PRODUCT_IDS,
    EXPECTED_PROMPT_NAMES,
    EXPECTED_TOOL_NAMES,
    EXPECTED_WRITE_TOOLS,
} from "./fixtures.js";

test("stdio tools/list matches the 60-name fixture exactly", { timeout: SPAWN_TEST_TIMEOUT_MS }, async (t) => {
    const client = await connectStdio(["--api-key", "test-key"], undefined, process.execPath, t.signal);
    try {
        const { tools } = await client.listTools();
        const names = tools.map((tool) => tool.name).sort();
        assert.deepEqual(names, EXPECTED_TOOL_NAMES);
        assert.ok(
            !names.some((n) => n.startsWith("signer__") || n.startsWith("x402_pay__") || n.startsWith("x402_accept__")),
            "no tool should come from mcp-signer, mcp-x402-pay or mcp-x402-accept",
        );
    } finally {
        await client.close();
    }
});

test("stdio tools/list gives every tool a title and all four annotation hints", { timeout: SPAWN_TEST_TIMEOUT_MS }, async (t) => {
    const client = await connectStdio(["--api-key", "test-key"], undefined, process.execPath, t.signal);
    try {
        const { tools } = await client.listTools();
        assert.equal(tools.length, EXPECTED_TOOL_NAMES.length);
        for (const tool of tools) {
            assert.ok(typeof tool.title === "string" && tool.title.length > 0, `${tool.name} has no title`);
            const a = tool.annotations;
            assert.ok(a, `${tool.name} has no annotations`);
            for (const hint of ["readOnlyHint", "destructiveHint", "idempotentHint", "openWorldHint"] as const) {
                assert.equal(typeof a[hint], "boolean", `${tool.name} is missing ${hint}`);
            }
            const destructive = EXPECTED_DESTRUCTIVE_TOOLS.includes(tool.name);
            const write = EXPECTED_WRITE_TOOLS.includes(tool.name);
            assert.equal(a.destructiveHint, destructive, `${tool.name} destructiveHint`);
            assert.equal(a.readOnlyHint, !destructive && !write, `${tool.name} readOnlyHint`);
            // Only system_info answers from bundled data; every other tool calls the CryptoAPIs API.
            assert.equal(a.openWorldHint, !tool.name.endsWith("__system_info"), `${tool.name} openWorldHint`);
        }
    } finally {
        await client.close();
    }
});

test(
    "prompts/list includes the 14 product prompts and not sign-transaction",
    { timeout: SPAWN_TEST_TIMEOUT_MS },
    async (t) => {
        const client = await connectStdio(["--api-key", "test-key"], undefined, process.execPath, t.signal);
        try {
            const { prompts } = await client.listPrompts();
            const names = prompts.map((p) => p.name).sort();
            for (const expected of EXPECTED_PROMPT_NAMES) {
                assert.ok(names.includes(expected), `expected prompt "${expected}" to be registered`);
            }
            assert.ok(!names.includes("sign-transaction"), "sign-transaction must not be registered (mcp-signer is excluded)");
        } finally {
            await client.close();
        }
    },
);

test(
    "resources/list exposes exactly the 14 expected cryptoapis://<product>/ prefixes",
    { timeout: SPAWN_TEST_TIMEOUT_MS },
    async (t) => {
        const client = await connectStdio(["--api-key", "test-key"], undefined, process.execPath, t.signal);
        try {
            const { resources } = await client.listResources();
            const uris = resources.map((r) => r.uri);
            const prefixes = new Set(
                uris.map((uri) => {
                    const match = /^cryptoapis:\/\/([^/]+)\//.exec(uri);
                    assert.ok(match, `resource uri "${uri}" does not match cryptoapis://<product>/...`);
                    return match[1];
                }),
            );
            assert.deepEqual([...prefixes].sort(), [...EXPECTED_PRODUCT_IDS].sort());
        } finally {
            await client.close();
        }
    },
);

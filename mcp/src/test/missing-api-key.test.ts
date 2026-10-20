import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

import { CLI_PATH, SPAWN_TEST_TIMEOUT_MS } from "./helpers.js";

test(
    "stdio with no --api-key and no CRYPTOAPIS_API_KEY exits non-zero and names the env var",
    { timeout: SPAWN_TEST_TIMEOUT_MS },
    async (t) => {
        const env = { ...process.env };
        delete env.CRYPTOAPIS_API_KEY;
        assert.ok(!("CRYPTOAPIS_API_KEY" in env), "test setup must actually unset CRYPTOAPIS_API_KEY");

        const child = spawn(process.execPath, [CLI_PATH], { env });
        // A regressed CLI that starts an MCP server over stdio reads stdin forever;
        // closing it here means such a regression surfaces as a failed assertion
        // (process never exits, stdout/stderr never match) instead of a hang.
        child.stdin.end();

        // If the regression makes the child hang, the test's own timeout aborts
        // t.signal before the suite ever gets stuck waiting on the "close" event.
        t.signal.addEventListener("abort", () => child.kill());

        let stderr = "";
        child.stderr.on("data", (chunk: Buffer) => {
            stderr += chunk.toString();
        });

        try {
            const exitCode: number = await new Promise((resolve) => {
                child.on("close", (code) => resolve(code ?? -1));
            });

            assert.notEqual(exitCode, 0);
            assert.match(stderr, /CRYPTOAPIS_API_KEY/);
        } finally {
            if (child.exitCode === null && child.signalCode === null) {
                child.kill();
            }
        }
    },
);

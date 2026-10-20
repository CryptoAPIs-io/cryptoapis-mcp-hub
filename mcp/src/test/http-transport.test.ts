import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";

import { CLI_PATH, connectHttp, getFreePort, SPAWN_TEST_TIMEOUT_MS } from "./helpers.js";
import { EXPECTED_TOOL_NAMES } from "./fixtures.js";

async function waitForHealth(url: string, deadline: number, stderr: () => string): Promise<void> {
    while (Date.now() < deadline) {
        try {
            const res = await fetch(url);
            if (res.ok) return;
        } catch {
            // server not listening yet
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error(`timed out waiting for ${url}; stderr so far:\n${stderr()}`);
}

/** Resolves once `child` has exited, resolving immediately if it already has. */
function stop(child: ChildProcess): Promise<void> {
    return new Promise((resolve) => {
        if (child.exitCode !== null || child.signalCode !== null) {
            resolve();
            return;
        }
        child.once("close", () => resolve());
        child.kill();
    });
}

test("http transport serves the same 60 tool names as stdio", { timeout: SPAWN_TEST_TIMEOUT_MS }, async (t) => {
    const port = await getFreePort();
    const child = spawn(process.execPath, [
        CLI_PATH,
        "--transport",
        "http",
        "--host",
        "127.0.0.1",
        "--port",
        String(port),
        "--api-key",
        "test-key",
    ]);
    t.signal.addEventListener("abort", () => child.kill());

    let stderr = "";
    child.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString();
    });

    try {
        await waitForHealth(`http://127.0.0.1:${port}/health`, Date.now() + 10_000, () => stderr);

        const client = await connectHttp(`http://127.0.0.1:${port}/mcp`);
        try {
            const { tools } = await client.listTools();
            const names = tools.map((t) => t.name).sort();
            assert.deepEqual(names, EXPECTED_TOOL_NAMES, `stderr:\n${stderr}`);
        } finally {
            await client.close();
        }
    } finally {
        await stop(child);
    }
});

import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

/** Absolute path to the built bin, i.e. `dist/cli.js` next to this compiled test (`dist/test/*.js`). */
export const CLI_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "cli.js");

/** Shared `node:test` timeout for every test that spawns the built bin as a child process. */
export const SPAWN_TEST_TIMEOUT_MS = 15_000;

/**
 * Connects a fresh SDK client to the built bin over stdio, with the given extra CLI args/env.
 * Pass `command: CLI_PATH` to execute the bin directly (as npx/a global install would), instead
 * of the default `node dist/cli.js`.
 *
 * Pass the test's `t.signal` so that if the test times out, the spawned child is killed
 * synchronously instead of being left running after the runner force-exits.
 */
export async function connectStdio(
    args: string[] = ["--api-key", "test-key"],
    env?: Record<string, string>,
    command: string = process.execPath,
    signal?: AbortSignal,
) {
    const transport = new StdioClientTransport({
        command,
        args: command === process.execPath ? [CLI_PATH, ...args] : args,
        env: env ?? (process.env as Record<string, string>),
    });
    if (signal) {
        signal.addEventListener("abort", () => {
            const pid = transport.pid;
            if (pid) process.kill(pid);
        });
    }
    const client = new Client({ name: "cryptoapis-mcp-test-client", version: "1.0.0" });
    await client.connect(transport);
    return client;
}

/** Finds a free TCP port by letting the OS pick one, then releasing it immediately. */
export async function getFreePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        const server = createServer();
        server.unref();
        server.on("error", reject);
        server.listen(0, "127.0.0.1", () => {
            const address = server.address();
            if (address == null || typeof address === "string") {
                reject(new Error("could not determine a free port"));
                return;
            }
            const { port } = address;
            server.close(() => resolve(port));
        });
    });
}

export async function connectHttp(url: string) {
    const transport = new StreamableHTTPClientTransport(new URL(url));
    const client = new Client({ name: "cryptoapis-mcp-test-client", version: "1.0.0" });
    await client.connect(transport);
    return client;
}

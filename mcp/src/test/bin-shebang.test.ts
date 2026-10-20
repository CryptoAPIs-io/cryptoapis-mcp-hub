import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, chmodSync } from "node:fs";

import { CLI_PATH, connectStdio, SPAWN_TEST_TIMEOUT_MS } from "./helpers.js";
import { EXPECTED_TOOL_NAMES } from "./fixtures.js";

test("dist/cli.js starts with a node shebang so npx/global installs can run it", () => {
    const contents = readFileSync(CLI_PATH, "utf8");
    assert.ok(contents.startsWith("#!/usr/bin/env node\n"), "dist/cli.js must start with '#!/usr/bin/env node\\n'");
});

test(
    "executing the bin directly (as npx would, not via `node <path>`) serves tools/list",
    { timeout: SPAWN_TEST_TIMEOUT_MS },
    async (t) => {
        chmodSync(CLI_PATH, 0o755);

        const client = await connectStdio(["--api-key", "test-key"], undefined, CLI_PATH, t.signal);
        try {
            const { tools } = await client.listTools();
            const names = tools.map((tool) => tool.name).sort();
            assert.deepEqual(names, EXPECTED_TOOL_NAMES);
        } finally {
            await client.close();
        }
    },
);

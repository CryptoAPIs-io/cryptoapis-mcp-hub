import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { CryptoApisHttpClient, formatCreditsForDescription, loadSharedConfig, McpLogger, startHttpServer } from "@cryptoapis-io/mcp-shared";
import { PRODUCTS } from "./products.js";

const PACKAGE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_VERSION: string = JSON.parse(readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8")).version;

const CRYPTOAPIS_SERVER_INFO = {
    name: "cryptoapis-mcp",
    version: PACKAGE_VERSION,
    title: "CryptoAPIs Combined MCP Server",
    websiteUrl: "https://developers.cryptoapis.io",
    icons: [
        { src: "https://cryptoapis.io/cryptoapis/images/logo.svg", mimeType: "image/svg+xml", sizes: ["any"], theme: "light" as const },
        { src: "https://cryptoapis.io/cryptoapis/images/logo-black.svg", mimeType: "image/svg+xml", sizes: ["any"], theme: "dark" as const },
    ],
};

function buildServer(client: CryptoApisHttpClient) {
    const server = new McpServer(CRYPTOAPIS_SERVER_INFO);
    const logger = new McpLogger((params) => server.sendLoggingMessage(params), CRYPTOAPIS_SERVER_INFO.name);

    for (const p of PRODUCTS) {
        for (const t of p.tools) {
            const name = `${p.prefix}__${t.name}`;
            const description =
                t.credits != null ? `${t.description}\n\n${formatCreditsForDescription(t.credits)}` : t.description;
            server.registerTool(name, { description, inputSchema: t.inputSchema }, (input: Record<string, unknown>) => {
                logger.logDebug({ tool: name, event: "tool_call", input });
                return t.handler(client, logger)(input as never).catch((err: unknown) => {
                    logger.logError(err instanceof Error ? err.message : String(err), {
                        tool: name,
                        action: input.action,
                        blockchain: input.blockchain,
                        network: input.network,
                    });
                    throw err;
                });
            });
        }

        p.registerResources(server);
        p.registerPrompts(server);
    }

    return { server, logger };
}

export type StartOptions =
    | { transport: "stdio"; apiKey?: string }
    | {
          transport: "http";
          host?: string;
          port?: number;
          path?: string;
          stateless?: boolean;
          apiKey?: string;
          authToken?: string;
          allowedHosts?: string[];
      };

export async function startCombinedServer(opts: StartOptions) {
    const isHttp = opts.transport === "http";
    const cfg = loadSharedConfig({ apiKey: opts.apiKey, allowMissingApiKey: isHttp });
    const client = new CryptoApisHttpClient(cfg);
    if (opts.transport === "stdio") {
        const { server, logger } = buildServer(client);
        const transport = new StdioServerTransport();
        await server.connect(transport);
        logger.logInfo("cryptoapis-mcp MCP running (stdio)");
        return;
    }

    await startHttpServer({
        name: CRYPTOAPIS_SERVER_INFO.name,
        createServer: () => buildServer(client).server,
        startupApiKey: cfg.apiKey,
        host: opts.host,
        port: opts.port,
        path: opts.path,
        stateless: opts.stateless,
        authToken: opts.authToken,
        allowedHosts: opts.allowedHosts,
    });
}

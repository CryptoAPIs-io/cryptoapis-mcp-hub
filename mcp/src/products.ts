import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CryptoApisHttpClient, McpLogger, ToolCredits } from "@cryptoapis-io/mcp-shared";
import type { ZodTypeAny } from "zod";

import { tools as addressHistoryTools } from "@cryptoapis-io/mcp-address-history/dist/tools/index.js";
import { registerPrompts as registerAddressHistoryPrompts } from "@cryptoapis-io/mcp-address-history/dist/prompts/index.js";
import { registerResources as registerAddressHistoryResources } from "@cryptoapis-io/mcp-address-history/dist/resources/index.js";

import { tools as addressLatestTools } from "@cryptoapis-io/mcp-address-latest/dist/tools/index.js";
import { registerPrompts as registerAddressLatestPrompts } from "@cryptoapis-io/mcp-address-latest/dist/prompts/index.js";
import { registerResources as registerAddressLatestResources } from "@cryptoapis-io/mcp-address-latest/dist/resources/index.js";

import { tools as amlTools } from "@cryptoapis-io/mcp-aml/dist/tools/index.js";
import { registerPrompts as registerAmlPrompts } from "@cryptoapis-io/mcp-aml/dist/prompts/index.js";
import { registerResources as registerAmlResources } from "@cryptoapis-io/mcp-aml/dist/resources/index.js";

import { tools as blockDataTools } from "@cryptoapis-io/mcp-block-data/dist/tools/index.js";
import { registerPrompts as registerBlockDataPrompts } from "@cryptoapis-io/mcp-block-data/dist/prompts/index.js";
import { registerResources as registerBlockDataResources } from "@cryptoapis-io/mcp-block-data/dist/resources/index.js";

import { tools as blockchainEventsTools } from "@cryptoapis-io/mcp-blockchain-events/dist/tools/index.js";
import { registerPrompts as registerBlockchainEventsPrompts } from "@cryptoapis-io/mcp-blockchain-events/dist/prompts/index.js";
import { registerResources as registerBlockchainEventsResources } from "@cryptoapis-io/mcp-blockchain-events/dist/resources/index.js";

import { tools as blockchainFeesTools } from "@cryptoapis-io/mcp-blockchain-fees/dist/tools/index.js";
import { registerPrompts as registerBlockchainFeesPrompts } from "@cryptoapis-io/mcp-blockchain-fees/dist/prompts/index.js";
import { registerResources as registerBlockchainFeesResources } from "@cryptoapis-io/mcp-blockchain-fees/dist/resources/index.js";

import { tools as broadcastTools } from "@cryptoapis-io/mcp-broadcast/dist/tools/index.js";
import { registerPrompts as registerBroadcastPrompts } from "@cryptoapis-io/mcp-broadcast/dist/prompts/index.js";
import { registerResources as registerBroadcastResources } from "@cryptoapis-io/mcp-broadcast/dist/resources/index.js";

import { tools as contractsTools } from "@cryptoapis-io/mcp-contracts/dist/tools/index.js";
import { registerPrompts as registerContractsPrompts } from "@cryptoapis-io/mcp-contracts/dist/prompts/index.js";
import { registerResources as registerContractsResources } from "@cryptoapis-io/mcp-contracts/dist/resources/index.js";

import { tools as hdWalletTools } from "@cryptoapis-io/mcp-hd-wallet/dist/tools/index.js";
import { registerPrompts as registerHdWalletPrompts } from "@cryptoapis-io/mcp-hd-wallet/dist/prompts/index.js";
import { registerResources as registerHdWalletResources } from "@cryptoapis-io/mcp-hd-wallet/dist/resources/index.js";

import { tools as marketDataTools } from "@cryptoapis-io/mcp-market-data/dist/tools/index.js";
import { registerPrompts as registerMarketDataPrompts } from "@cryptoapis-io/mcp-market-data/dist/prompts/index.js";
import { registerResources as registerMarketDataResources } from "@cryptoapis-io/mcp-market-data/dist/resources/index.js";

import { tools as prepareTransactionsTools } from "@cryptoapis-io/mcp-prepare-transactions/dist/tools/index.js";
import { registerPrompts as registerPrepareTransactionsPrompts } from "@cryptoapis-io/mcp-prepare-transactions/dist/prompts/index.js";
import { registerResources as registerPrepareTransactionsResources } from "@cryptoapis-io/mcp-prepare-transactions/dist/resources/index.js";

import { tools as simulateTools } from "@cryptoapis-io/mcp-simulate/dist/tools/index.js";
import { registerPrompts as registerSimulatePrompts } from "@cryptoapis-io/mcp-simulate/dist/prompts/index.js";
import { registerResources as registerSimulateResources } from "@cryptoapis-io/mcp-simulate/dist/resources/index.js";

import { tools as transactionsDataTools } from "@cryptoapis-io/mcp-transactions-data/dist/tools/index.js";
import { registerPrompts as registerTransactionsDataPrompts } from "@cryptoapis-io/mcp-transactions-data/dist/prompts/index.js";
import { registerResources as registerTransactionsDataResources } from "@cryptoapis-io/mcp-transactions-data/dist/resources/index.js";

import { tools as utilsTools } from "@cryptoapis-io/mcp-utils/dist/tools/index.js";
import { registerPrompts as registerUtilsPrompts } from "@cryptoapis-io/mcp-utils/dist/prompts/index.js";
import { registerResources as registerUtilsResources } from "@cryptoapis-io/mcp-utils/dist/resources/index.js";

/** Structural shape shared by every product's exported `McpToolDef<TSchema>`. */
export type CombinedTool = {
    name: string;
    description: string;
    credits?: ToolCredits;
    inputSchema: ZodTypeAny;
    handler: (
        client: CryptoApisHttpClient,
        logger: McpLogger,
    ) => (input: never) => Promise<{ content: { type: "text"; text: string }[] }>;
};

export type Product = {
    /** Hyphenated product id, e.g. "address-history" — also the resource URI prefix the product already uses. */
    id: string;
    /** Tool name prefix, e.g. "address_history" (hyphens to underscores), joined to each tool name with "__". */
    prefix: string;
    tools: readonly CombinedTool[];
    registerPrompts: (server: McpServer) => void;
    registerResources: (server: McpServer) => void;
};

function product(
    id: string,
    tools: readonly CombinedTool[],
    registerPrompts: (server: McpServer) => void,
    registerResources: (server: McpServer) => void,
): Product {
    return { id, prefix: id.replace(/-/g, "_"), tools, registerPrompts, registerResources };
}

/**
 * Single source of truth for the combined server: the 14 products the hosted
 * https://ai.cryptoapis.io/mcp serves, in the same order. Drives tool registration
 * (name `<prefix>__<tool.name>`), prompts and resources alike — NOT mcp-signer,
 * mcp-x402-pay or mcp-x402-accept.
 */
export const PRODUCTS: readonly Product[] = [
    product("address-history", addressHistoryTools, registerAddressHistoryPrompts, registerAddressHistoryResources),
    product("address-latest", addressLatestTools, registerAddressLatestPrompts, registerAddressLatestResources),
    product("aml", amlTools, registerAmlPrompts, registerAmlResources),
    product("block-data", blockDataTools, registerBlockDataPrompts, registerBlockDataResources),
    product("blockchain-events", blockchainEventsTools, registerBlockchainEventsPrompts, registerBlockchainEventsResources),
    product("blockchain-fees", blockchainFeesTools, registerBlockchainFeesPrompts, registerBlockchainFeesResources),
    product("broadcast", broadcastTools, registerBroadcastPrompts, registerBroadcastResources),
    product("contracts", contractsTools, registerContractsPrompts, registerContractsResources),
    product("hd-wallet", hdWalletTools, registerHdWalletPrompts, registerHdWalletResources),
    product("market-data", marketDataTools, registerMarketDataPrompts, registerMarketDataResources),
    product(
        "prepare-transactions",
        prepareTransactionsTools,
        registerPrepareTransactionsPrompts,
        registerPrepareTransactionsResources,
    ),
    product("simulate", simulateTools, registerSimulatePrompts, registerSimulateResources),
    product("transactions-data", transactionsDataTools, registerTransactionsDataPrompts, registerTransactionsDataResources),
    product("utils", utilsTools, registerUtilsPrompts, registerUtilsResources),
] as const;

import { Client } from "@modelcontextprotocol/sdk/client";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const server = new McpServer({
  name: "My MCP Server",
  description: "An example MCP server implemented in TypeScript",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
});

export const clientMcp = new Client(
  {
    name: "My MCP Client",
    version: "1.0.0",
  },
  {
    capabilities: {
      sampling: {},
    },
  }
);

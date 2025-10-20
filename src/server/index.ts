import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "../config/mcp";
import "./tools";
import "./resources";
import "./prompts";
import "./sampling";

// The main function initializes and connects the MCP (Model Context Protocol) server.
async function main() {
  // Create a transport instance that defines how the server will communicate
  // with the client or calling process.
  //
  // 🔹 StdioServerTransport:
  //     Uses standard input (stdin) and output (stdout) for communication.
  //     This is common for command-line tools, local integrations, and
  //     language servers (e.g., LSP-style communication).
  //
  // Other possible transport types (depending on implementation):
  //
  // 🔹 WebSocketTransport:
  //     Uses WebSocket protocol for real-time, bidirectional communication.
  //     Ideal for browser-based clients or remote connections.
  //
  // 🔹 HttpTransport:
  //     Communicates over HTTP using request/response cycles.
  //     Useful for RESTful or stateless server setups.
  //
  // 🔹 CustomTransport:
  //     A user-defined transport layer that can use other communication
  //     channels such as TCP sockets, message queues, or any proprietary medium.
  //
  // In this example, we use StdioServerTransport for simplicity.
  const transport = new StdioServerTransport();

  // Connect the MCP server instance to the selected transport.
  // This establishes the communication channel and starts listening
  // for incoming requests and sending responses through the chosen transport.
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error starting MCP server:", error);
  process.exit(1);
});

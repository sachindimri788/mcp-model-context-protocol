import { server } from "../config/mcp";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

// A resource provides data or context the model can read. It represents static information, like a file, record, or dataset.
server.resource(
  "users",
  "users://all",
  {
    description: "Retrieve all users from the database",
    title: "users",
    mimeType: "application/json",
  },
  async (uri) => {
    const users = await import("../data/user.json", {
      with: { type: "json" },
    }).then((m) => m.default);

    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(users),
          mimeType: "application/json",
        },
      ],
    };
  }
);

server.resource(
  "user-details",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  {
    description: "Get a user's details from teh database",
    title: "User Details",
    mimeType: "application/json",
  },
  async (uri, { userId }) => {
    const users = await import("../data/user.json", {
      with: { type: "json" },
    }).then((m) => m.default);
    const user = users.find((u) => u.id === parseInt(userId as string));

    if (user == null) {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify({ error: "User not found" }),
            mimeType: "application/json",
          },
        ],
      };
    }

    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(user),
          mimeType: "application/json",
        },
      ],
    };
  }
);

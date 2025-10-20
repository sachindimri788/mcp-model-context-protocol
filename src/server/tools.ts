import z from "zod";
import fs from "fs/promises";
import server from "../config/mcp";

// A tool lets the model perform real actions or execute code. It represents functions or APIs the model can call to affect the world.
server.tool(
  "create-user",
  "Create a new user in the system",
  {
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    phone: z.string(),
  },
  {
    title: "Create User Tool",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
    description: "Tool to create a new user with provided details",
  },
  async (params) => {
    try {
      const id = await createUser(params);
      return {
        content: [{ type: "text", text: `User created with ID: ${id}` }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error creating user` }],
      };
    }
  }
);

export async function createUser(user: {
  name: string;
  email: string;
  address: string;
  phone: string;
}) {
  const users = await import("../data/user.json", {
    with: { type: "json" },
  }).then((m) => m.default);
  const id = users.length + 1;
  users.push({ id, ...user });
  await fs.writeFile("./src/data/user.json", JSON.stringify(users, null, 2));
  return id;
}

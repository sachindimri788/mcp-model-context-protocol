import z from "zod";
import server from "../config/mcp";
import { text } from "stream/consumers";

// A prompt defines what the model should do or generate. It acts as the instruction or question given to the model.
server.prompt(
  "generate-fake-user",
  "generate a fake user based on a given name",
  {
    name: z.string(),
  },
  ({ name }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Generate a fake user profile for a person named ${name}. Include details such as age, email, address, and phone number.`,
          },
        },
      ],
    };
  }
);

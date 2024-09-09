import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();
    const prompt = `write me a feedback for a person based on keywords ${keyword} or "${keyword}"`;
    // console.log(prompt);
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt,
    });
    console.log("generated text:", text);
    return Response.json(
      {
        data: text,
        success: true,
        message: "successfully generated",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("problem while genrating message", error);
    return Response.json(
      {
        success: false,
        message: "failed",
      },
      { status: 500 }
    );
  }
}

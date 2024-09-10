import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { AxiosError } from "axios";

export async function POST(req: Request) {
  try {
    // console.log(req);
    const { keyword } = await req.json();
    const prompt = `write me a feedback for a person based on keywords ${keyword} or "${keyword}"`;
    // console.log(prompt);
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt,
    });
    // console.log("generated text:", text);
    return Response.json(
      {
        data: text,
        success: true,
        message: "successfully generated",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Safely extract reason and handle the error
    const errorMessage =
      (error as any)?.reason || (error as any)?.message || "Unknown error";
    console.log("Error:", errorMessage);

    return Response.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

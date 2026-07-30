import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export function getLLM() {
  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
    temperature: Number(process.env.LLM_TEMPERATURE ?? 0),
  });
}
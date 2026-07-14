import { ChatOpenAI } from "@langchain/openai";

export function getLLM() {
  return new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.LLM_MODEL || "gpt-4o",
    temperature: Number(process.env.LLM_TEMPERATURE ?? 0),
  });
}

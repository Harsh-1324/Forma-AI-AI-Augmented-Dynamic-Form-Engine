import { HumanMessage } from "@langchain/core/messages";
import { getLLM } from "./llmClient.js";
import { buildFormGeneratorPrompt } from "./prompts/formGenerator.prompt.js";

// "AI Form Generator" — an admin describes a form in plain English and
// gets back a ready-to-save FormSchema document (Forma AI 2.0 feature).
export async function generateFormSchema(description) {
  const llm = getLLM();
  const response = await llm.invoke([new HumanMessage(buildFormGeneratorPrompt(description))]);

  const raw = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw Object.assign(new Error("AI returned an invalid schema — try rephrasing the description."), {
      status: 422,
    });
  }
}

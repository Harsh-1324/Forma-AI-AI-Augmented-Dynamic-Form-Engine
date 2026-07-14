import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getLLM } from "./llmClient.js";

// "AI Chat Assistant" — lightweight, stateless per-request helper that
// answers a user's question about the form they're currently filling
// (e.g. "what counts as a windshield claim?"), grounded in the schema
// so it doesn't invent fields that don't exist.
export async function askFormAssistant({ schema, question, currentData }) {
  const fieldSummary = (schema.sections || [])
    .flatMap((s) => s.fields || [])
    .map((f) => `- ${f.key}: ${f.label} (${f.type}${f.required ? ", required" : ""})`)
    .join("\n");

  const system = `You are a helpful assistant embedded in a "${schema.name}" form.
Only answer questions about this form and its fields — do not give legal,
financial, or medical advice. Keep answers under 3 sentences.

Form fields:
${fieldSummary}

Current answers so far:
${JSON.stringify(currentData || {})}`;

  const llm = getLLM();
  const response = await llm.invoke([new SystemMessage(system), new HumanMessage(question)]);

  return typeof response.content === "string" ? response.content : JSON.stringify(response.content);
}

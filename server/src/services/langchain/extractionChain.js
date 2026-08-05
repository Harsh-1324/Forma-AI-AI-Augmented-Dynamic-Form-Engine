import { HumanMessage } from "@langchain/core/messages";
import { getLLM } from "./llmClient.js";
import { schemaToFieldSpec, buildFieldSpecDescription } from "./schemaToPrompt.js";
import { buildClaimExtractionPrompt } from "./prompts/claimExtraction.prompt.js";

// Runs the LangChain extraction process using Gemini to extract key fields from unstructured text
export async function runExtractionChain({ schema, text }) {
  const fieldSpec = schemaToFieldSpec(schema);
  const fieldSpecDescription = buildFieldSpecDescription(fieldSpec);
  const prompt = buildClaimExtractionPrompt({ fieldSpecDescription, userText: text });

  const llm = getLLM();
  const response = await llm.invoke([new HumanMessage(prompt)]);

  const raw = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
  const parsed = safeParseJson(raw);

  // Drop any keys the LLM invented that aren't in the actual schema.
  const allowedKeys = new Set(fieldSpec.map((f) => f.key));
  const fields = Object.fromEntries(
    Object.entries(parsed.fields || {}).filter(([key]) => allowedKeys.has(key))
  );

  return {
    fields,
    lowConfidenceFields: (parsed.lowConfidenceFields || []).filter((k) => allowedKeys.has(k)),
    model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
  };
}

function safeParseJson(text) {
  try {
    // strip markdown code fences if the model added them anyway
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { fields: {}, lowConfidenceFields: [] };
  }
}

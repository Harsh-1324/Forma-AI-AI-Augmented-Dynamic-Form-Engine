import { HumanMessage } from "@langchain/core/messages";
import { getLLM } from "../langchain/llmClient.js";
import { schemaToFieldSpec, buildFieldSpecDescription } from "../langchain/schemaToPrompt.js";

function safeParseJson(text, fallback) {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
}

function buildValidationPrompt({ fieldSpecDescription, data }) {
  return `You are a strict data-quality reviewer for a form submission.

Given the field definitions and the currently filled-in values, check for:
- Logical inconsistencies between fields (e.g. "damageArea: windshield" but "incidentType: theft")
- Implausible or malformed values for the field's type
- Values that look like placeholder/test data (e.g. "asdf", "test", "123")

Fields:
${fieldSpecDescription}

Current data:
${JSON.stringify(data || {})}

Respond with ONLY a JSON object of this shape:
{
  "valid": true | false,
  "issues": [
    { "field": "<fieldKey>", "message": "<short explanation>", "severity": "low" | "medium" | "high" }
  ]
}

If everything looks consistent, return "valid": true and an empty issues array.`;
}

function buildSuggestionsPrompt({ fieldSpecDescription, data }) {
  return `You are a helpful form-completion assistant.

Given the field definitions and the values filled in so far, suggest
improvements ONLY for fields that are empty, vague, or could be more
specific. Do not suggest changes to fields that are already clear.

Fields:
${fieldSpecDescription}

Current data:
${JSON.stringify(data || {})}

Respond with ONLY a JSON object of this shape:
{
  "suggestions": [
    { "field": "<fieldKey>", "suggestion": "<value or improvement>", "reason": "<short why>" }
  ]
}

If nothing needs improvement, return an empty suggestions array.`;
}

// "AI Validation" — flags logical inconsistencies, implausible values,
// or placeholder junk in a submission before it goes to a human reviewer.
export async function runValidationChain({ schema, data }) {
  const fieldSpec = schemaToFieldSpec(schema);
  const fieldSpecDescription = buildFieldSpecDescription(fieldSpec);
  const prompt = buildValidationPrompt({ fieldSpecDescription, data });

  const llm = getLLM();
  const response = await llm.invoke([new HumanMessage(prompt)]);
  const raw = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
  const parsed = safeParseJson(raw, { valid: true, issues: [] });

  const allowedKeys = new Set(fieldSpec.map((f) => f.key));
  const issues = (parsed.issues || []).filter((i) => allowedKeys.has(i.field));

  return { valid: issues.length === 0, issues };
}

// "AI Suggestions" — proposes completions/improvements for empty or
// vague fields, without touching fields that are already well-filled.
export async function runSuggestionsChain({ schema, data }) {
  const fieldSpec = schemaToFieldSpec(schema);
  const fieldSpecDescription = buildFieldSpecDescription(fieldSpec);
  const prompt = buildSuggestionsPrompt({ fieldSpecDescription, data });

  const llm = getLLM();
  const response = await llm.invoke([new HumanMessage(prompt)]);
  const raw = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
  const parsed = safeParseJson(raw, { suggestions: [] });

  const allowedKeys = new Set(fieldSpec.map((f) => f.key));
  const suggestions = (parsed.suggestions || []).filter((s) => allowedKeys.has(s.field));

  return { suggestions };
}
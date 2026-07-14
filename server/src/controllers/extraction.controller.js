import FormSchema from "../models/FormSchema.model.js";
import { runExtractionChain } from "../services/langchain/extractionChain.js";

// POST /api/extract  { formSchemaId, text }
// Parses a free-text "story" into the strict field shape defined by
// the target form's MongoDB schema, and flags low-confidence fields.
export async function extractFromText(req, res, next) {
  try {
    const { formSchemaId, text } = req.body;
    if (!text) return res.status(400).json({ message: "text is required" });

    const schema = await FormSchema.findById(formSchemaId);
    if (!schema) return res.status(404).json({ message: "Form schema not found" });

    const result = await runExtractionChain({ schema, text });

    res.json({
      extractedFields: result.fields,
      lowConfidenceFields: result.lowConfidenceFields,
      model: result.model,
    });
  } catch (err) {
    next(err);
  }
}

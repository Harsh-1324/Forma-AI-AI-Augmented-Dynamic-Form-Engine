import { generateFormSchema } from "../services/langchain/formGeneratorChain.js";
import FormSchema from "../models/FormSchema.model.js";

// POST /api/ai/generate-form { description, save?: boolean }
// Returns a draft schema; only persists to Mongo if save=true, so admins
// can preview/edit before committing it as a real form type.
export async function generateForm(req, res, next) {
  try {
    const { description, save = false } = req.body;
    if (!description) return res.status(400).json({ message: "description is required" });

    const draftSchema = await generateFormSchema(description);

    if (save) {
      const saved = await FormSchema.create(draftSchema);
      return res.status(201).json(saved);
    }

    res.json(draftSchema);
  } catch (err) {
    next(err);
  }
}

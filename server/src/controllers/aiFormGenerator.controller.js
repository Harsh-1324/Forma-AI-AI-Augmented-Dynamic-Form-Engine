import { generateFormSchema } from "../services/langchain/formGeneratorChain.js";
import prisma from "../config/prisma.js";

// POST /api/ai/generate-form { description, save?: boolean }
// Returns a draft schema; only persists if save=true, so admins
// can preview/edit before committing it as a real form type.
export async function generateForm(req, res, next) {
  try {
    const { description, save = false } = req.body;
    if (!description) return res.status(400).json({ message: "description is required" });

    const draftSchema = await generateFormSchema(description);

    if (save) {
      const saved = await prisma.formSchema.create({
        data: {
          name: draftSchema.name,
          version: draftSchema.version || 1,
          description: draftSchema.description,
          isActive: draftSchema.isActive ?? true,
          sections: {
            create: (draftSchema.sections || []).map((section) => ({
              key: section.key,
              title: section.title,
              showIfField: section.showIf?.field || null,
              showIfOperator: section.showIf?.operator || null,
              showIfValue: section.showIf?.value || null,
              fields: {
                create: (section.fields || []).map((field) => ({
                  key: field.key,
                  label: field.label,
                  type: field.type,
                  required: field.required ?? false,
                  validationRegex: field.validationRegex || null,
                  validationMessage: field.validationMessage || null,
                  aiExtractable: field.aiExtractable ?? true,
                  showIfField: field.showIf?.field || null,
                  showIfOperator: field.showIf?.operator || null,
                  showIfValue: field.showIf?.value || null,
                  options: field.options || null,
                })),
              },
            })),
          },
        },
        include: {
          sections: {
            include: {
              fields: true,
            },
          },
        },
      });
      return res.status(201).json(saved);
    }

    res.json(draftSchema);
  } catch (err) {
    next(err);
  }
}

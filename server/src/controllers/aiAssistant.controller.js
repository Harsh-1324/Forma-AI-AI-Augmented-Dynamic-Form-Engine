import prisma from "../config/prisma.js";
import { askFormAssistant } from "../services/langchain/formAssistantChain.js";

// POST /api/ai/assistant { formSchemaId, question, currentData }
export async function askAssistant(req, res, next) {
  try {
    const { formSchemaId, question, currentData } = req.body;
    if (!question) return res.status(400).json({ message: "question is required" });

    const schema = await prisma.formSchema.findUnique({
      where: { id: formSchemaId },
      include: {
        sections: {
          include: {
            fields: true,
          },
        },
      },
    });

    if (!schema) return res.status(404).json({ message: "Form schema not found" });

    const answer = await askFormAssistant({ schema, question, currentData });
    res.json({ answer });
  } catch (err) {
    next(err);
  }
}

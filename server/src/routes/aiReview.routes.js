import { Router } from "express";
import prisma from "../config/prisma.js"; // ⚠️ adjust to match your friend's actual Prisma client file/path
import { runValidationChain, runSuggestionsChain } from "../services/ai/aiReview.service.js";

const router = Router();

async function loadSchemaWithFields(formSchemaId) {
  return prisma.formSchema.findUnique({
    where: { id: formSchemaId },
    include: { sections: { include: { fields: true } } },
  });
}

// POST /api/ai/validate { formSchemaId, data }
router.post("/validate", async (req, res, next) => {
  try {
    const { formSchemaId, data } = req.body;
    if (!formSchemaId || !data) {
      return res.status(400).json({ message: "formSchemaId and data are required" });
    }
    const schema = await loadSchemaWithFields(formSchemaId);
    if (!schema) return res.status(404).json({ message: "Form schema not found" });

    res.json(await runValidationChain({ schema, data }));
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/suggest { formSchemaId, data }
router.post("/suggest", async (req, res, next) => {
  try {
    const { formSchemaId, data } = req.body;
    if (!formSchemaId || !data) {
      return res.status(400).json({ message: "formSchemaId and data are required" });
    }
    const schema = await loadSchemaWithFields(formSchemaId);
    if (!schema) return res.status(404).json({ message: "Form schema not found" });

    res.json(await runSuggestionsChain({ schema, data }));
  } catch (err) {
    next(err);
  }
});

export default router;
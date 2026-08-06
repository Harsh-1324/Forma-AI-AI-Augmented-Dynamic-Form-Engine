import prisma from "../config/prisma.js";

export async function mergeAiExtractionIntoSubmission(submissionId, extraction) {
  return prisma.formSubmission.update({
    where: { id: submissionId },
    data: {
      aiExtractedFields: extraction.fields || {},
      aiLowConfidenceFields: extraction.lowConfidenceFields || [],
      aiModel: extraction.model || null,
      aiExtractedAt: new Date(),
      // Pre-fill submission.data with the AI's best-guess field values;
      // the frontend still lets the user review/edit before submit
      data: extraction.fields || {},
    },
  });
}

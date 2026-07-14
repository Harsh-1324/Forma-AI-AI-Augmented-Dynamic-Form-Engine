import FormSubmission from "../models/FormSubmission.model.js";

export async function mergeAiExtractionIntoSubmission(submissionId, extraction) {
  return FormSubmission.findByIdAndUpdate(
    submissionId,
    {
      $set: {
        aiExtraction: {
          ...extraction,
          extractedAt: new Date(),
        },
        // pre-fill submission.data with the AI's best-guess field values;
        // the frontend still lets the user review/edit before submit
        data: extraction.fields,
      },
    },
    { new: true }
  );
}

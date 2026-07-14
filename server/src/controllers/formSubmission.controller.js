import FormSubmission from "../models/FormSubmission.model.js";
import FormSchema from "../models/FormSchema.model.js";
import { validateAgainstSchema } from "../services/formEngine/schemaValidator.js";

export async function createSubmission(req, res, next) {
  try {
    const { formSchemaId, userId } = req.body;
    const schemaExists = await FormSchema.exists({ _id: formSchemaId });
    if (!schemaExists) return res.status(404).json({ message: "Form schema not found" });

    const submission = await FormSubmission.create({ formSchemaId, userId, data: {} });
    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
}

export async function getSubmission(req, res, next) {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

// Autosave partial state as the user fills the form (Week 4)
export async function saveSubmissionProgress(req, res, next) {
  try {
    const { data } = req.body;
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { $set: { data, status: "draft" } },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

export async function finalizeSubmission(req, res, next) {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    const schema = await FormSchema.findById(submission.formSchemaId);
    const { valid, errors } = validateAgainstSchema(schema, submission.data);
    if (!valid) return res.status(400).json({ message: "Validation failed", errors });

    submission.status = "submitted";
    await submission.save();
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

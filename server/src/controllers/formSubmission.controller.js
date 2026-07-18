import prisma from "../config/prisma.js";
import { validateAgainstSchema } from "../services/formEngine/schemaValidator.js";

export async function createSubmission(req, res, next) {
  try {
    const { formSchemaId, userId } = req.body;

    const schemaExists = await prisma.formSchema.findUnique({
      where: {
        id: formSchemaId,
      },
    });

    if (!schemaExists) {
      return res.status(404).json({
        message: "Form schema not found",
      });
    }

    const submission = await prisma.formSubmission.create({
      data: {
        formSchemaId,
        userId,
        data: {},
      },
    });

    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
}

export async function getSubmission(req, res, next) {
  try {
    const submission = await prisma.formSubmission.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    res.json(submission);
  } catch (err) {
    next(err);
  }
}

// Autosave partial state as the user fills the form (Week 4)
export async function saveSubmissionProgress(req, res, next) {
  try {
    const { data } = req.body;

    const submission = await prisma.formSubmission.update({
      where: {
        id: req.params.id,
      },
      data: {
        data,
        status: "draft",
      },
    });

    res.json(submission);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    next(err);
  }
}

export async function finalizeSubmission(req, res, next) {
  try {
    const submission = await prisma.formSubmission.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    const schema = await prisma.formSchema.findUnique({
      where: {
        id: submission.formSchemaId,
      },
      include: {
        sections: {
          include: {
            fields: true,
          },
        },
      },
    });

    if (!schema) {
      return res.status(404).json({
        message: "Form schema not found",
      });
    }

    const { valid, errors } = validateAgainstSchema(schema, submission.data);

    if (!valid) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    const updatedSubmission = await prisma.formSubmission.update({
      where: {
        id: req.params.id,
      },
      data: {
        status: "submitted",
      },
    });

    res.json(updatedSubmission);
  } catch (err) {
    next(err);
  }
}

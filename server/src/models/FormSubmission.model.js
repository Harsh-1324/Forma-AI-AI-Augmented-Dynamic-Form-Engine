import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema(
  {
    formSchemaId: { type: mongoose.Schema.Types.ObjectId, ref: "FormSchema", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["draft", "in_review", "submitted"],
      default: "draft",
    },
    data: { type: mongoose.Schema.Types.Mixed, default: {} }, // flat key/value of field answers
    aiExtraction: {
      rawText: String,                 // the original "story" the user typed
      extractedFields: mongoose.Schema.Types.Mixed, // what the LLM returned
      lowConfidenceFields: [String],   // fields flagged for human review
      model: String,
      extractedAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FormSubmission", FormSubmissionSchema);

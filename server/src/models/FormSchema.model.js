import mongoose from "mongoose";

/**
 * A single field within a dynamic form.
 * "showIf" encodes branching logic, e.g.:
 *   { field: "incidentType", operator: "equals", value: "animal_collision" }
 */
const FieldSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },        // e.g. "vehicleMake"
    label: { type: String, required: true },       // e.g. "Vehicle Make"
    type: {
      type: String,
      enum: ["text", "number", "date", "dropdown", "checkbox", "textarea", "radio"],
      required: true,
    },
    options: [{ label: String, value: String }],   // for dropdown/radio/checkbox
    required: { type: Boolean, default: false },
    validationRegex: { type: String },              // stringified regex, e.g. "^[A-Za-z ]+$"
    validationMessage: { type: String },
    aiExtractable: { type: Boolean, default: true }, // can the LLM populate this field?
    showIf: {
      field: { type: String },
      operator: {
        type: String,
        enum: ["equals", "notEquals", "in", "exists"],
      },
      value: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);

const SectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    title: { type: String, required: true },
    fields: [FieldSchema],
    showIf: {
      field: { type: String },
      operator: { type: String, enum: ["equals", "notEquals", "in", "exists"] },
      value: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);

const FormSchemaDefinition = new mongoose.Schema(
  {
    name: { type: String, required: true },         // e.g. "auto_insurance_claim"
    version: { type: Number, default: 1 },
    description: String,
    sections: [SectionSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("FormSchema", FormSchemaDefinition);

import { getVisibleFields } from "./conditionEvaluator.js";

// Validates submitted form data against only the fields that are
// currently *visible* per the branching rules — required/regex checks
// on hidden fields are skipped.
export function validateAgainstSchema(schema, data) {
  const errors = {};
  const visibleFields = getVisibleFields(schema, data);

  for (const field of visibleFields) {
    const value = data?.[field.key];

    if (field.required && (value === undefined || value === null || value === "")) {
      errors[field.key] = field.validationMessage || `${field.label} is required`;
      continue;
    }

    if (field.validationRegex && value) {
      const regex = new RegExp(field.validationRegex);
      if (!regex.test(String(value))) {
        errors[field.key] = field.validationMessage || `${field.label} is invalid`;
      }
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

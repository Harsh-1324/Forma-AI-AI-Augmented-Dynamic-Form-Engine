// Optional second-pass prompt: normalizes free-form extracted values
// (e.g. "Honda" -> exact dropdown option "honda") against a field's
// allowed options list, used when the first-pass extraction returns
// a value not present in the schema's enum.
export function buildFieldMappingPrompt({ fieldKey, allowedValues, rawValue }) {
  return `Map the extracted value to the closest allowed option.

Field: ${fieldKey}
Allowed values: ${allowedValues.join(", ")}
Extracted value: "${rawValue}"

Respond with ONLY the single best matching allowed value, or "null" if none fit.`;
}

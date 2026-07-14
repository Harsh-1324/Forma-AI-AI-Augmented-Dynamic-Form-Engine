// Applies { fieldKey: value } from the extraction API into RHF's
// setValue, and returns the set of keys flagged as low-confidence so
// the UI can highlight them for human review.
export function mergeAIResultIntoForm({ extractedFields, lowConfidenceFields, setValue }) {
  Object.entries(extractedFields || {}).forEach(([key, value]) => {
    setValue(key, value, { shouldValidate: true, shouldDirty: true });
  });
  return new Set(lowConfidenceFields || []);
}

import { create } from "zustand";

// Holds the currently-loaded schema, submission id, and the set of
// field keys AI flagged as low-confidence (for the review banner/highlight).
export const useFormStore = create((set) => ({
  schema: null,
  submissionId: null,
  lowConfidenceFields: new Set(),

  setSchema: (schema) => set({ schema }),
  setSubmissionId: (submissionId) => set({ submissionId }),
  setLowConfidenceFields: (fields) => set({ lowConfidenceFields: new Set(fields) }),
  clearLowConfidence: () => set({ lowConfidenceFields: new Set() }),
  reset: () => set({ schema: null, submissionId: null, lowConfidenceFields: new Set() }),
}));

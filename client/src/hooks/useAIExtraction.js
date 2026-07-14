import { useCallback } from "react";
import { ExtractionAPI } from "../services/api.js";
import { useAIStore } from "../store/useAIStore.js";
import { mergeAIResultIntoForm } from "../utils/mergeAIResultIntoForm.js";
import { useFormStore } from "../store/useFormStore.js";

// Wraps the "Magic Input" flow: send free text -> get structured fields
// back -> push them into React Hook Form -> flag low-confidence fields.
export function useAIExtraction({ formSchemaId, setValue }) {
  const { startExtraction, finishExtraction, setError } = useAIStore();
  const setLowConfidenceFields = useFormStore((s) => s.setLowConfidenceFields);

  const extract = useCallback(
    async (text) => {
      startExtraction(text);
      try {
        const result = await ExtractionAPI.extract(formSchemaId, text);
        const flagged = mergeAIResultIntoForm({ ...result, setValue });
        setLowConfidenceFields(flagged);
        finishExtraction();
        return result;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [formSchemaId, setValue, startExtraction, finishExtraction, setError, setLowConfidenceFields]
  );

  return { extract };
}

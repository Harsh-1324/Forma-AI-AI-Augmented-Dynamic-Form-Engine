import { useEffect, useRef } from "react";
import { FormSubmissionAPI } from "../services/api.js";

// Debounced autosave: watches `values` and PATCHes the submission
// after `delay` ms of inactivity, so users can resume a draft later.
export function useAutosave({ submissionId, values, delay = 1500 }) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!submissionId) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      FormSubmissionAPI.saveProgress(submissionId, values).catch(() => {
        // swallow — a failed autosave shouldn't interrupt the user
      });
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [submissionId, values, delay]);
}

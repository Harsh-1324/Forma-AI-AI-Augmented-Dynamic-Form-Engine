import { useEffect, useState } from "react";
import { FormSchemaAPI } from "../services/api.js";

export function useFormSchema(schemaId) {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!schemaId) return;
    let cancelled = false;

    setLoading(true);
    FormSchemaAPI.get(schemaId)
      .then((data) => {
        if (!cancelled) setSchema(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [schemaId]);

  return { schema, loading, error };
}

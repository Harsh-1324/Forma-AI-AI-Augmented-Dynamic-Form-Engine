import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormSchema } from "../hooks/useFormSchema.js";
import { useAIExtraction } from "../hooks/useAIExtraction.js";
import { useAutosave } from "../hooks/useAutosave.js";
import { useFormStore } from "../store/useFormStore.js";
import MagicInputBox from "../components/MagicInput/MagicInputBox.jsx";
import AIReviewBanner from "../components/MagicInput/AIReviewBanner.jsx";
import DynamicFormRenderer from "../components/DynamicForm/DynamicFormRenderer.jsx";
import { FormSubmissionAPI } from "../services/api.js";

export default function FormFillPage() {
  const { schemaId } = useParams();
  const navigate = useNavigate();
  const { schema, loading } = useFormSchema(schemaId);

  const [submissionId, setSubmissionId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const lowConfidenceFields = useFormStore((s) => s.lowConfidenceFields);
  const setSchemaInStore = useFormStore((s) => s.setSchema);

  useEffect(() => {
    if (schema) setSchemaInStore(schema);
  }, [schema, setSchemaInStore]);

  useEffect(() => {
    if (!schemaId) return;
    FormSubmissionAPI.create(schemaId, null).then((sub) => setSubmissionId(sub.id));
  }, [schemaId]);

  useAutosave({ submissionId, values: formValues });

  // A stable setValue-like function passed to useAIExtraction; since the
  // real RHF instance lives inside DynamicFormRenderer, extraction results
  // are applied via defaultValues + a re-render keyed on extractedValues.
  const [extractedValues, setExtractedValues] = useState({});
  const { extract } = useAIExtraction({
    formSchemaId: schemaId,
    setValue: (key, value) => setExtractedValues((prev) => ({ ...prev, [key]: value })),
  });

  const handleSubmit = async (data) => {
    if (!submissionId) return;
    await FormSubmissionAPI.saveProgress(submissionId, data);
    await FormSubmissionAPI.submit(submissionId);
    navigate(`/submissions/${submissionId}`);
  };

  if (loading) return <p>Loading form...</p>;
  if (!schema) return <p>Form not found.</p>;

  return (
    <div>
      <h1 className="page-title">{schema.name}</h1>
      <p className="page-subtitle">{schema.description}</p>

      <MagicInputBox onExtract={extract} />
      <AIReviewBanner lowConfidenceFields={lowConfidenceFields} />

      <DynamicFormRenderer
        schema={schema}
        defaultValues={extractedValues}
        onSubmit={(data) => {
          setFormValues(data);
          handleSubmit(data);
        }}
      />
    </div>
  );
}

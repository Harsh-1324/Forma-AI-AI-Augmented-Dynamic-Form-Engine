import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldFactory from "./FieldFactory.jsx";
import ConditionalSection from "./fields/ConditionalSection.jsx";
import { buildYupSchema } from "./validation/buildYupSchema.js";
import { evaluateShowIf } from "../../utils/evaluateShowIf.js";
import { useFormStore } from "../../store/useFormStore.js";

// Dynamically renders the form layout based on the schema blueprint
export default function DynamicFormRenderer({ schema, defaultValues = {}, onSubmit, onValuesChange }) {
  const lowConfidenceFields = useFormStore((s) => s.lowConfidenceFields);

  // Flatten all fields once so the yup schema always matches what's
  // actually visible (hidden required fields shouldn't block submit).
  const allFields = useMemo(
    () => (schema?.sections || []).flatMap((s) => s.fields || []),
    [schema]
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: async (values, context, options) => {
      const visibleFields = allFields.filter((f) => evaluateShowIf(f.showIf, values));
      const yupSchema = buildYupSchema(visibleFields);
      return yupResolver(yupSchema)(values, context, options);
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const values = watch();

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(values);
    }
  }, [values, onValuesChange]);

  if (!schema) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {schema.sections.map((section) => {
        const sectionVisible = evaluateShowIf(section.showIf, values);

        return (
          <ConditionalSection key={section.key} visible={sectionVisible} title={section.title}>
            {section.fields.map((field) => {
              const fieldVisible = evaluateShowIf(field.showIf, values);
              if (!fieldVisible) return null;

              return (
                <FieldFactory
                  key={field.key}
                  field={field}
                  register={register}
                  control={control}
                  error={errors[field.key]}
                  isAiFlagged={lowConfidenceFields.has(field.key)}
                />
              );
            })}
          </ConditionalSection>
        );
      })}

      <button
        type="submit"
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Submit claim
      </button>
    </form>
  );
}

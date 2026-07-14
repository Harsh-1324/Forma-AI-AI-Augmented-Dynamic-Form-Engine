// Flattens the MongoDB form schema (sections -> fields) into a compact
// field spec the LLM can target, e.g.:
// [{ key: "incidentType", type: "dropdown", options: ["animal_collision", ...] }, ...]
export function schemaToFieldSpec(schema) {
  const fields = [];
  for (const section of schema.sections || []) {
    for (const field of section.fields || []) {
      if (!field.aiExtractable) continue;
      fields.push({
        key: field.key,
        label: field.label,
        type: field.type,
        options: (field.options || []).map((o) => o.value),
      });
    }
  }
  return fields;
}

export function buildFieldSpecDescription(fields) {
  return fields
    .map((f) => {
      const opts = f.options?.length ? ` (allowed values: ${f.options.join(", ")})` : "";
      return `- ${f.key} [${f.type}]${opts}: ${f.label}`;
    })
    .join("\n");
}

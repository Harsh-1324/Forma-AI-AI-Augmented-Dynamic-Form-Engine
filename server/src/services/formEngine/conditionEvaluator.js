// Evaluates a single "showIf" rule against the current form data.
// Mirrors client/src/utils/evaluateShowIf.js so branching logic is
// consistent whether checked on the server (validation) or client (render).
export function evaluateShowIf(showIf, formData) {
  if (!showIf || !showIf.field) return true; // no condition -> always show

  const actual = formData?.[showIf.field];

  switch (showIf.operator) {
    case "equals":
      return actual === showIf.value;
    case "notEquals":
      return actual !== showIf.value;
    case "in":
      return Array.isArray(showIf.value) && showIf.value.includes(actual);
    case "exists":
      return actual !== undefined && actual !== null && actual !== "";
    default:
      return true;
  }
}

// Returns the flat list of fields that are currently visible given formData,
// walking sections -> fields and respecting nested showIf rules.
export function getVisibleFields(schema, formData) {
  const visible = [];
  for (const section of schema.sections || []) {
    if (!evaluateShowIf(section.showIf, formData)) continue;
    for (const field of section.fields || []) {
      if (evaluateShowIf(field.showIf, formData)) visible.push(field);
    }
  }
  return visible;
}

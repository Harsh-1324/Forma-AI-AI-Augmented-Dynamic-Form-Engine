// Mirrors server/src/services/formEngine/conditionEvaluator.js so
// branching logic behaves identically on client and server.
export function evaluateShowIf(showIf, formValues) {
  if (!showIf || !showIf.field) return true;

  const actual = formValues?.[showIf.field];

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

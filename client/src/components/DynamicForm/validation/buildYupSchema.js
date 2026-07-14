import * as yup from "yup";

// Converts the backend's per-field `required` / `validationRegex` rules
// into a yup schema React Hook Form can use via @hookform/resolvers/yup.
export function buildYupSchema(visibleFields) {
  const shape = {};

  for (const field of visibleFields) {
    let rule = yup.string();

    if (field.type === "number") rule = yup.number().typeError(`${field.label} must be a number`);

    if (field.required) {
      rule = rule.required(field.validationMessage || `${field.label} is required`);
    } else {
      rule = rule.nullable().notRequired();
    }

    if (field.validationRegex && field.type !== "number") {
      rule = rule.matches(new RegExp(field.validationRegex), {
        message: field.validationMessage || `${field.label} is invalid`,
        excludeEmptyString: true,
      });
    }

    shape[field.key] = rule;
  }

  return yup.object().shape(shape);
}

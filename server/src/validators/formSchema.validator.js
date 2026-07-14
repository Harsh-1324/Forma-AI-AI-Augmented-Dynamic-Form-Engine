import { z } from "zod";

const showIfSchema = z
  .object({
    field: z.string(),
    operator: z.enum(["equals", "notEquals", "in", "exists"]),
    value: z.any(),
  })
  .partial()
  .optional();

const fieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(["text", "number", "date", "dropdown", "checkbox", "textarea", "radio"]),
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  required: z.boolean().optional(),
  validationRegex: z.string().optional(),
  validationMessage: z.string().optional(),
  aiExtractable: z.boolean().optional(),
  showIf: showIfSchema,
});

export const formSchemaCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  sections: z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      fields: z.array(fieldSchema),
      showIf: showIfSchema,
    })
  ),
});

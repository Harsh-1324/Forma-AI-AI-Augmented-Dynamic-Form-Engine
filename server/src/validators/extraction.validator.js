import { z } from "zod";

export const extractionRequestSchema = z.object({
  formSchemaId: z.string(),
  text: z.string().min(3, "Please describe the incident in a bit more detail"),
});

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  const filePath = path.join(__dirname, "../../docs/sample-form-schema.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const existing = await prisma.formSchema.findFirst({
    where: { name: data.name },
  });
  if (existing) {
    await prisma.formSchema.delete({
      where: { id: existing.id },
    });
  }

  await prisma.formSchema.create({
    data: {
      name: data.name,
      version: data.version,
      description: data.description,
      isActive: data.isActive,
      sections: {
        create: data.sections.map((section) => ({
          key: section.key,
          title: section.title,
          showIfField: section.showIf?.field || null,
          showIfOperator: section.showIf?.operator || null,
          showIfValue: section.showIf?.value || null,
          fields: {
            create: section.fields.map((field) => ({
              key: field.key,
              label: field.label,
              type: field.type,
              required: field.required ?? false,
              validationRegex: field.validationRegex || null,
              validationMessage: field.validationMessage || null,
              aiExtractable: field.aiExtractable ?? true,
              showIfField: field.showIf?.field || null,
              showIfOperator: field.showIf?.operator || null,
              showIfValue: field.showIf?.value || null,
              options: field.options || null,
            })),
          },
        })),
      },
    },
  });

  console.log(`Successfully seeded form schema: ${data.name}`);
}

seed()
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

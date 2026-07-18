-- CreateEnum
CREATE TYPE "public"."FieldType" AS ENUM ('text', 'number', 'date', 'dropdown', 'checkbox', 'textarea', 'radio');

-- CreateEnum
CREATE TYPE "public"."ShowIfOperator" AS ENUM ('equals', 'notEquals', 'in', 'exists');

-- CreateTable
CREATE TABLE "public"."FormSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Section" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "showIfField" TEXT,
    "showIfOperator" "public"."ShowIfOperator",
    "showIfValue" TEXT,
    "formSchemaId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Field" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "public"."FieldType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "validationRegex" TEXT,
    "validationMessage" TEXT,
    "aiExtractable" BOOLEAN NOT NULL DEFAULT true,
    "showIfField" TEXT,
    "showIfOperator" "public"."ShowIfOperator",
    "showIfValue" TEXT,
    "options" JSONB,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Section" ADD CONSTRAINT "Section_formSchemaId_fkey" FOREIGN KEY ("formSchemaId") REFERENCES "public"."FormSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Field" ADD CONSTRAINT "Field_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

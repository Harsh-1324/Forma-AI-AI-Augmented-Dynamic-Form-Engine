-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('draft', 'in_review', 'submitted');

-- CreateTable
CREATE TABLE "public"."FormSubmission" (
    "id" TEXT NOT NULL,
    "formSchemaId" TEXT NOT NULL,
    "userId" TEXT,
    "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'draft',
    "data" JSONB NOT NULL DEFAULT '{}',
    "aiRawText" TEXT,
    "aiExtractedFields" JSONB,
    "aiLowConfidenceFields" JSONB,
    "aiModel" TEXT,
    "aiExtractedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FormSubmission" ADD CONSTRAINT "FormSubmission_formSchemaId_fkey" FOREIGN KEY ("formSchemaId") REFERENCES "public"."FormSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormSubmission" ADD CONSTRAINT "FormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

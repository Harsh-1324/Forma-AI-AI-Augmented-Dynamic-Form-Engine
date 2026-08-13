import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import formSchemaRoutes from "./routes/formSchema.routes.js";
import formSubmissionRoutes from "./routes/formSubmission.routes.js";
import extractionRoutes from "./routes/extraction.routes.js";
import aiFormGeneratorRoutes from "./routes/aiFormGenerator.routes.js";
import aiAssistantRoutes from "./routes/aiAssistant.routes.js";
import aiReviewRoutes from "./routes/aiReview.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/form-schemas", formSchemaRoutes);
app.use("/api/form-submissions", formSubmissionRoutes);
app.use("/api/extract", extractionRoutes);
app.use("/api/ai", aiFormGeneratorRoutes);
app.use("/api/ai", aiAssistantRoutes);
app.use("/api/ai", aiReviewRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;
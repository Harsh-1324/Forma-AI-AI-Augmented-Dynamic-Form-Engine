import { Router } from "express";
import * as ctrl from "../controllers/extraction.controller.js";

const router = Router();

// POST /api/extract  { formSchemaId, text }
router.post("/", ctrl.extractFromText);

export default router;

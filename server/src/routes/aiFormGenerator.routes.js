import { Router } from "express";
import { generateForm } from "../controllers/aiFormGenerator.controller.js";

const router = Router();

router.post("/generate-form", generateForm);

export default router;

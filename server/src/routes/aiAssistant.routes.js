import { Router } from "express";
import { askAssistant } from "../controllers/aiAssistant.controller.js";

const router = Router();

router.post("/assistant", askAssistant);

export default router;

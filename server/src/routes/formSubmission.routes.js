import { Router } from "express";
import * as ctrl from "../controllers/formSubmission.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Secure all form submission endpoints
router.use(requireAuth);

router.post("/", ctrl.createSubmission);          // start a new draft
router.get("/:id", ctrl.getSubmission);            // resume
router.patch("/:id", ctrl.saveSubmissionProgress);  // autosave partial state
router.post("/:id/submit", ctrl.finalizeSubmission);

export default router;

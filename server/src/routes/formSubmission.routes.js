import { Router } from "express";
import * as ctrl from "../controllers/formSubmission.controller.js";

const router = Router();

router.post("/", ctrl.createSubmission);          // start a new draft
router.get("/:id", ctrl.getSubmission);            // resume
router.patch("/:id", ctrl.saveSubmissionProgress);  // autosave partial state
router.post("/:id/submit", ctrl.finalizeSubmission);

export default router;

import { Router } from "express";
import * as ctrl from "../controllers/formSchema.controller.js";

const router = Router();

router.get("/", ctrl.listFormSchemas);
router.get("/:id", ctrl.getFormSchema);
router.post("/", ctrl.createFormSchema);
router.put("/:id", ctrl.updateFormSchema);
router.delete("/:id", ctrl.deleteFormSchema);

export default router;

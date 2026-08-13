import { Router } from "express";
import { getDashboardStats } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// secure dashboard metrics
router.get("/", requireAuth, getDashboardStats);

export default router;

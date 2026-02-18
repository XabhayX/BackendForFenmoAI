import { Router } from "express";
import { createExpense, getExpenses } from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Apply verifyJWT to all routes
router.use(verifyJWT);

router.route("/").post(createExpense).get(getExpenses);

export default router;

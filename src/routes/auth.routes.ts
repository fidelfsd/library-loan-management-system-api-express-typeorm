import express from "express";
import { authController } from "../controllers/authController";

// -----------------------------------------------------------------------------

const router = express.Router();
const ctrl = authController;

// Authentication routes
// -----------------------------------------------------------------------------
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

export default router;

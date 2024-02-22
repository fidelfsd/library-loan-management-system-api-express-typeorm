import express from "express";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();

// Public routes
// -----------------------------------------------------------------------------
router.get("/", (req, res) => res.json({ msg: "NOT_IMPL" })); // View all
router.get("/:id", (req, res) => res.json({ msg: "NOT_IMPL" })); // View by id

// Protected routes
// -----------------------------------------------------------------------------
router.post("/", (req, res) => res.json({ msg: "NOT_IMPL" })); // Create
router.put("/:id", (req, res) => res.json({ msg: "NOT_IMPL" })); // Modify by id
router.delete("/:id", (req, res) => res.json({ msg: "NOT_IMPL" })); // Delete by id

export default router;

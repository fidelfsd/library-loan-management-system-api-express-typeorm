import express from "express";
import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";
import authorsRoutes from "./authors.routes";
import booksRoutes from "./books.routes";
import loansRoutes from "./loans.routes";

// -----------------------------------------------------------------------------

const router = express.Router();

// API Routes
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/authors", authorsRoutes);
router.use("/books", booksRoutes);
router.use("/loans", loansRoutes);

export default router;

import express, { Request, Response } from "express";

// -----------------------------------------------------------------------------

const router = express.Router();

// Base route
router.get("/", (req: Request, res: Response) => {
   res.send("REST API for Book Loan Management in a Library");
});

export default router;

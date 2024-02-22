import { Request, Response, NextFunction } from "express";

// -----------------------------------------------------------------------------

/**
 * Middleware function to handle 404 errors.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 */
export const handleNotFound = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   res.status(404).json({ message: "Oops, looks like there's nothing here!" });
};

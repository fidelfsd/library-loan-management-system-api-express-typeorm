import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { TokenData } from "../types/types";
import { APIMessages } from "../constants/APIMessages";

// -----------------------------------------------------------------------------

/**
 * Middleware function to authenticate and authorize user access using JSON Web Tokens (JWT).
 */
export const auth = (req: Request, res: Response, next: NextFunction): void => {
   // Extract the token from the request headers
   const token = req.headers.authorization?.split(" ")[1];

   if (!token) {
      res.status(401).json({ message: APIMessages.AUTH.UNAUTHORIZED });
      return;
   }

   try {
      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET_KEY
      ) as TokenData;

      // Modify request object to include payload
      req.tokenData = {
         userId: decoded.userId,
         userRole: decoded.userRole,
      };

      next();
   } catch (error: unknown) {
      let message = APIMessages.AUTH.INVALID_TOKEN;

      if (error instanceof TokenExpiredError)
         message = APIMessages.AUTH.TOKEN_EXPIRED;

      res.status(401).json({ message });
   }
};

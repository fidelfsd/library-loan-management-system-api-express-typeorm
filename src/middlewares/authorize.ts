import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../constants/UserRoles";
import { APIMessages } from "../constants/APIMessages";

// -----------------------------------------------------------------------------

export const authorize = (allowedRoles: string[] = [UserRoles.ADMIN.name]) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const adminRoles = [UserRoles.ADMIN.name];

      const userRole = req.tokenData.userRole;

      // Grant access if the user has an admin role
      if (adminRoles.includes(userRole)) {
         return next();
      }

      // Grant access if the user role is in the allowed roles
      if (allowedRoles.includes(userRole)) {
         return next();
      }

      // If none of the conditions are met, reject the request
      return res.status(403).json({ message: APIMessages.AUTH.UNAUTHORIZED });
   };
};

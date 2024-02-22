import { TokenData } from "../types/types";
import { AppConfig } from "../config/app";
import jwt from "jsonwebtoken";
import { userService } from "./userService";

// -----------------------------------------------------------------------------

export const authService = {
   async createToken(email: string, password: string): Promise<string | null> {
      const validUser = await userService.checkCredentials(email, password);
      if (!validUser) return null;

      // Get the user's role
      const userRole = validUser.role.name;

      // Generate the user token
      const tokenPayload: TokenData = {
         userId: validUser.id,
         userRole,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
         expiresIn: AppConfig.TOKEN_EXPIRATION_TIME,
      });

      return token;
   },
};

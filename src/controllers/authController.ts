import { Request, Response } from "express";
import { APIMessages } from "../constants/APIMessages";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

export const authController = {
   async register(req: Request, res: Response): Promise<void> {
      try {
         const userData = req.body;
         const { firstName, lastName, email, password } = userData;

         if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
               message: APIMessages.AUTH.ALL_FIELDS_REQUIRED,
            });
            return;
         }

         await userService.create(userData);
         res.status(201).json({ message: APIMessages.AUTH.REGISTER_SUCCESS });
      } catch (error) {
         console.log(error);

         res.status(500).json({ message: APIMessages.AUTH.REGISTER_ERROR });
      }
   },

   async login(req: Request, res: Response): Promise<void> {
      try {
         const { email, password } = req.body;

         if (!email || !password) {
            res.status(400).json({
               message: APIMessages.AUTH.ALL_FIELDS_REQUIRED,
            });
            return;
         }

         const token = await authService.createToken(email, password);
         if (!token) {
            res.status(400).json({
               message: APIMessages.AUTH.INVALID_CREDENTIALS,
            });
            return;
         }
         res.status(200).json({
            message: APIMessages.AUTH.LOGIN_SUCCESS,
            token,
         });
      } catch (error) {
         res.status(500).json({ message: APIMessages.AUTH.LOGIN_ERROR });
      }
   },
};

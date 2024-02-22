import { Request, Response } from "express";
import { APIMessages } from "../constants/APIMessages";
import { userService } from "../services/userService";
import { parseUrlParams } from "../helpers/validation";

// -----------------------------------------------------------------------------

export const userController = {
   async create(req: Request, res: Response): Promise<void> {
      try {
         const userData = req.body;
         const { firstName, lastName, email, password } = userData;

         if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
               message: APIMessages.USER.ALL_FIELDS_REQUIRED,
            });
            return;
         }

         await userService.create(userData);

         res.status(201).json({ message: APIMessages.USER.CREATION_SUCCESS });
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.CREATION_ERROR });
      }
   },

   async getAll(req: Request, res: Response): Promise<void> {
      try {
         const { page, limit } = parseUrlParams(req.query);

         const [users, count] = await userService.getAll({
            page,
            limit,
         });
         if (count === 0) {
            res.status(404).json({ message: APIMessages.USER.NOT_FOUND });
            return;
         }

         res.status(200).json({
            results: users,
            total: count,
            per_page: limit,
            current_page: page,
            total_pages: Math.ceil(count / limit),
         });
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.RETRIEVAL_ERROR });
      }
   },

   async getById(req: Request, res: Response): Promise<void> {
      try {
         const userId = +req.params.id;

         const user = await userService.getById(userId);
         if (!user) {
            res.status(404).json({ message: APIMessages.USER.NOT_FOUND });
            return;
         }

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.RETRIEVAL_ERROR });
      }
   },

   async update(req: Request, res: Response): Promise<void> {
      try {
         const userId = +req.params.id;
         const userData = req.body;

         const updatedUser = await userService.update(userId, userData);
         if (!updatedUser) {
            res.status(404).json({ message: APIMessages.USER.NOT_FOUND });
            return;
         }

         res.status(202).json({ message: APIMessages.USER.CREATION_SUCCESS });
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.UPDATE_ERROR });
      }
   },

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const userId = +req.params.id;

         const deleted = await userService.delete(userId);
         if (!deleted) {
            res.status(404).json({ message: APIMessages.USER.NOT_FOUND });
            return;
         }
         res.status(200).json({ message: APIMessages.USER.DELETION_SUCCESS });
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.DELETION_ERROR });
      }
   },

   async getProfile(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData?.userId;
         const user = await userService.getById(userId);

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.RETRIEVAL_ERROR });
      }
   },

   async updateProfile(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;
         const userData = req.body;

         await userService.update(userId, userData);

         res.status(202).json({ message: APIMessages.USER.UPDATE_SUCCESS });
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.UPDATE_ERROR });
      }
   },

   async getUserLoans(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData?.userId;

         const userLoans = await userService.getLoans(userId);
         if (userLoans.length === 0) {
            res.status(404).json({ message: APIMessages.LOAN.NOT_FOUND });
            return;
         }

         res.status(200).json(userLoans);
      } catch (error) {
         res.status(500).json({ message: APIMessages.LOAN.RETRIEVAL_ERROR });
      }
   },

   async geLoansByUserId(req: Request, res: Response): Promise<void> {
      try {
         const userId = +req.params.id;

         const userLoans = await userService.getLoans(userId);
         if (userLoans.length === 0) {
            res.status(404).json({ message: APIMessages.LOAN.NOT_FOUND });
            return;
         }

         res.status(200).json(userLoans);
      } catch (error) {
         res.status(500).json({ message: APIMessages.LOAN.RETRIEVAL_ERROR });
      }
   },

   async updateRoleByUserId(req: Request, res: Response): Promise<void> {
      try {
         const userId = +req.params.id;
         const role = req.body.role;

         const updatedUser = await userService.updateRole(userId, role);
         if (!updatedUser) {
            res.status(404).json({
               message: APIMessages.USER.NOT_FOUND,
            });
            return;
         }

         res.status(200).json({ message: APIMessages.USER.UPDATE_SUCCESS });
      } catch (error) {
         res.status(500).json({ message: APIMessages.USER.UPDATE_ERROR });
      }
   },

   async addFavoriteBooks(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;
         const bookId = req.body.bookId;

         const updatedUser = await userService.addFavoriteBook(userId, bookId);
         if (!updatedUser) {
            res.status(400).json({
               message: APIMessages.FAVORITE_BOOK.CREATION_ERROR,
            });
            return;
         }

         res.status(201).json({
            message: APIMessages.FAVORITE_BOOK.CREATION_SUCCESS,
         });
      } catch (error) {
         res.status(500).json({
            message: APIMessages.FAVORITE_BOOK.CREATION_ERROR,
         });
      }
   },

   async getFavoriteBooks(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;

         const favoriteBooks = await userService.getFavoriteBooks(userId);
         if (favoriteBooks.length === 0) {
            res.status(404).json({
               message: APIMessages.FAVORITE_BOOK.NOT_FOUND,
            });
            return;
         }

         res.status(200).json(favoriteBooks);
      } catch (error) {
         res.status(500).json({
            message: APIMessages.FAVORITE_BOOK.RETRIEVAL_ERROR,
         });
      }
   },

   async deleteBookFromFavorite(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;
         const bookId = +req.params.bookId;

         const updatedUser = await userService.deleteBookFromFavorite(
            userId,
            bookId
         );
         if (!updatedUser) {
            res.status(404).json({
               message: APIMessages.FAVORITE_BOOK.NOT_FOUND,
            });
            return;
         }

         res.status(200).json({
            message: APIMessages.FAVORITE_BOOK.DELETION_SUCCESS,
         });
      } catch (error) {
         res.status(500).json({
            message: APIMessages.FAVORITE_BOOK.DELETION_ERROR,
         });
      }
   },
};

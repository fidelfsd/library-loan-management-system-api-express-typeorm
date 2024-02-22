import { User } from "../models/User";
import { AppConfig } from "../config/app";
import { bookRepository, userRepository } from "../data-access/repositories";
import bcrypt from "bcrypt";
import { Loan } from "../models/Loan";
import { getRoleFromRoleName, paginateArray } from "../helpers/common";
import { UserRoles } from "../constants/UserRoles";
import { Book } from "../models/Book";
import { GetAllOptions } from "../types/types";

// -----------------------------------------------------------------------------

const itemsPerPage = AppConfig.ITEMS_PER_PAGE;

export const userService = {
   async create(userData: Partial<User>): Promise<User> {
      const hashedPassword = bcrypt.hashSync(userData.password!, 10);
      const userToCreate = userRepository.create({
         firstName: userData.firstName,
         lastName: userData.lastName,
         email: userData.email,
         password: hashedPassword,
         role: UserRoles.USER,
      });

      return await userRepository.save(userToCreate);
   },

   async getAll(options: GetAllOptions = {}): Promise<[User[], number]> {
      const { page = 1, limit = itemsPerPage } = options;

      const [users, totalCount] = await userRepository.findAndCount({
         relations: {
            role: true,
         },
         select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: {
               id: true,
               name: true,
            },
         },
         skip: (page - 1) * limit,
         take: limit,
      });

      return [users, totalCount];
   },

   async getById(userId: number): Promise<User | null> {
      return await userRepository.findOne({
         relations: {
            role: true,
         },
         select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: {
               id: true,
               name: true,
            },
         },
         where: { id: userId },
      });
   },

   async update(userId: number, userData: Partial<User>): Promise<User | null> {
      let userToUpdate = await userRepository.findOne({
         where: { id: userId },
      });
      if (!userToUpdate) return null;

      const { password, role, ...restUserData } = userData;

      if (password) {
         const hashedPassword = bcrypt.hashSync(password, 10);
         userToUpdate.password = hashedPassword;
      }

      const updatedUser: Partial<User> = { ...userToUpdate, ...restUserData };

      return await userRepository.save(updatedUser);
   },

   async delete(userId: number): Promise<boolean> {
      const deleteResult = await userRepository.delete(userId);
      return deleteResult.affected === 0 ? false : true;
   },

   async getLoans(userId: number): Promise<Loan[]> {
      const user = await userRepository.findOne({
         relations: {
            loans: {
               book: true,
            },
         },
         select: {
            loans: {
               id: true,
               book: {
                  id: true,
                  title: true,
                  genre: true,
               },
               loanDate: true,
               dueDate: true,
               returnDate: true,
            },
         },
         where: { id: userId },
      });

      return user?.loans!;
   },

   async updateRole(userId: number, roleName: string): Promise<User | null> {
      const userToUpdate = await userRepository.findOne({
         relations: {
            role: true,
         },
         where: { id: userId },
      });
      if (!userToUpdate) return null;

      const roleToUpdate = getRoleFromRoleName(roleName);
      if (!roleToUpdate) return null;

      userToUpdate.role = roleToUpdate;

      return await userRepository.save(userToUpdate);
   },

   async checkCredentials(
      email: string,
      password: string
   ): Promise<User | null> {
      const user = await userRepository.findOne({
         relations: {
            role: true,
         },
         where: { email },
      });
      if (!user) return null;

      const isPasswordMatch = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatch) return null;

      return user;
   },

   async addFavoriteBook(userId: number, bookId: number): Promise<User | null> {
      const userToUpdate = await userRepository.findOne({
         where: { id: userId },
         relations: {
            favBooks: true,
         },
      });
      if (!userToUpdate) return null;

      const bookToAdd = await bookRepository.findOne({ where: { id: bookId } });
      if (!bookToAdd) return null;

      userToUpdate.favBooks?.push(bookToAdd);

      return await userRepository.save(userToUpdate);
   },

   async deleteBookFromFavorite(
      userId: number,
      bookId: number
   ): Promise<User | null> {
      const userToUpdate = await userRepository.findOne({
         where: { id: userId },
         relations: {
            favBooks: true,
         },
      });
      if (!userToUpdate) return null;

      const bookToRemove = await bookRepository.findOne({
         where: { id: bookId },
      });
      if (!bookToRemove) return null;

      userToUpdate.favBooks = userToUpdate.favBooks?.filter((book) => {
         return book.id !== bookToRemove.id;
      });

      return await userRepository.save(userToUpdate);
   },

   async getFavoriteBooks(userId: number): Promise<Book[]> {
      const user = await userRepository.findOne({
         where: { id: userId },
         relations: {
            favBooks: true,
         },
      });

      return user?.favBooks!;
   },
};

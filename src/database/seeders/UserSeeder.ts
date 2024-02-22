import { UserRoles } from "../../constants/UserRoles";
import { getRandomSubarray } from "../../helpers/common";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";
import { SeederConfig } from "../../config/seeders";
import { bookRepository, userRepository } from "../../data-access/repositories";

// -----------------------------------------------------------------------------

export class UserSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const {
         NUMBER_OF_MANAGERS,
         NUMBER_OF_CLIENTS,
         NUMBER_OF_FAVORITE_BOOKS_PER_USER,
      } = SeederConfig;

      const userFactory = new UserFactory();
      const books = await bookRepository.find();

      // admins
      const adminUser = userFactory.createOne();
      adminUser.role = UserRoles.ADMIN;

      // managers
      const managerUsers = userFactory.createMany(NUMBER_OF_MANAGERS);
      for (const user of managerUsers) {
         user.role = UserRoles.MANAGER;
      }

      // clients
      const clientUsers = userFactory.createMany(NUMBER_OF_CLIENTS);
      for (const client of clientUsers) {
         client.role = UserRoles.USER;
         client.favBooks = getRandomSubarray(
            books,
            NUMBER_OF_FAVORITE_BOOKS_PER_USER
         );
      }

      // save to database
      const allUsers = [adminUser, ...managerUsers, ...clientUsers];
      await userRepository.save(allUsers);
   }
}

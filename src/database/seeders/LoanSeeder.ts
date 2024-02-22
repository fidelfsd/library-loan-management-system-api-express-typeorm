import { getRandomValueFromArray } from "../../helpers/common";
import { LoanFactory } from "../factories/LoanFactory";
import { Seeder } from "./Seeder";
import { SeederConfig } from "../../config/seeders";
import {
   bookRepository,
   loanRepository,
   userRepository,
} from "../../data-access/repositories";

// -----------------------------------------------------------------------------

export class LoanSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { NUMBER_OF_LOANS } = SeederConfig;

      const users = await userRepository.find();
      const books = await bookRepository.find();

      const loans = new LoanFactory().createMany(NUMBER_OF_LOANS);

      // loans.forEach((loan, index) => {
      //    loan.user = users[index + clientUserIdOffset]; // Assuming numberOfClients >= NUMBER_OF_LOANS
      //    loan.book = getRandomValueFromArray(books); //
      // });

      loans.forEach((loan, index) => {
         loan.book = books[index]; // Assuming numberOfBooks >= NUMBER_OF_LOANS
         loan.user = getRandomValueFromArray(users); //
      });

      await loanRepository.save(loans);
   }
}

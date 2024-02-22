import { faker } from "@faker-js/faker";
import { Loan } from "../../models/Loan";
import { Factory } from "./Factory";

// -----------------------------------------------------------------------------

export class LoanFactory extends Factory<Loan> {
   protected generate() {
      return {
         loanDate: faker.date.past(),
         dueDate: faker.date.future(),
      } as Loan;
   }
}

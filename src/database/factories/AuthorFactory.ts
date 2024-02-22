import { faker } from "@faker-js/faker";
import { Author } from "../../models/Author";
import { Factory } from "./Factory";

// -----------------------------------------------------------------------------

export class AuthorFactory extends Factory<Author> {
   protected generate() {
      return {
         name: `${faker.person.firstName()} ${faker.person.lastName()}`,
         nationality: faker.location.country(),
      } as Author;
   }
}

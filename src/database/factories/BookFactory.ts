import { faker } from "@faker-js/faker";
import { Book } from "../../models/Book";
import { Factory } from "./Factory";

// -----------------------------------------------------------------------------

export class BookFactory extends Factory<Book> {
   protected generate() {
      return {
         title: faker.lorem.sentence({ min: 1, max: 10 }),
         genre: faker.helpers.arrayElement([
            "Contemporary Fiction",
            "Mystery",
            "Science Fiction",
            "Fantasy",
            "Romance",
            "Horror",
            "Poetry",
            "Non-fiction",
            "History",
            "Biography",
         ]),
      } as Book;
   }
}

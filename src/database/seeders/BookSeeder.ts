import { getRandomValueFromArray } from "../../helpers/common";
import { BookFactory } from "../factories/BookFactory";
import { Seeder } from "./Seeder";
import { SeederConfig } from "../../config/seeders";
import {
   authorRepository,
   bookRepository,
} from "../../data-access/repositories";

// -----------------------------------------------------------------------------

export class BookSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const authors = await authorRepository.find();

      const books = new BookFactory().createMany(SeederConfig.NUMBER_OF_BOOKS);
      for (const book of books) {
         book.author = getRandomValueFromArray(authors);
      }

      await bookRepository.save(books);
   }
}

import { AuthorFactory } from "../factories/AuthorFactory";
import { Seeder } from "./Seeder";
import { SeederConfig } from "../../config/seeders";
import { authorRepository } from "../../data-access/repositories";

// -----------------------------------------------------------------------------

export class AuthorSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const numberOfAuthors = SeederConfig.NUMBER_OF_ADMINS;
      const authors = new AuthorFactory().createMany(numberOfAuthors);

      await authorRepository.save(authors);
   }
}

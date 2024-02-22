import { printSeederSuccessMessage } from "../../helpers/seeders";
import { dataSource } from "../data-source";

export abstract class Seeder {
   // This method should be implemented in subclasses to generate seeder
   protected abstract generate(): Promise<void>;

   async start(): Promise<void> {
      try {
         await dataSource.initialize();
         await this.generate();
         printSeederSuccessMessage(this.constructor.name);
      } catch (error) {
         console.error("Error seeding the database:", error);
      } finally {
         await dataSource.destroy();
      }
   }
}

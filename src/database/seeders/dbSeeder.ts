import { UserSeeder } from "./UserSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { AuthorSeeder } from "./AuthorSeeder";
import { BookSeeder } from "./BookSeeder";
import { printSeparator } from "../../helpers/common";
import { LoanSeeder } from "./LoanSeeder";

// -----------------------------------------------------------------------------

(async () => {
   printSeparator();
   console.log("Starting seeders...");
   printSeparator();

   await new AuthorSeeder().start();
   await new BookSeeder().start();
   await new RoleSeeder().start();
   await new UserSeeder().start();
   await new LoanSeeder().start();
})();

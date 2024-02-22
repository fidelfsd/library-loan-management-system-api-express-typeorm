import { UserRoles } from "../../constants/UserRoles";
import { roleRepository } from "../../data-access/repositories";
import { Role } from "../../models/Role";
import { Seeder } from "./Seeder";

// -----------------------------------------------------------------------------

export class RoleSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const roles: Role[] = [
         UserRoles.ADMIN,
         UserRoles.MANAGER,
         UserRoles.USER,
      ];

      await roleRepository.save(roles);
   }
}

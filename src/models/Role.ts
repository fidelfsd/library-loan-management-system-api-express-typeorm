import {
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

// -----------------------------------------------------------------------------

@Entity("roles")
export class Role {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ name: "name", unique: true })
   name!: string;

   // Relation: Role {1}--{0..n} User
   @OneToMany(() => User, (user) => user.role)
   users?: User[];
}

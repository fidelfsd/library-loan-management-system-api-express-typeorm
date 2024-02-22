import {
   Column,
   Entity,
   JoinColumn,
   JoinTable,
   ManyToMany,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Book } from "./Book";
import { Loan } from "./Loan";

// -----------------------------------------------------------------------------

@Entity("users")
export class User {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ name: "first_name" })
   firstName!: string;

   @Column({ name: "last_name" })
   lastName!: string;

   @Column({ name: "password" })
   password!: string;

   @Column({ name: "email" })
   email!: string;

   @Column({ name: "is_active" })
   isActive!: boolean;

   // Relation: User {0..n}--{1} Role
   @ManyToOne(() => Role, (role) => role.users)
   @JoinColumn({ name: "role_id" }) // foreign key en User
   role!: Role;

   // Relation: User {1}--{0..n} Loan
   @OneToMany(() => Loan, (loan) => loan.user)
   loans?: Loan[];

   // Relation: User {0..n}--{0..n} Book
   @ManyToMany(() => Book, (book) => book.users)
   @JoinTable({
      name: "favorite_books", // join table name
      joinColumn: {
         name: "user_id", // first column of the join table
         referencedColumnName: "id",
      },
      inverseJoinColumn: {
         name: "book_id", // second column of the join table
         referencedColumnName: "id",
      },
   })
   favBooks?: Book[];
}

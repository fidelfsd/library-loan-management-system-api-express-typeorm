import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   Unique,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

// -----------------------------------------------------------------------------

@Entity("loans")
@Unique(["loanDate", "user", "book"])
export class Loan {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ name: "loan_date" })
   loanDate!: Date;

   @Column({ name: "due_date" })
   dueDate!: Date;

   @Column({ name: "return_date" })
   returnDate!: Date;

   @Column({ name: "user_id" })
   userId!: number;

   @Column({ name: "book_id" })
   bookId!: number;

   // Relation: Loan {0..n}--{1} User
   @ManyToOne(() => User, (user) => user.loans)
   @JoinColumn({ name: "user_id", referencedColumnName: "id" })
   user!: User;

   // Relation: Loan {0..n}--{1} Book
   @ManyToOne(() => Book, (book) => book.loans)
   @JoinColumn({ name: "book_id", referencedColumnName: "id" })
   book!: Book;
}

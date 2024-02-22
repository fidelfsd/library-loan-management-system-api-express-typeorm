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
import { Author } from "./Author";
import { Loan } from "./Loan";
import { User } from "./User";

// -----------------------------------------------------------------------------

@Entity("books")
export class Book {
   @PrimaryGeneratedColumn()
   id?: number;

   @Column({ name: "title" })
   title!: string;

   @Column({ name: "genre" })
   genre!: string;

   // Relation: Book {0..n}--{1} Author
   @ManyToOne(() => Author, (author) => author.books)
   @JoinColumn({ name: "author_id" }) // foreign key in 'authors'
   author!: Author;

   // Relation: Book {1}--{0..n} Loan
   @OneToMany(() => Loan, (loan) => loan.book)
   loans?: Loan[];

   // Relation: User {0..n}--{0..n} Book
   @ManyToMany(() => User, (user) => user.favBooks)
   
   users!: User[];
}

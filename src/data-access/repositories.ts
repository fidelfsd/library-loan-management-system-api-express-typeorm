import { dataSource } from "../database/data-source";
import { Author } from "../models/Author";
import { Book } from "../models/Book";
import { Loan } from "../models/Loan";
import { Role } from "../models/Role";
import { User } from "../models/User";

// -----------------------------------------------------------------------------

export const userRepository = dataSource.getRepository(User);
export const bookRepository = dataSource.getRepository(Book);
export const loanRepository = dataSource.getRepository(Loan);
export const authorRepository = dataSource.getRepository(Author);
export const roleRepository = dataSource.getRepository(Role);

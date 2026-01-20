import { Book } from 'src/book/book.interface';

export interface User {
  name: string;
  password: string;
  books: Book[];
}
